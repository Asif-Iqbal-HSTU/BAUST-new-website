import urllib.request
import json
import re
import html

url = 'http://127.0.0.1:8086/ipe'
req = urllib.request.urlopen(url)
body = req.read().decode('utf-8')

m = re.search(r'data-page="([^"]+)"', body)
if m:
    data = json.loads(html.unescape(m.group(1)))
    dept = data.get('props', {}).get('department', {})
    print("Department name:", dept.get('name'))
    print("Slides count:", len(dept.get('slides', [])))
    for s in dept.get('slides', []):
        print("  - image:", s.get('image'), "| title:", s.get('title'))
else:
    print("No data-page found")
