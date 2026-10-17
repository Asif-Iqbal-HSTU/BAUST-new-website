import urllib.request
import re
from bs4 import BeautifulSoup
import json
import ssl

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
if html:
    soup = BeautifulSoup(html, 'html.parser')
    cards = soup.find_all(['div', 'article'], class_=lambda c: c and any(k in str(c).lower() for k in ['team', 'member', 'employee', 'person', 'profile', 'card', 'elementor-widget-image-box']))
    print(f"Page title: {soup.title.string if soup.title else 'No title'}")
    
    # Check links or employee blocks
    emp_links = []
    for a in soup.find_all('a', href=True):
        href = a['href']
        if '/eee/' in href and any(sub in href for sub in ['member', 'employee', 'faculty', 'profile', 'teacher', 'officer', 'staff']) and href not in emp_links:
            emp_links.append(href)
    print(f"Found {len(emp_links)} specific links: {emp_links[:10]}")

    # Let's inspect headings and text
    print("\n--- Sections / Headings ---")
    for h in soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
        txt = h.get_text(strip=True)
        if txt:
            print(f"{h.name}: {txt}")
