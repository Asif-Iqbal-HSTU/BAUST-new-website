import urllib.request, ssl, re
from bs4 import BeautifulSoup

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

req = urllib.request.Request('https://baust.edu.bd/eee/employees/', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req, context=ctx).read().decode('utf-8')
soup = BeautifulSoup(html, 'html.parser')

sections = []
current_sec = "Unknown"

# Traverse elements
for el in soup.find_all(['h2', 'div'], recursive=True):
    if el.name == 'h2':
        t = el.get_text(strip=True)
        if t in ['Permanent', 'Adjunct', 'Study Leave', 'Academic Officer', 'Academic Staff']:
            current_sec = t
    elif 'jet-listing-grid__item' in el.get('class', []) or 'elementor-widget-image-box' in el.get('class', []):
        pass

# Let's inspect how employees are laid out
# In Elementor/JetEngine, cards often have class or contain h3 + h6
print("Cards found:")
seen = set()
for h3 in soup.find_all('h3'):
    name = h3.get_text(strip=True)
    if not name or name in seen or name in ['About BAUST', 'Resources and Links', 'Contact Us', 'Approved BY']:
        continue
    
    # Find surrounding container
    parent = h3.find_parent('div', class_=lambda c: c and any(k in str(c).lower() for k in ['elementor-widget', 'jet-listing', 'item', 'box', 'column']))
    if not parent:
        parent = h3.parent
        
    desig = ""
    h6 = parent.find(['h6', 'h5', 'h4', 'p', 'span'])
    if h6:
        desig = h6.get_text(strip=True)
        
    img = ""
    img_el = parent.find('img')
    if img_el:
        img = img_el.get('src') or img_el.get('data-src') or ''
        
    link = ""
    a = parent.find('a', href=True)
    if a:
        link = a['href']
        
    seen.add(name)
    print(f"Name: {name} | Desig: {desig} | Img: {img} | Link: {link}")
