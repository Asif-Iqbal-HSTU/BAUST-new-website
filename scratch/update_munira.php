<?php

require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\DepartmentMember;

$experience = '<ol>
<li><strong>Lecturer</strong>, Department of Computer Science & Engineering, Bangladesh Army University of Science & Technology, Saidpur [January 2024 to Present]</li>
<li><strong>Teaching Assistant</strong>, Bangladesh Army University of Science and Technology (BAUST), Saidpur</li>
</ol>';

$publications = '<h3><strong>Journals:</strong></h3>
<ul>
<li>Multimodal Stock Price Prediction Using Machine Learning. [working on it].</li>
</ul>
<h3><strong>Conferences:</strong></h3>
<ul>
<li>Md. Mamun Hossain, Munira Akter Mou, Mst. Najmun nahar Oishi. [03 March 2023]. <em>Symptoms Based Disease Prediction from Bengali Text Using Transform Network Based Pretrained Model</em>. DOI: <a href="https://doi.org/10.1109/ICCIT57492.2022.10055374" target="_blank" rel="noopener noreferrer">10.1109/ICCIT57492.2022.10055374</a>. (ICCIT). Link: <a href="https://ieeexplore.ieee.org/document/10055374" target="_blank" rel="noopener noreferrer">https://ieeexplore.ieee.org/document/10055374</a></li>
</ul>';

$member = DepartmentMember::where('name', 'like', '%Munira%')->first();
if (!$member) {
    echo "Error: Munira Akter Mou not found!\n";
    exit(1);
}

$member->update([
    'experience' => $experience,
    'publications' => $publications,
]);

echo "Successfully updated Munira Akter Mou (ID: {$member->id})\n";
echo "Experience length: " . strlen($member->fresh()->experience) . "\n";
echo "Publications length: " . strlen($member->fresh()->publications) . "\n";
