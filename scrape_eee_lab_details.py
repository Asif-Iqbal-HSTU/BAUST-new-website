import urllib.request, ssl, os, re, json
from bs4 import BeautifulSoup

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

headers = {'User-Agent': 'Mozilla/5.0'}

lab_slugs = [
    'dc-circuit-laboratory',
    'ac-circuit-laboratory',
    'electronics-laboratory',
    'electrical-machine-laboratory',
    'measurement-and-instrumentations-laboratory',
    'power-system-laboratory',
    'switchgear-and-protection-laboratory',
    'communication-laboratory',
    'computer-and-simulation-laboratory',
    'digital-logic-design-lab',
    'power-electronics-lab',
]

lab_dir = '/home/ubuntu/projects/baust-website/public/images/eee/laboratories'
os.makedirs(lab_dir, exist_ok=True)

detailed_labs = []

for slug in lab_slugs:
    url = f'https://baust.edu.bd/eee/facilities/laboratories/{slug}/'
    print(f"Fetching {url}")
    try:
        req = urllib.request.Request(url, headers=headers)
        html = urllib.request.urlopen(req, context=ctx, timeout=15).read().decode('utf-8')
        soup = BeautifulSoup(html, 'html.parser')
        
        # Title
        h1 = soup.find('h1')
        name = h1.get_text(strip=True) if h1 else slug.replace('-', ' ').title()
        
        # Download images
        local_imgs = []
        for img in soup.find_all('img'):
            src = img.get('src')
            if src and '/uploads/' in src and not any(k in src.lower() for k in ['logo', 'banner', 'goved', 'ugc', 'baust-2']):
                img_name = os.path.basename(src).split('?')[0]
                local_path = os.path.join(lab_dir, img_name)
                if not os.path.exists(local_path):
                    try:
                        with urllib.request.urlopen(urllib.request.Request(src, headers=headers), context=ctx, timeout=15) as r:
                            with open(local_path, 'wb') as f:
                                f.write(r.read())
                    except Exception as e:
                        print(f"  Error downloading {src}: {e}")
                local_imgs.append(f"/images/eee/laboratories/{img_name}")
                
        # Descriptions and lists
        content_text = ""
        entry_content = soup.find('div', class_=lambda c: c and any(k in str(c) for k in ['entry-content', 'elementor-widget-theme-post-content', 'post-content']))
        if entry_content:
            content_text = entry_content.get_text(" ", strip=True)
            
        detailed_labs.append({
            'name': name,
            'slug': slug,
            'description': content_text[:500] if content_text else f"The {name} is equipped with advanced equipment and modern experimental kits to provide comprehensive practical training for electrical engineering undergraduates.",
            'images': local_imgs[:3]
        })
        print(f"  Done: {name} (images: {len(local_imgs)})")
    except Exception as e:
        print(f"  Failed for {slug}: {e}")
        detailed_labs.append({
            'name': slug.replace('-', ' ').title(),
            'slug': slug,
            'description': f"Modern laboratory facility for undergraduate practical experiments and advanced engineering research.",
            'images': []
        })

with open('scraped_eee_detailed_labs.json', 'w') as f:
    json.dump(detailed_labs, f, indent=2)
print("Saved scraped_eee_detailed_labs.json")
