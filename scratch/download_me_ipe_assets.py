import os
import re
import json
import requests
from bs4 import BeautifulSoup
import urllib3
urllib3.disable_warnings()

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

BASE_DIR = '/home/ubuntu/projects/baust-website'
os.makedirs(f"{BASE_DIR}/public/images/me/members", exist_ok=True)
os.makedirs(f"{BASE_DIR}/public/images/me/laboratories", exist_ok=True)
os.makedirs(f"{BASE_DIR}/public/images/me/slides", exist_ok=True)
os.makedirs(f"{BASE_DIR}/public/images/ipe/members", exist_ok=True)
os.makedirs(f"{BASE_DIR}/public/images/ipe/laboratories", exist_ok=True)
os.makedirs(f"{BASE_DIR}/public/images/ipe/slides", exist_ok=True)
os.makedirs(f"{BASE_DIR}/public/storage/departments", exist_ok=True)
os.makedirs(f"{BASE_DIR}/storage/app/public/departments", exist_ok=True)

def safe_filename(name):
    clean = re.sub(r'[^a-zA-Z0-9_\-\.]', '_', name.strip().lower())
    return re.sub(r'_+', '_', clean)

def download_file(url, target_path):
    if os.path.exists(target_path) and os.path.getsize(target_path) > 500:
        return True
    try:
        r = requests.get(url, headers=headers, verify=False, timeout=25)
        if r.status_code == 200 and len(r.content) > 200:
            with open(target_path, 'wb') as f:
                f.write(r.content)
            return True
        else:
            print(f"Failed ({r.status_code}): {url}")
            return False
    except Exception as e:
        print(f"Error downloading {url}: {e}")
        return False

# ----------------------------------------------------
# 1. SCRAPE EMPLOYEES
# ----------------------------------------------------
dept_members_data = {}

for dept in ['me', 'ipe']:
    print(f"\n=================== SCRAPING {dept.upper()} EMPLOYEES ===================")
    url = f"https://baust.edu.bd/{dept}/employees/"
    resp = requests.get(url, headers=headers, verify=False)
    soup = BeautifulSoup(resp.text, 'html.parser')
    
    cards = soup.find_all(class_=lambda x: x and 'cardcomponent' in x)
    members = []
    seen_names = set()
    
    for card in cards:
        name_el = card.find(class_=re.compile(r'title|name', re.I))
        name = name_el.get_text(strip=True) if name_el else ""
        if not name or name in seen_names:
            continue
        seen_names.add(name)
        
        desig_el = card.find(class_=re.compile(r'designation|role|subtitle', re.I))
        desig = desig_el.get_text(strip=True) if desig_el else ""
        
        # Phone & Email
        phone = None
        email = None
        
        contact_spans = card.find_all('span', class_=re.compile(r'contact|phone|email', re.I))
        for sp in contact_spans:
            txt = sp.get_text(strip=True)
            if re.search(r'\+?880\d+|01[3-9]\d{8}', txt):
                phone = txt
            if '@' in txt:
                email = txt
            if sp.get('title') and '@' in sp['title']:
                email = sp['title'].strip()
                
        # Qualifications
        qual_el = card.find(class_=re.compile(r'qualification|degree|edu', re.I))
        qualifications = []
        if qual_el:
            for line in qual_el.stripped_strings:
                if line:
                    qualifications.append(line)
                    
        # Photo
        photo_url = None
        img_el = card.find('img')
        if img_el and img_el.get('src'):
            photo_url = img_el['src']
        else:
            div_bg = card.find(style=re.compile(r'background.*url', re.I))
            if div_bg:
                m = re.search(r'url\((.*?)\)', div_bg['style'])
                if m:
                    photo_url = m.group(1).strip("'\"")
                    
        local_photo = None
        if photo_url and 'no-profile-pic' not in photo_url:
            ext = photo_url.split('.')[-1].split('?')[0]
            if len(ext) > 4 or not ext:
                ext = 'jpg'
            fname = f"{safe_filename(name)}.{ext}"
            tgt = f"{BASE_DIR}/public/images/{dept}/members/{fname}"
            if download_file(photo_url, tgt):
                local_photo = f"/images/{dept}/members/{fname}"
                
        # Category classification
        desig_lower = desig.lower()
        if 'professor' in desig_lower and 'associate' not in desig_lower and 'assistant' not in desig_lower:
            cat = 'professor'
            m_type = 'permanent'
        elif 'associate professor' in desig_lower:
            cat = 'associate_professor'
            m_type = 'permanent'
        elif 'assistant professor' in desig_lower:
            cat = 'assistant_professor'
            m_type = 'permanent'
        elif 'lecturer' in desig_lower:
            cat = 'lecturer'
            m_type = 'permanent'
        elif 'technician' in desig_lower:
            cat = 'academic_officer'
            m_type = 'staff'
        elif 'assistant' in desig_lower or 'cleaner' in desig_lower or 'staff' in desig_lower:
            cat = 'academic_staff'
            m_type = 'staff'
        else:
            cat = 'lecturer'
            m_type = 'permanent'
            
        if 'buet' in desig_lower:
            m_type = 'adjunct'
            
        status = 'study_leave' if 'leave' in desig_lower or 'leave' in name.lower() else 'active'
        
        member_obj = {
            'name': name,
            'designation': desig,
            'phone': phone,
            'email': email,
            'education': qualifications,
            'photo': local_photo,
            'photo_src': photo_url,
            'category': cat,
            'type': m_type,
            'status': status
        }
        members.append(member_obj)
        print(f"Scraped {name} ({desig}) -> {local_photo}")
        
    dept_members_data[dept] = members

with open(f"{BASE_DIR}/scratch_members.json", 'w') as f:
    json.dump(dept_members_data, f, indent=2)

print("\nMember scraping finished! Saved to scratch_members.json")
