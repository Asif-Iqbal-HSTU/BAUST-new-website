import urllib.request
from bs4 import BeautifulSoup
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

headers = {'User-Agent': 'Mozilla/5.0'}

def fetch(url):
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=20) as resp:
            return resp.read().decode('utf-8', errors='ignore')
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

pages = [
    ('home', 'https://baust.edu.bd/eee/'),
    ('about', 'https://baust.edu.bd/eee/about/'),
    ('vision_mission', 'https://baust.edu.bd/eee/vision-mission/'),
    ('curriculum', 'https://baust.edu.bd/eee/curriculum/'),
    ('laboratories', 'https://baust.edu.bd/eee/laboratories/'),
    ('achievements', 'https://baust.edu.bd/eee/achievements/'),
    ('alumni', 'https://baust.edu.bd/eee/alumni/'),
    ('eee_society', 'https://baust.edu.bd/eee/eee-society/'),
    ('club', 'https://baust.edu.bd/eee/eee-club/'),
]

eee_data = {}

for key, url in pages:
    html = fetch(url)
    if html:
        soup = BeautifulSoup(html, 'html.parser')
        text = soup.get_text(" ", strip=True)
        links = [a['href'] for a in soup.find_all('a', href=True) if any(ext in a['href'].lower() for ext in ['.pdf', '.doc', '.docx', 'syllabus'])]
        images = [img.get('src') for img in soup.find_all('img') if img.get('src') and '/uploads/' in img.get('src')]
        headings = [f"{h.name}: {h.get_text(strip=True)}" for h in soup.find_all(['h1', 'h2', 'h3', 'h4']) if h.get_text(strip=True)]
        
        eee_data[key] = {
            'url': url,
            'title': soup.title.string if soup.title else '',
            'headings': headings[:15],
            'doc_links': links,
            'sample_images': images[:10],
            'text_snippet': text[:1000]
        }
        print(f"Scraped {key}: {soup.title.string if soup.title else ''} | docs: {len(links)} | imgs: {len(images)}")
    else:
        print(f"Failed to fetch {key} ({url})")

with open('/home/ubuntu/projects/baust-website/scraped_eee_department_pages.json', 'w') as f:
    json.dump(eee_data, f, indent=2)
print("Saved scraped_eee_department_pages.json")
