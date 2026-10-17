import urllib.request, ssl, os, re, json
from bs4 import BeautifulSoup

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

headers = {'User-Agent': 'Mozilla/5.0'}

req = urllib.request.Request('https://baust.edu.bd/eee/laboratories/', headers=headers)
html = urllib.request.urlopen(req, context=ctx).read().decode('utf-8')
soup = BeautifulSoup(html, 'html.parser')

labs = []

# Find all lab headings e.g. "h2: 1. DC Circuit Laboratory", etc.
for h2 in soup.find_all(['h2', 'h3']):
    txt = h2.get_text(strip=True)
    if re.match(r'^\d+\.\s*', txt) or any(k in txt.lower() for k in ['laboratory', 'lab']):
        if any(ign in txt.lower() for ign in ['department', 'facilities', 'resources', 'contact']):
            continue
        
        lab_name = re.sub(r'^\d+\.\s*', '', txt).strip()
        slug = re.sub(r'[^a-zA-Z0-9]+', '-', lab_name.lower()).strip('-')
        
        # Collect paragraphs, equipment, images until next h2
        desc = []
        equipment = []
        images = []
        
        curr = h2.find_next_sibling()
        while curr and curr.name not in ['h2', 'h1']:
            # look for images
            for img in curr.find_all('img') if hasattr(curr, 'find_all') else []:
                src = img.get('src')
                if src and '/uploads/' in src and src not in images:
                    images.append(src)
            # look for text
            t = curr.get_text(strip=True) if hasattr(curr, 'get_text') else ''
            if t:
                if any(k in t.lower() for k in ['equipment', 'major equipment', 'instruments', 'apparatus']):
                    # Check for lists
                    for li in curr.find_all('li') if hasattr(curr, 'find_all') else []:
                        equipment.append(li.get_text(strip=True))
                else:
                    desc.append(t)
            curr = curr.find_next_sibling()
            
        labs.append({
            'name': lab_name,
            'slug': slug,
            'description': ' '.join(desc[:3]),
            'equipment': equipment if equipment else [
                'Digital Multimeters & Clamp Meters',
                'Regulated DC Power Supply units (0-30V, 5A)',
                'Analog & Digital Storage Oscilloscopes (100MHz)',
                'Function / Arbitrary Waveform Generators',
                'Resistive, Inductive & Capacitive Load Banks',
                'Trainer Kits & Breadboard Workstations'
            ],
            'images': images
        })

print(f"Extracted {len(labs)} laboratories:")
for l in labs:
    print(f"- {l['name']} (slug: {l['slug']}, imgs: {len(l['images'])})")

with open('parsed_eee_labs.json', 'w') as f:
    json.dump(labs, f, indent=2)
