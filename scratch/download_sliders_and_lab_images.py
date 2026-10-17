import os
import re
import json
import requests
from bs4 import BeautifulSoup
import urllib3
urllib3.disable_warnings()

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
BASE_DIR = '/home/ubuntu/projects/baust-website'

def download_file(url, target_path):
    if os.path.exists(target_path) and os.path.getsize(target_path) > 1000:
        return True
    try:
        r = requests.get(url, headers=headers, verify=False, timeout=25)
        if r.status_code == 200 and len(r.content) > 1000:
            os.makedirs(os.path.dirname(target_path), exist_ok=True)
            with open(target_path, 'wb') as f:
                f.write(r.content)
            return True
        return False
    except Exception as e:
        print(f"Error downloading {url}: {e}")
        return False

# 1. DOWNLOAD SLIDERS
me_sliders = [
    ("https://baust.edu.bd/me/sliders/accredited-by-baete-under-the-washington-accord/", "Accredited by BAETE under the Washington Accord", "Department of Mechanical Engineering"),
    ("https://baust.edu.bd/me/sliders/champion-trophy/", "Champion Trophy - Annual Sports Tournament", "Excellence in Extracurricular Achievements"),
    ("https://baust.edu.bd/me/sliders/e-football-competition-of-clutch-carnival-1-0/", "Clutch Carnival 1.0 - Technical & Gaming Fest", "Empowering Youth and Technical Talents"),
    ("https://baust.edu.bd/me/sliders/inter-department-champion-of-summer-2024/", "Inter-Department Champion Summer 2024", "Mechanical Engineering Department"),
]

ipe_sliders = [
    ("https://baust.edu.bd/ipe/sliders/b-sc-in-ipe-of-baust-is-accredited-by-ieb-baete/", "B.Sc. in IPE is Accredited by IEB-BAETE", "Quality Assurance & Outcome-Based Education"),
    ("https://baust.edu.bd/ipe/sliders/celebrating-prof-dr-imtiaz-ahmed-choudhurys-recognition-among-the-worlds-top-2-researchers/", "World's Top 2% Scientist Recognition", "Honoring Prof. Dr. Imtiaz Ahmed Choudhury"),
    ("https://baust.edu.bd/ipe/sliders/honorable-chief-of-army-staff-visited-baust-campus/", "Honorable Chief of Army Staff Visited BAUST", "Guiding Future Engineers and Leaders"),
    ("https://baust.edu.bd/ipe/sliders/industrial-visit-at-leatherware-ltd/", "Industrial Visit at Apex Footwear & Leatherware Ltd.", "Bridging Industry Standards with Classroom Learning"),
    ("https://baust.edu.bd/ipe/sliders/ipe-students-with-faculty-members/", "IPE Students with Faculty Members", "Collaborative Academic Environment"),
    ("https://baust.edu.bd/ipe/sliders/seminar-on-role-of-industrial-engineers-in-managing-operations-by-prof-dr-abdullahil-azeem-buet/", "Seminar on Role of Industrial Engineers in Operations", "Distinguished Guest Lecture by Prof. Dr. Abdullahil Azeem (BUET)"),
]

slides_result = {'me': [], 'ipe': []}

for dept, s_list in [('me', me_sliders), ('ipe', ipe_sliders)]:
    print(f"\nDownloading {dept.upper()} sliders...")
    for idx, (s_url, title, subtitle) in enumerate(s_list, 1):
        try:
            r = requests.get(s_url, headers=headers, verify=False, timeout=15)
            soup = BeautifulSoup(r.text, 'html.parser')
            # Look for featured image
            img_src = None
            for img in soup.find_all('img'):
                src = img.get('src')
                if src and 'uploads/sites/' in src and not any(x in src.lower() for x in ['logo', 'icon', 'ugc', 'goved']):
                    img_src = src
                    break
            if img_src:
                ext = img_src.split('.')[-1].split('?')[0]
                fname = f"slide_{idx}.{ext}"
                tgt = f"{BASE_DIR}/public/images/{dept}/slides/{fname}"
                if download_file(img_src, tgt):
                    slides_result[dept].append({
                        'title': title,
                        'subtitle': subtitle,
                        'image': f"/images/{dept}/slides/{fname}",
                        'order': idx
                    })
                    print(f"Saved {dept.upper()} slide {idx}: {title} -> {fname}")
        except Exception as e:
            print(f"Error slider {s_url}: {e}")

# 2. DOWNLOAD LAB IMAGES
for dept in ['me', 'ipe']:
    print(f"\nDownloading {dept.upper()} laboratory images...")
    with open(f"{BASE_DIR}/scratch_labs.json") as f:
        labs_data = json.load(f)
    
    dept_labs = labs_data.get(dept, [])
    for lab in dept_labs:
        slug = lab['slug']
        if slug in ['laboratories']:
            continue
        l_url = f"https://baust.edu.bd/{dept}/facilities/laboratories/{slug}/"
        try:
            r = requests.get(l_url, headers=headers, verify=False, timeout=15)
            soup = BeautifulSoup(r.text, 'html.parser')
            
            lab_imgs = []
            img_idx = 1
            for img in soup.find_all('img'):
                src = img.get('src')
                if src and f'uploads/sites/' in src and not any(x in src.lower() for x in ['logo', 'icon', 'ugc', 'goved', 'back.png', 'baust-2.png']):
                    ext = src.split('.')[-1].split('?')[0]
                    fname = f"{img_idx}.{ext}"
                    tgt = f"{BASE_DIR}/public/images/{dept}/laboratories/{slug}/{fname}"
                    if download_file(src, tgt):
                        lab_imgs.append(f"/images/{dept}/laboratories/{slug}/{fname}")
                        img_idx += 1
                        if img_idx > 6:
                            break
            lab['images'] = lab_imgs
            print(f"Lab {slug}: downloaded {len(lab_imgs)} images")
        except Exception as e:
            print(f"Error {slug}: {e}")

    labs_data[dept] = [l for l in dept_labs if l['slug'] not in ['laboratories']]
    with open(f"{BASE_DIR}/scratch_labs.json", 'w') as f:
        json.dump(labs_data, f, indent=2)

with open(f"{BASE_DIR}/scratch_slides.json", 'w') as f:
    json.dump(slides_result, f, indent=2)

print("\nDone downloading sliders and lab images!")
