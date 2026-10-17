import urllib.request
import re
from bs4 import BeautifulSoup
import json
import ssl
import os

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

html = fetch('https://baust.edu.bd/eee/employees/')
soup = BeautifulSoup(html, 'html.parser')

# Find all cards and their links
members = []

# Elements with headings
current_section = "Permanent"
for el in soup.find_all(['h2', 'div', 'article']):
    if el.name == 'h2':
        txt = el.get_text(strip=True)
        if txt in ['Permanent', 'Adjunct', 'Study Leave', 'Academic Officer', 'Academic Staff', 'Ex Faculty']:
            current_section = txt
            continue

sections = soup.find_all('h2')
print("Found sections:")
for s in sections:
    print("- ", s.get_text(strip=True))

# Extract all cards
card_divs = soup.find_all('div', class_=lambda c: c and 'jet-listing-grid__item' in str(c))
if not card_divs:
    # Try finding image-box or elementor-widget-container
    card_divs = soup.find_all('div', class_=lambda c: c and ('elementor-widget-wrap' in str(c) or 'elementor-column' in str(c)))

print(f"Candidate divs: {len(card_divs)}")

# Let's write a scraper that finds all employee links from the page
links = []
for a in soup.find_all('a', href=True):
    href = a['href']
    if 'baust.edu.bd/eee/employees/' in href and href != 'https://baust.edu.bd/eee/employees/' and href not in links:
        links.append(href)

print(f"Found {len(links)} employee profile links:")
for l in links:
    print(l)
