import os
import re
import json
import requests
from bs4 import BeautifulSoup
import urllib3
urllib3.disable_warnings()

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
BASE_DIR = '/home/ubuntu/projects/baust-website'

def safe_filename(name):
    clean = re.sub(r'[^a-zA-Z0-9_\-\.]', '_', name.strip().lower())
    return re.sub(r'_+', '_', clean)

def download_file(url, target_path):
    if os.path.exists(target_path) and os.path.getsize(target_path) > 500:
        return True
    try:
        r = requests.get(url, headers=headers, verify=False, timeout=25)
        if r.status_code == 200 and len(r.content) > 200:
            os.makedirs(os.path.dirname(target_path), exist_ok=True)
            with open(target_path, 'wb') as f:
                f.write(r.content)
            return True
        else:
            return False
    except Exception as e:
        print(f"Error downloading {url}: {e}")
        return False

# ----------------------------------------------------
# 2. SCRAPE LABORATORIES
# ----------------------------------------------------
dept_labs_data = {}

for dept in ['me', 'ipe']:
    print(f"\n=================== SCRAPING {dept.upper()} LABORATORIES ===================")
    url = f"https://baust.edu.bd/{dept}/facilities/laboratories/"
    resp = requests.get(url, headers=headers, verify=False)
    soup = BeautifulSoup(resp.text, 'html.parser')
    
    # Find all lab links
    lab_links = []
    for a in soup.find_all('a', href=True):
        href = a['href']
        if f"/{dept}/facilities/laboratories/" in href and href.strip('/') != f"https://baust.edu.bd/{dept}/facilities/laboratories":
            if href not in lab_links:
                lab_links.append(href)
                
    print(f"Found {len(lab_links)} lab links for {dept.upper()}")
    labs = []
    
    for l_url in lab_links:
        slug = l_url.strip('/').split('/')[-1]
        try:
            l_resp = requests.get(l_url, headers=headers, verify=False, timeout=20)
            l_soup = BeautifulSoup(l_resp.text, 'html.parser')
            
            title_el = l_soup.find('h1') or l_soup.find('h2')
            title = title_el.get_text(strip=True) if title_el else slug.replace('-', ' ').title()
            
            # Text content
            content_div = l_soup.find('div', class_=re.compile(r'entry-content|content', re.I))
            desc = ""
            equipment = []
            objectives = []
            
            if content_div:
                paragraphs = [p.get_text(strip=True) for p in content_div.find_all('p') if p.get_text(strip=True)]
                desc = "\n\n".join(paragraphs[:3]) if paragraphs else "State-of-the-art laboratory facility."
                
                # Look for lists
                for li in content_div.find_all('li'):
                    txt = li.get_text(strip=True)
                    if len(txt) > 3:
                        equipment.append(txt)
                        
            # Images
            images = []
            if content_div:
                for img in content_div.find_all('img'):
                    src = img.get('src')
                    if src and not any(x in src.lower() for x in ['logo', 'icon', 'arrow']):
                        img_name = os.path.basename(src.split('?')[0])
                        local_target = f"{BASE_DIR}/public/images/{dept}/laboratories/{slug}/{img_name}"
                        if download_file(src, local_target):
                            images.append(f"/images/{dept}/laboratories/{slug}/{img_name}")
                            
            lab_obj = {
                'name': title,
                'slug': slug,
                'description': desc,
                'equipment': equipment[:8] if equipment else [f"Standard {title} apparatus", "Testing workstations"],
                'objectives': [f"Hands-on practical training in {title}", "Experimental verification of theoretical principles"],
                'images': images
            }
            labs.append(lab_obj)
            print(f"Scraped Lab: {title} ({slug}) with {len(images)} images")
        except Exception as e:
            print(f"Error scraping {l_url}: {e}")
            
    dept_labs_data[dept] = labs

with open(f"{BASE_DIR}/scratch_labs.json", 'w') as f:
    json.dump(dept_labs_data, f, indent=2)

# ----------------------------------------------------
# 3. SCRAPE HERO SLIDERS
# ----------------------------------------------------
dept_slides_data = {}
for dept in ['me', 'ipe']:
    print(f"\n=================== SCRAPING {dept.upper()} SLIDERS ===================")
    url = f"https://baust.edu.bd/{dept}/"
    resp = requests.get(url, headers=headers, verify=False)
    soup = BeautifulSoup(resp.text, 'html.parser')
    
    slides = []
    # Find slider images
    slider_imgs = soup.find_all('img', src=re.compile(r'slider|banner|uploads/sites/(19|25)', re.I))
    idx = 1
    seen_srcs = set()
    for img in slider_imgs:
        src = img.get('src')
        if not src or src in seen_srcs or any(x in src.lower() for x in ['logo', 'icon', 'footer']):
            continue
        seen_srcs.add(src)
        
        fname = f"slide_{idx}.jpg"
        tgt = f"{BASE_DIR}/public/images/{dept}/slides/{fname}"
        if download_file(src, tgt):
            slides.append({
                'title': f"Excellence in {dept.upper()} Education & Research",
                'subtitle': "Bangladesh Army University of Science and Technology",
                'image': f"/images/{dept}/slides/{fname}",
                'order': idx
            })
            idx += 1
            if idx > 6:
                break
    dept_slides_data[dept] = slides

with open(f"{BASE_DIR}/scratch_slides.json", 'w') as f:
    json.dump(dept_slides_data, f, indent=2)

print("\nFacility and slider scraping finished!")
