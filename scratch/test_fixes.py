import urllib.request
import json
import html
import re

url = 'http://localhost:8086/cse/faculty'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, timeout=10) as response:
        content = response.read().decode('utf-8')
except Exception as e:
    print(f"Error fetching URL: {e}")
    exit(1)

m = re.search(r'data-page=\"([^\"]+)\"', content)
if not m:
    print("Could not find data-page attribute in HTML")
    exit(1)

page_data = json.loads(html.unescape(m.group(1)))
members = page_data.get('props', {}).get('members', [])

print(f"Total members loaded: {len(members)}")

# 1. Check Adjunct members
adjuncts = [m for m in members if m.get('type') == 'adjunct']
print(f"\nAdjunct members count: {len(adjuncts)}")
for a in adjuncts:
    print(f"  - {a['name']} ({a['designation']}) [category: {a.get('category')}]")

# 2. Check Permanent members for any accidental adjuncts
permanent = [m for m in members if m.get('type') == 'permanent']
print(f"\nPermanent members count: {len(permanent)}")
err_count = 0
for p in permanent:
    if any(k in p['name'].lower() for k in ['kaykobad', 'saidur', 'mahbubur', 'nazrul']):
        print(f"  ERROR: {p['name']} found in permanent!")
        err_count += 1
if err_count == 0:
    print("  ✓ SUCCESS: None of the adjunct professors are in permanent!")

# 3. Test areas of interest parser logic
def parse_areas_of_interest(val):
    if not val:
        return []
    raw_list = []
    if isinstance(val, list):
        raw_list = val
    elif isinstance(val, str):
        trimmed = val.strip()
        if trimmed.startswith('[') and trimmed.endswith(']'):
            try:
                parsed = json.loads(trimmed)
                if isinstance(parsed, list):
                    raw_list = parsed
                else:
                    raw_list = [trimmed]
            except Exception:
                raw_list = re.sub(r'^[\[\s]+|[\]\s]+$', '', trimmed).split(',')
        else:
            raw_list = trimmed.split(',')
    
    result = []
    for item in raw_list:
        if item is None:
            continue
        s = str(item).strip()
        s = re.sub(r'[\[\]"\'\u201C\u201D\u2018\u2019]', '', s).strip()
        if s and s not in result:
            result.push(s) if hasattr(result, 'push') else result.append(s)
    return result

print("\n--- TEST PARSE AREAS OF INTEREST ON JAHANGIR ALAM ---")
for m in members:
    if 'Jahangir' in m['name']:
        parsed = parse_areas_of_interest(m.get('areas_of_interest'))
        print(f"Name: {m['name']}")
        print(f"Parsed items ({len(parsed)}):")
        for item in parsed:
            has_bad_char = any(c in item for c in ['[', ']', '"', "'"])
            status = "FAIL (contains bad chars)" if has_bad_char else "OK"
            print(f"  [{status}] {item}")
