import json, urllib.request, ssl, re
from bs4 import BeautifulSoup

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

with open('parsed_eee_cards_with_local.json') as f:
    cards = json.load(f)

headers = {'User-Agent': 'Mozilla/5.0'}

for c in cards:
    p_url = c.get('profile_url')
    if not p_url:
        continue
    try:
        req = urllib.request.Request(p_url, headers=headers)
        html = urllib.request.urlopen(req, context=ctx, timeout=15).read().decode('utf-8')
        soup = BeautifulSoup(html, 'html.parser')
        
        # Check for bio / experience / research / publications
        full_text = soup.get_text(" ", strip=True)
        
        # Look for headings
        found_sections = {}
        for h in soup.find_all(['h2', 'h3', 'h4', 'h5', 'h6']):
            ht = h.get_text(strip=True).lower()
            if any(k in ht for k in ['biography', 'about', 'experience', 'interest', 'research', 'publication']):
                # get next element or parent section
                parent = h.find_parent(['div', 'section'])
                if parent:
                    found_sections[ht] = str(parent)
                    
        c['scraped_sections'] = list(found_sections.keys())
        c['has_publications'] = any('publication' in k for k in found_sections)
        c['has_research'] = any('interest' in k or 'research' in k for k in found_sections)
        print(f"{c['name']} -> sections: {list(found_sections.keys())}")
    except Exception as e:
        print(f"Error for {c['name']} ({p_url}): {e}")

with open('parsed_eee_cards_full.json', 'w') as f:
    json.dump(cards, f, indent=2)
print("Saved parsed_eee_cards_full.json")
