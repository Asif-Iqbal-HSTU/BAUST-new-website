<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\DepartmentMember;
use DOMDocument;
use DOMXPath;

class ImportWordPressMembers extends Command
{
    protected $signature = 'wp:import-members {--department= : Specific department to import (cse, eee, etc.)} {--fresh : Clear existing imported members before running}';
    protected $description = 'Import FULL Faculty & Staff profiles from the WordPress site by scraping their public profiles.';

    protected $baseUrl = 'https://baust.edu.bd';

    // All Department Faculty List URLs to scrape (using redirect aliases)
    protected $departmentUrls = [
        'cse' => '/cse/faculty-members/',
        'eee' => '/eee/faculty-members/',
        'ict' => '/ict/faculty-members/',
        'ipe' => '/ipe/faculty-members/',
        'me'  => '/me/faculty-members/',
        'ce'  => '/ce/faculty-members/',
        'dba' => '/dba/faculty-members/',
        'english'   => '/english/faculty-members/',
        'math'      => '/math/faculty-members/',
        'physics'   => '/physics/faculty-members/',
        'chemistry' => '/chemistry/faculty-members/',
    ];

    public function handle()
    {
        if ($this->option('fresh')) {
            $this->info('🗑️  Clearing existing members...');
            DepartmentMember::truncate();
            $this->comment('   Done.');
        }

        // Ensure storage directory exists
        Storage::disk('public')->makeDirectory('members');

        $depts = $this->option('department') 
            ? [$this->option('department') => ($this->departmentUrls[$this->option('department')] ?? null)]
            : $this->departmentUrls;

        foreach ($depts as $deptCode => $path) {
            if (!$path) {
                $this->error("❌ Department code '$deptCode' not recognized.");
                continue;
            }

            $url = $this->baseUrl . $path;
            $this->info("\n🚀 Scraping $deptCode Faculty: $url");

            try {
                $response = Http::withoutVerifying()->timeout(60)->get($url);
                if (!$response->successful()) {
                    $this->error("   Failed to fetch page. Status: " . $response->status());
                    continue;
                }

                $this->parseAndSaveMembers($response->body(), $deptCode);

            } catch (\Exception $e) {
                $this->error("   Error: " . $e->getMessage());
            }
        }

        $this->info("\n✅ All Import tasks completed!");
    }

    private function parseAndSaveMembers(string $html, string $deptCode)
    {
        libxml_use_internal_errors(true);
        $dom = new DOMDocument();
        @$dom->loadHTML($html);
        $xpath = new DOMXPath($dom);

        // Find common teacher card containers (baust uses a specific card structure)
        $nodes = $xpath->query("//div[contains(@class, 'cardcomponent')] | //div[contains(@class, 'team-column')] | //div[contains(@class, 'col-md-3')]");

        if ($nodes->length === 0) {
            $this->warn("   ⚠️  No member cards found. HTML structure may be different.");
            return;
        }

        $this->info("   Found " . $nodes->length . " members. Deep-crawling profiles...");
        
        foreach ($nodes as $index => $node) {
            $this->output->write("\r   Processing member " . ($index + 1) . "/" . $nodes->length . "...");

            $memberData = $this->extractBasicDataFromCard($xpath, $node);
            
            if (!$memberData['name']) continue;

            // Deep-crawl the profile page if URL exists
            if ($memberData['wp_profile_url']) {
                $fullData = $this->scrapeProfileDetails($memberData['wp_profile_url']);
                $memberData = array_merge($memberData, $fullData);
            }

            // Final Metadata
            $memberData['department'] = strtolower($deptCode);
            
            // Check if name or designation indicates study leave
            $isStudyLeave = false;
            $studyLeaveKeywords = ['on study leave', 'study leave', '(study leave)', '(on study leave)'];
            foreach ($studyLeaveKeywords as $keyword) {
                if (strpos(strtolower($memberData['name']), $keyword) !== false || 
                    (isset($memberData['designation']) && strpos(strtolower($memberData['designation']), $keyword) !== false)) {
                    $isStudyLeave = true;
                    break;
                }
            }

            if ($isStudyLeave) {
                $memberData['status'] = 'study_leave';
            } else {
                $memberData['status'] = 'active';
            }

            // Clean up name and designation (remove study leave suffixes)
            $memberData['name'] = trim(preg_replace('/\s*\(?on study leave\)?/i', '', $memberData['name']));
            $memberData['name'] = trim(preg_replace('/\s*\(?study leave\)?/i', '', $memberData['name']));
            if (isset($memberData['designation'])) {
                $memberData['designation'] = trim(preg_replace('/\s*\(?on study leave\)?/i', '', $memberData['designation']));
                $memberData['designation'] = trim(preg_replace('/\s*\(?study leave\)?/i', '', $memberData['designation']));
            }
            
            // Automatically determine Type and Category
            $typeAndCategory = $this->determineTypeAndCategory($memberData['designation']);
            $memberData['type'] = $typeAndCategory['type'];
            $memberData['category'] = $typeAndCategory['category'];

            // Override type/category if we can detect the section heading in the HTML layout
            $headingNodes = $xpath->query("preceding::h2 | preceding::h1", $node);
            if ($headingNodes && $headingNodes->length > 0) {
                $headingNode = $headingNodes->item($headingNodes->length - 1);
                $headingText = strtolower(trim($headingNode->textContent));
                if (strpos($headingText, 'adjunct') !== false || strpos($headingText, 'part-time') !== false || strpos($headingText, 'part time') !== false) {
                    $memberData['type'] = 'adjunct';
                } elseif (strpos($headingText, 'officer') !== false) {
                    $memberData['type'] = 'staff';
                    $memberData['category'] = 'academic_officer';
                } elseif (strpos($headingText, 'staff') !== false) {
                    $memberData['type'] = 'staff';
                    $memberData['category'] = 'academic_staff';
                } elseif (strpos($headingText, 'permanent') !== false) {
                    $memberData['type'] = 'permanent';
                }
            }
            
            // Ensure education has a default empty array
            if (!isset($memberData['education']) || !is_array($memberData['education'])) {
                $memberData['education'] = [];
            }

            // Check for existing
            $existing = DepartmentMember::where('name', $memberData['name'])
                          ->where('department', $memberData['department'])
                          ->first();

            if ($existing) {
                // Preserve leave statuses if already set in the database
                if ($existing->status === 'study_leave') {
                    $memberData['status'] = 'study_leave';
                }
                if ($existing->status === 'maternity_leave') {
                    $memberData['status'] = 'maternity_leave';
                }
                $existing->update($memberData);
            } else {
                DepartmentMember::create($memberData);
            }
        }
        
        $this->info("\n   Done with $deptCode.");
    }

    private function extractBasicDataFromCard(DOMXPath $xpath, $cardNode): array
    {
        $data = [
            'name' => null,
            'designation' => 'Faculty Member',
            'photo' => null,
            'wp_profile_url' => null,
            'wp_type' => 'Faculty',
        ];

        // 1. Get Name
        $nameNode = $xpath->query(".//h3 | .//h4 | .//h5 | .//strong", $cardNode)->item(0);
        if ($nameNode) {
            $data['name'] = trim($nameNode->textContent);
        }

        // 2. Get Designation
        $designationNode = $xpath->query(".//h6[contains(@class, 'designation')] | .//*[contains(@class, 'designation-title')]", $cardNode)->item(0);
        if (!$designationNode) {
            $designationNode = $xpath->query(".//p[not(i) and not(a)] | .//span[not(i) and not(a)]", $cardNode)->item(0);
        }
        if ($designationNode) {
            $text = trim($designationNode->textContent);
            if ($text && $text !== $data['name']) {
                $data['designation'] = $text;
            }
        }

        // 3. Get Photo (Handle Background Images!)
        $photoUrl = null;
        $styleNodes = $xpath->query(".//@style | .//*[contains(@class, 'image') or contains(@class, 'profile-img')]/@style", $cardNode);
        foreach ($styleNodes as $styleNode) {
            if (preg_match('/url\([\'"]?(.*?)[\'"]?\)/i', $styleNode->nodeValue, $matches)) {
                $photoUrl = $matches[1];
                break;
            }
        }
        if (!$photoUrl) {
            $imgNode = $xpath->query(".//img", $cardNode)->item(0);
            if ($imgNode) $photoUrl = $imgNode->getAttribute('src');
        }

        if ($photoUrl) {
            $data['photo'] = $this->downloadAndLocalizePhoto($photoUrl, $data['name']);
        }

        // 4. Get Profile Link
        $linkNode = $xpath->query(".//a[contains(., 'View') or contains(., 'Profile') or contains(., 'Employees') or contains(@class, 'read-more')]", $cardNode)->item(0);
        if (!$linkNode) {
            // Sometime the card wrapper anchor itself is the profile link
            if ($cardNode->nodeName === 'a') {
                $linkNode = $cardNode;
            } else {
                $linkNode = $xpath->query(".//a", $cardNode)->item(0);
            }
        }

        if ($linkNode) {
            $profileUrl = $linkNode->getAttribute('href');
            if ($profileUrl && $profileUrl !== '#' && !Str::contains($profileUrl, 'email-protection')) {
                $data['wp_profile_url'] = Str::startsWith($profileUrl, '/') ? $this->baseUrl . $profileUrl : $profileUrl;
            }
        }

        return $data;
    }

    private function scrapeProfileDetails(string $url): array
    {
        $details = [
            'education' => [],
            'biography' => null,
            'experience' => null,
            'research' => null,
            'publications' => null,
            'specialization' => null,
            'email' => null,
            'phone' => null,
        ];

        try {
            $response = Http::withoutVerifying()->timeout(35)->get($url);
            if (!$response->successful()) return $details;

            $html = $response->body();
            libxml_use_internal_errors(true);
            $dom = new DOMDocument();
            @$dom->loadHTML($html);
            $xpath = new DOMXPath($dom);

            // 1. Get Qualification/Education from the profile header
            $qualNode = $xpath->query("//p[strong[contains(text(), 'Qualification')]] | //div[strong[contains(text(), 'Qualification')]] | //p[contains(text(), 'Qualification')]");
            if ($qualNode->length > 0) {
                $text = $qualNode->item(0)->textContent;
                $qualText = trim(str_ireplace('Qualification:', '', $text));
                if ($qualText !== '') {
                    $details['education'] = array_map('trim', explode(',', $qualText));
                }
            }

            // 2. Extract Tab Content
            $details['experience'] = $this->extractTabContent($xpath, 'Experience');
            $details['publications'] = $this->extractTabContent($xpath, 'Publications');
            $details['research'] = $this->extractTabContent($xpath, 'Research');
            
            // Extract Areas of Interest as Specialization
            $interests = [];
            $interestNodes = $xpath->query("//div[contains(@class, 'interestSpanDiv')]//p[contains(@class, 'label')] | //div[contains(@class, 'interestSpanDiv')]//span[contains(@class, 'label')]");
            foreach ($interestNodes as $node) {
                $interests[] = trim($node->textContent);
            }
            if (!empty($interests)) {
                $details['specialization'] = implode(', ', $interests);
                // Prepend specialization to research interests tab for richness
                $interestIntro = "Areas of Interest: " . $details['specialization'];
                $details['research'] = $interestIntro . ($details['research'] ? "\n\n" . $details['research'] : "");
            }

            // 3. Fallbacks and other tabs (Awards, Training, Workshop) appended to biography
            $awards = $this->extractTabContent($xpath, 'Award');
            $training = $this->extractTabContent($xpath, 'Training');
            $workshop = $this->extractTabContent($xpath, 'Workshop');
            $others = $this->extractTabContent($xpath, 'Other');

            $bioParts = [];
            if ($awards) $bioParts[] = "### Awards & Achievements\n" . $awards;
            if ($training) $bioParts[] = "### Training\n" . $training;
            if ($workshop) $bioParts[] = "### Workshops & Seminars\n" . $workshop;
            if ($others) $bioParts[] = "### Additional Info\n" . $others;

            if (!empty($bioParts)) {
                $details['biography'] = implode("\n\n", $bioParts);
            } else {
                $details['biography'] = "Academic profile and portfolio at Bangladesh Army University of Science and Technology (BAUST).";
            }

            // 4. Find Email & Phone in text (with clean regex)
            if (preg_match('/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/i', $html, $matches)) {
                $details['email'] = $matches[0];
            }
            if (preg_match('/(\+88)?01[3-9]\d{8}/', $html, $matches)) {
                $details['phone'] = $matches[0];
            }

        } catch (\Exception $e) {
            $this->error("      Failed crawling profile details: " . $e->getMessage());
        }

        return $details;
    }

    private function extractTabContent(DOMXPath $xpath, string $label): ?string
    {
        $labelLower = strtolower($label);
        $anchors = $xpath->query("//div[@id='horizontalTab']/ul/li/a");
        foreach ($anchors as $anchor) {
            $text = strtolower(trim($anchor->textContent));
            if (strpos($text, $labelLower) !== false) {
                $href = $anchor->getAttribute('href');
                if (Str::startsWith($href, '#')) {
                    $tabId = substr($href, 1);
                    $tabDiv = $xpath->query("//div[@id='$tabId']")->item(0);
                    if ($tabDiv) {
                        return $this->cleanHtmlContent($tabDiv);
                    }
                }
            }
        }
        return null;
    }

    private function cleanHtmlContent(\DOMNode $node): string
    {
        $text = $this->traverseNode($node);
        $lines = explode("\n", $text);
        $cleanLines = [];
        foreach ($lines as $line) {
            $line = trim($line);
            $line = preg_replace('/\s+/', ' ', $line);
            if ($line !== '') {
                $cleanLines[] = $line;
            }
        }
        return implode("\n", $cleanLines);
    }

    private function traverseNode(\DOMNode $node): string
    {
        if ($node->nodeType === XML_TEXT_NODE) {
            return $node->textContent;
        }

        if ($node->nodeType === XML_ELEMENT_NODE) {
            $tagName = strtolower($node->nodeName);
            $childText = '';
            foreach ($node->childNodes as $child) {
                $childText .= $this->traverseNode($child);
            }

            if ($tagName === 'li') {
                return "\n• " . trim($childText) . "\n";
            }
            if (in_array($tagName, ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'tr', 'br'])) {
                return "\n" . trim($childText) . "\n";
            }
            return $childText;
        }
        return '';
    }

    private function determineTypeAndCategory(string $designation): array
    {
        $desgLower = strtolower($designation);
        $type = 'permanent';
        $category = null;

        if (strpos($desgLower, 'adjunct') !== false) {
            $type = 'adjunct';
        } elseif (
            strpos($desgLower, 'officer') !== false ||
            strpos($desgLower, 'technician') !== false ||
            (strpos($desgLower, 'assistant') !== false && strpos($desgLower, 'professor') === false) ||
            strpos($desgLower, 'staff') !== false ||
            strpos($desgLower, 'driver') !== false ||
            strpos($desgLower, 'peon') !== false ||
            strpos($desgLower, 'attendant') !== false ||
            strpos($desgLower, 'gardener') !== false ||
            strpos($desgLower, 'cook') !== false ||
            strpos($desgLower, 'helper') !== false ||
            strpos($desgLower, 'cleaner') !== false ||
            strpos($desgLower, 'mechanic') !== false ||
            strpos($desgLower, 'typist') !== false ||
            strpos($desgLower, 'daftry') !== false ||
            strpos($desgLower, 'messenger') !== false
        ) {
            $type = 'staff';
            if (strpos($desgLower, 'officer') !== false) {
                $category = 'academic_officer';
            } else {
                $category = 'academic_staff';
            }
        }

        if ($type !== 'staff') {
            if (strpos($desgLower, 'professor') !== false) {
                if (strpos($desgLower, 'associate') !== false) {
                    $category = 'associate_professor';
                } elseif (strpos($desgLower, 'assistant') !== false) {
                    $category = 'assistant_professor';
                } else {
                    $category = 'professor';
                }
            } elseif (strpos($desgLower, 'lecturer') !== false) {
                $category = 'lecturer';
            }
        }

        return ['type' => $type, 'category' => $category];
    }

    private function downloadAndLocalizePhoto(string $url, ?string $name): ?string
    {
        if (Str::startsWith($url, '/')) $url = $this->baseUrl . $url;

        try {
            $response = Http::withoutVerifying()->timeout(30)->get($url);
            if ($response->successful()) {
                $extension = pathinfo(parse_url($url, PHP_URL_PATH), PATHINFO_EXTENSION);
                $filename = 'members/' . Str::slug($name ?: 'member_' . uniqid()) . '.' . ($extension ?: 'jpg');
                Storage::disk('public')->put($filename, $response->body());
                return '/storage/' . $filename;
            }
        } catch (\Exception $e) {}

        return null;
    }
}
