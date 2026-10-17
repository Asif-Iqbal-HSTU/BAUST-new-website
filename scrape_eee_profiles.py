import urllib.request
import re
from bs4 import BeautifulSoup
import json
import ssl
import os
from urllib.parse import urljoin

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

links = [
    "https://baust.edu.bd/eee/employees/brig-gen-mohammad-mobarak-hossain-majumder-psc/",
    "https://baust.edu.bd/eee/employees/brig-gen-mohammad-mobarak-hossain-majumder-psc/mst-rubina-aktar/",
    "https://baust.edu.bd/eee/employees/muhammad-khairuzzaman/",
    "https://baust.edu.bd/eee/employees/mafin-muntasir-rahman/",
    "https://baust.edu.bd/eee/employees/mst-humayra-khanom/",
    "https://baust.edu.bd/eee/employees/azra-sadia-sultana/",
    "https://baust.edu.bd/eee/employees/nawshad-ahmed/",
    "https://baust.edu.bd/eee/employees/sifat-hossain/",
    "https://baust.edu.bd/eee/employees/md-shahriar-kabir/",
    "https://baust.edu.bd/eee/employees/md-mehedi-hasan/",
    "https://baust.edu.bd/eee/employees/md-hasib-mahbub/",
    "https://baust.edu.bd/eee/employees/thuifique-alam/",
    "https://baust.edu.bd/eee/employees/md-atiq-shariar/",
    "https://baust.edu.bd/eee/employees/md-rifkat-jahin/",
    "https://baust.edu.bd/eee/employees/s-m-a-jayed-bin-jabbar-sajib-2/",
    "https://baust.edu.bd/eee/employees/sanzida-rahman/",
    "https://baust.edu.bd/eee/employees/jahanara-pritha/",
    "https://baust.edu.bd/eee/employees/noor-md-zuhaer-ahanaf/",
    "https://baust.edu.bd/eee/employees/air-cdre-mohammed-hossam-e-haider-phd/",
    "https://baust.edu.bd/eee/employees/dr-md-zahurul-islam-sarkar/",
    "https://baust.edu.bd/eee/employees/ashrafun-naher-pinky/",
    "https://baust.edu.bd/eee/employees/redwan-ahmad-on-study-leave/",
    "https://baust.edu.bd/eee/employees/mir-mehedi-al-hammadi-on-study-leave/",
    "https://baust.edu.bd/eee/employees/omar-faruqe-on-study-leave/",
    "https://baust.edu.bd/eee/employees/md-yah-ya-ul-haque/",
    "https://baust.edu.bd/eee/employees/mahin-anjum/",
    "https://baust.edu.bd/eee/employees/md-alawal-kabir/",
    "https://baust.edu.bd/eee/employees/sabbir-kabir-sohag/",
    "https://baust.edu.bd/eee/employees/md-aktarul-islam/",
    "https://baust.edu.bd/eee/employees/md-arafat-sarker/",
    "https://baust.edu.bd/eee/employees/shajalal-sarker/",
    "https://baust.edu.bd/eee/employees/md-ali-chowdhery/",
]

results = []

for url in links:
    html = fetch(url)
    if not html:
        continue
    soup = BeautifulSoup(html, 'html.parser')
    
    # Title / Name
    title_el = soup.find(['h1', 'h2'], class_=lambda c: c and any(k in str(c).lower() for k in ['title', 'name', 'heading']))
    name = title_el.get_text(strip=True) if title_el else ""
    if not name:
        h1 = soup.find('h1')
        if h1:
            name = h1.get_text(strip=True)

    # Designation
    desig = ""
    desig_el = soup.find(class_=lambda c: c and 'designation' in str(c).lower())
    if desig_el:
        desig = desig_el.get_text(strip=True)
    if not desig:
        for el in soup.find_all(['h3', 'h4', 'h5', 'h6', 'p', 'span']):
            t = el.get_text(strip=True)
            if any(k in t.lower() for k in ['professor', 'lecturer', 'technician', 'assistant', 'dean', 'head']):
                desig = t
                break

    # Image
    img_url = ""
    for img in soup.find_all('img'):
        src = img.get('src', '') or img.get('data-src', '')
        if '/uploads/' in src and not any(k in src.lower() for k in ['logo', 'banner', 'icon']):
            img_url = src
            break

    # Phone, Email
    text_content = soup.get_text(" ", strip=True)
    emails = list(set(re.findall(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', text_content)))
    # filter out baust.edu.bd webmaster or standard emails if needed
    phones = list(set(re.findall(r'(\+?8801[3-9]\d{8}|01[3-9]\d{8})', text_content)))

    # Bio, Experience, Research, Publications tabs
    # Check for tab contents or sections
    tabs = {}
    for section in soup.find_all(['div', 'section'], class_=lambda c: c and any(k in str(c).lower() for k in ['elementor-tab', 'tab-pane', 'profile-section', 'jet-tabs'])):
        # Look for headings inside
        h = section.find(['h2', 'h3', 'h4', 'h5', 'h6'])
        if h:
            h_text = h.get_text(strip=True).lower()
            content = str(section)
            tabs[h_text] = content

    results.append({
        'url': url,
        'name': name,
        'designation': desig,
        'img_url': img_url,
        'emails': emails,
        'phones': phones,
        'tabs_count': len(tabs)
    })
    print(f"Scraped: {name} | {desig} | Img: {bool(img_url)} | Emails: {emails} | Phones: {phones}")

with open('/home/ubuntu/projects/baust-website/scraped_eee_employees.json', 'w') as f:
    json.dump(results, f, indent=2)
print("Saved to scraped_eee_employees.json")
