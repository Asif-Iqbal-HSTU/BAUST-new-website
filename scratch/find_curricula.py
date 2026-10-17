import requests
from bs4 import BeautifulSoup
import urllib3
urllib3.disable_warnings()

headers = {'User-Agent': 'Mozilla/5.0'}

for dept in ['me', 'ipe']:
    url = f"https://baust.edu.bd/{dept}/program/curriculum/"
    try:
        resp = requests.get(url, headers=headers, verify=False, timeout=15)
        soup = BeautifulSoup(resp.text, 'html.parser')
        print(f"=== {dept.upper()} CURRICULUM ===")
        for a in soup.find_all('a', href=True):
            href = a['href']
            if '.pdf' in href.lower():
                print(f"PDF: {a.get_text(strip=True)} -> {href}")
    except Exception as e:
        print(f"Error {url}: {e}")
