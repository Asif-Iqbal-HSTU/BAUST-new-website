import urllib.request, ssl, re, os, json
from bs4 import BeautifulSoup

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

req = urllib.request.Request('https://baust.edu.bd/eee/employees/', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req, context=ctx).read().decode('utf-8')
soup = BeautifulSoup(html, 'html.parser')

cards_data = []

# Find all headings and cards in order
current_section = "Permanent"

# We can traverse the elements in the content
for el in soup.find_all(['h2', 'div']):
    if el.name == 'h2':
        sec = el.get_text(strip=True)
        if sec in ['Permanent', 'Adjunct', 'Study Leave', 'Academic Officer', 'Academic Staff']:
            current_section = sec
    elif el.name == 'div' and 'cardcomponent' in el.get('class', []):
        # Extract card
        h3 = el.find('h3', class_='title')
        name = h3.get_text(strip=True) if h3 else ""
        if not name:
            continue
            
        h6 = el.find('h6', class_='designation-title')
        desig = h6.get_text(strip=True) if h6 else ""
        
        # Photo url from style
        photo_url = ""
        img_div = el.find('div', class_='image')
        if img_div and 'style' in img_div.attrs:
            m = re.search(r'url\((.*?)\)', img_div['style'])
            if m:
                photo_url = m.group(1).strip('"\'')
                
        # Phone
        phone = ""
        for s in el.find_all('span'):
            if s.find('i', class_=lambda c: c and 'fa-phone' in c):
                phone = s.get('title') or s.get_text(strip=True)
                phone = phone.replace(' ', '').strip()
                break
                
        # Email
        email_span = el.find('span', class_='email')
        official_email = ""
        personal_email = ""
        if email_span:
            raw_title = email_span.get('title', '')
            # Parse emails from title e.g. sifat@baust.edu.bd (Official) <br> sifatapon@yahoo.com (Personal)
            em_matches = re.findall(r'([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)', raw_title)
            if em_matches:
                official_email = em_matches[0]
                if len(em_matches) > 1:
                    personal_email = em_matches[1]
                    
        # Qualifications
        quals = []
        qual_span = el.find('span', class_='qualification')
        if qual_span:
            # split by br or newlines
            raw_q = qual_span.decode_contents()
            parts = re.split(r'<br\s*/?>|\n', raw_q)
            for p in parts:
                clean_p = BeautifulSoup(p, 'html.parser').get_text(strip=True)
                if clean_p and clean_p != '-':
                    quals.append(clean_p)
                    
        # Profile URL
        read_more = el.find('a', class_='read-more')
        profile_url = read_more.get('href', '') if read_more else ''
        
        cards_data.append({
            'section': current_section,
            'name': name,
            'designation': desig,
            'photo_url': photo_url,
            'phone': phone,
            'official_email': official_email,
            'personal_email': personal_email,
            'education': quals,
            'profile_url': profile_url
        })

print(f"Total cards parsed: {len(cards_data)}")
for i, c in enumerate(cards_data):
    print(f"{i+1}. [{c['section']}] {c['name']} | {c['designation']} | Photo: {bool(c['photo_url'])} | Email: {c['official_email']}")

with open('/home/ubuntu/projects/baust-website/parsed_eee_cards.json', 'w') as f:
    json.dump(cards_data, f, indent=2)
