import urllib.request, ssl, os

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

pdf_urls = [
    ('eee-syllabus-obe-updated-12th-batch.pdf', 'https://baust.edu.bd/eee/wp-content/uploads/sites/20/2021/12/4.-BAUST-EEE-Syllabus-OBE-updated-12-batch-and-onwards.pdf'),
    ('eee-syllabus-obe-leaflet.pdf', 'https://baust.edu.bd/eee/wp-content/uploads/sites/20/2024/10/Leaflet-BAUST-EEE-Syllabus-OBE-2021-Batch-12-Onward.pdf'),
    ('eee-syllabus-9th-to-11th-batch.pdf', 'https://baust.edu.bd/eee/wp-content/uploads/sites/20/2021/12/3.-EEE-Syllabus-latest-9th-Batch-to-11th-Batch.pdf'),
    ('eee-syllabus-2nd-to-8th-batch.pdf', 'https://baust.edu.bd/eee/wp-content/uploads/sites/20/2021/11/EEE-Syllabus-for-2nd-to-8th-Batch.pdf'),
    ('eee-alumni-committee.pdf', 'https://baust.edu.bd/eee/wp-content/uploads/sites/20/2021/12/Executive-Committe-of-BAUST-EEE-Alumni-Association.pdf')
]

dest1 = '/home/ubuntu/projects/baust-website/public/storage/departments'
dest2 = '/home/ubuntu/projects/baust-website/storage/app/public/departments'
os.makedirs(dest1, exist_ok=True)
os.makedirs(dest2, exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0'}

for name, url in pdf_urls:
    print(f"Downloading {name} from {url}")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ctx, timeout=20) as resp:
            content = resp.read()
            p1 = os.path.join(dest1, name)
            p2 = os.path.join(dest2, name)
            with open(p1, 'wb') as f1:
                f1.write(content)
            with open(p2, 'wb') as f2:
                f2.write(content)
            print(f" Saved {name} ({len(content)} bytes)")
    except Exception as e:
        print(f" Failed {name}: {e}")
