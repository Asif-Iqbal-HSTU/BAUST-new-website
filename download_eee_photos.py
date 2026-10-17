import json, urllib.request, ssl, os, re

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

with open('/home/ubuntu/projects/baust-website/parsed_eee_cards.json') as f:
    cards = json.load(f)

dest_dir = '/home/ubuntu/projects/baust-website/public/images/eee/members'
os.makedirs(dest_dir, exist_ok=True)

for c in cards:
    photo_url = c['photo_url']
    name = c['name']
    
    # Generate a clean filename slug
    slug = re.sub(r'[^a-zA-Z0-9]+', '_', name.lower()).strip('_')
    # strip honorifics from start of slug if desired
    slug = re.sub(r'^(dr_|prof_|engr_|brig_gen_|air_cdre_|lt_col_)', '', slug)
    
    # Check extension
    ext = os.path.splitext(photo_url)[1] or '.jpg'
    if '?' in ext:
        ext = ext.split('?')[0]
    filename = f"{slug}{ext}"
    local_path = os.path.join(dest_dir, filename)
    
    print(f"Downloading {name} -> {filename} from {photo_url}")
    try:
        req = urllib.request.Request(photo_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
            content = resp.read()
            with open(local_path, 'wb') as out_f:
                out_f.write(content)
        c['local_photo'] = f"/images/eee/members/{filename}"
        print(f" Saved ({len(content)} bytes)")
    except Exception as e:
        print(f" Failed to download {photo_url}: {e}")
        c['local_photo'] = None

with open('/home/ubuntu/projects/baust-website/parsed_eee_cards_with_local.json', 'w') as f:
    json.dump(cards, f, indent=2)
print("Updated parsed_eee_cards_with_local.json")
