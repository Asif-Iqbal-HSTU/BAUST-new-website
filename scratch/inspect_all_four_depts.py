#!/usr/bin/env python3
import urllib.request
import re
import json
import time
from bs4 import BeautifulSoup

def cf_decode(cf_hex):
    try:
        r = int(cf_hex[:2], 16)
        email = ''.join([chr(int(cf_hex[i:i+2], 16) ^ r) for i in range(2, len(cf_hex), 2)])
        return email.strip()
    except Exception:
        return ''

def clean_tab_html(tab):
    if not tab:
        return None
    # Replace CF email protection links with real emails
    for cf in tab.find_all(attrs={'data-cfemail': True}):
        dec = cf_decode(cf['data-cfemail'])
        cf.replace_with(dec)
    for a in tab.find_all('a', href=lambda h: h and 'email-protection' in h):
        if a.get_text(strip=True) == '[email protected]':
            a.decompose()
            
    # Clean multiple consecutive empty paragraphs or &nbsp;
    html = ''.join(str(c) for c in tab.contents).strip()
    text = tab.get_text(strip=True)
    
    placeholders = [
        'experience', 'publications', 'research interests', 
        'achievement, awards and grants', 'seminar workshop', 
        'seminar/workshop', 'training', 'others', 'teaching experience:',
        'research interests:', 'none', 'n/a', 'nil'
    ]
    if not text:
        return None
    if text.lower().strip(': ') in placeholders:
        return None
    html = re.sub(r'<p>\s*(&nbsp;|\s)*\s*</p>', '', html)
    return html.strip() or None

def determine_category(designation):
    d = designation.lower()
    if 'professor and head' in d or 'professor & head' in d:
        if 'assistant' in d:
            return 'assistant_professor'
        elif 'associate' in d:
            return 'associate_professor'
        else:
            return 'professor'
    if 'assistant professor' in d:
        return 'assistant_professor'
    elif 'associate professor' in d:
        return 'associate_professor'
    elif 'professor' in d:
        return 'professor'
    elif 'lecturer' in d:
        return 'lecturer'
    elif 'adjunct' in d or 'guest' in d:
        return 'lecturer'
    return 'lecturer'

def scrape_department(dept_code):
    list_url = f'https://baust.edu.bd/{dept_code}/faculty-members/'
    print(f'\n========================================')
    print(f'Fetching {dept_code.upper()} faculty from: {list_url}')
    print(f'========================================')
    
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
    try:
        req = urllib.request.Request(list_url, headers=headers)
        html = urllib.request.urlopen(req, timeout=30).read().decode('utf-8')
    except Exception as e:
        print(f'Failed to fetch {list_url}: {e}')
        return []

    soup = BeautifulSoup(html, 'html.parser')
    cards = soup.find_all('div', class_='card-area')
    print(f'Found {len(cards)} cards in {dept_code.upper()}.')

    faculty = []

    for idx, card in enumerate(cards):
        title_el = card.find(class_='title')
        desig_el = card.find(class_='designation-title')
        link_el = card.find('a', href=lambda h: h and '/employees/' in h)
        img_div = card.find(class_='image')
        
        name = title_el.get_text(strip=True) if title_el else ''
        designation = desig_el.get_text(strip=True) if desig_el else ''
        profile_url = link_el['href'].strip() if link_el else ''
        
        photo_url = ''
        if img_div and img_div.get('style'):
            m = re.search(r'url\((.*?)\)', img_div['style'])
            if m:
                p = m.group(1).strip('\'"')
                if 'no-profile-pic' not in p:
                    photo_url = p
        
        contact_spans = card.select('.profile-contact-info span')
        card_phone = ''
        card_email = ''
        for sp in contact_spans:
            t = sp.get_text(strip=True)
            cf = sp.find(attrs={'data-cfemail': True})
            if cf:
                card_email = cf_decode(cf['data-cfemail'])
            elif '@' in t:
                card_email = t
            elif any(c.isdigit() for c in t) and len(t) >= 10:
                card_phone = t

        slug = ''
        if profile_url:
            m = re.search(r'/employees/([^/]+)/?', profile_url)
            if m:
                slug = m.group(1)

        record = {
            'order': idx + 1,
            'department': dept_code,
            'name': name,
            'designation': designation,
            'category': determine_category(designation),
            'type': 'permanent',
            'status': 'active',
            'slug': slug,
            'wp_profile_url': profile_url,
            'photo': photo_url,
            'phone': card_phone,
            'email': card_email,
            'personal_email': '',
            'education': [],
            'specialization': '',
            'areas_of_interest': [],
            'biography': None,
            'experience': None,
            'publications': None,
            'research': None,
            'achievements': None,
            'seminars': None,
            'training': None,
            'others': None
        }

        if 'study leave' in designation.lower() or 'on leave' in designation.lower() or 'study leave' in name.lower():
            record['status'] = 'study_leave'

        if 'adjunct' in designation.lower():
            record['type'] = 'adjunct'

        if profile_url:
            try:
                p_req = urllib.request.Request(profile_url, headers=headers)
                p_html = urllib.request.urlopen(p_req, timeout=25).read().decode('utf-8')
                p_soup = BeautifulSoup(p_html, 'html.parser')

                page_text = p_soup.get_text()
                if 'study leave' in page_text.lower() and ('(on study leave)' in page_text.lower() or 'study leave' in record['designation'].lower()):
                    record['status'] = 'study_leave'

                p_info = p_soup.find(class_='profile-info')
                if p_info:
                    h4 = p_info.find('h4')
                    if h4 and len(h4.get_text(strip=True)) > 2:
                        record['name'] = h4.get_text(strip=True)

                    for p in p_info.find_all('p'):
                        txt = p.get_text(strip=True)
                        if txt.startswith('Designation:'):
                            des = txt.replace('Designation:', '').strip()
                            if des:
                                record['designation'] = des
                                record['category'] = determine_category(des)
                                if 'study leave' in des.lower():
                                    record['status'] = 'study_leave'
                                if 'adjunct' in des.lower():
                                    record['type'] = 'adjunct'
                        elif txt.startswith('Qualification:'):
                            qual = txt.replace('Qualification:', '').strip()
                            if qual:
                                parts = [q.strip() for q in re.split(r'[;\n]', qual) if q.strip()]
                                record['education'] = parts

                p_contact = p_soup.find(class_='profile-contact')
                if p_contact:
                    for p in p_contact.find_all('p'):
                        txt = p.get_text(strip=True)
                        if 'Mobile:' in txt or 'Phone:' in txt:
                            mob = p.get_text(separator=' ', strip=True).replace('Mobile:', '').replace('Phone:', '').strip()
                            if mob:
                                record['phone'] = mob
                        elif 'E-mail:' in txt or 'Email:' in txt:
                            emails = []
                            for cf in p.find_all(attrs={'data-cfemail': True}):
                                dec = cf_decode(cf['data-cfemail'])
                                if dec and dec not in emails:
                                    emails.append(dec)
                            for em in re.findall(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', p.get_text()):
                                if em not in emails and 'email-protection' not in em:
                                    emails.append(em)
                            if emails:
                                record['email'] = emails[0]
                                if len(emails) > 1:
                                    record['personal_email'] = ', '.join(emails[1:])

                interests_div = p_soup.find('div', class_='profile-interrest-container')
                if interests_div:
                    interests = []
                    for p_tag in interests_div.select('.interestSpanDiv p, .interestSpanDiv a'):
                        itxt = p_tag.get_text(strip=True)
                        if itxt and itxt not in interests:
                            interests.append(itxt)
                    if not interests:
                        raw = interests_div.get_text(strip=True).replace('Areas of Interest', '').replace('Areas of interest', '').strip()
                        if raw:
                            interests = [raw]
                    record['areas_of_interest'] = interests
                    if interests and not record['specialization']:
                        record['specialization'] = ', '.join(interests[:2])

                # Tabs check
                t1 = p_soup.find(id='tab-1')
                t2 = p_soup.find(id='tab-2')
                t3 = p_soup.find(id='tab-3')
                t4 = p_soup.find(id='tab-4')
                t5 = p_soup.find(id='tab-5')
                t6 = p_soup.find(id='tab-6')
                t8 = p_soup.find(id='tab-8')

                record['experience'] = clean_tab_html(t1)
                record['publications'] = clean_tab_html(t2)
                record['research'] = clean_tab_html(t3)
                record['achievements'] = clean_tab_html(t4)
                record['seminars'] = clean_tab_html(t5)
                record['training'] = clean_tab_html(t6)
                record['others'] = clean_tab_html(t8)

                # Report active tabs found
                found_tabs = []
                if record['experience']: found_tabs.append('Experience')
                if record['publications']: found_tabs.append('Publications')
                if record['research']: found_tabs.append('Research')
                if record['achievements']: found_tabs.append('Achievements')
                if record['seminars']: found_tabs.append('Seminars')
                if record['training']: found_tabs.append('Training')
                if record['others']: found_tabs.append('Others')
                if record['education']: found_tabs.append(f"Education({len(record['education'])})")
                if record['areas_of_interest']: found_tabs.append(f"Interests({len(record['areas_of_interest'])})")

                print(f"[{idx+1}/{len(cards)}] {record['name']} -> Tabs: {', '.join(found_tabs) if found_tabs else 'None'}")

            except Exception as ex:
                print(f"[{idx+1}/{len(cards)}] Error fetching {profile_url}: {ex}")

        faculty.append(record)
        time.sleep(0.05)

    return faculty

def main():
    depts = ['ict', 'eee', 'me', 'ipe']
    all_data = {}
    for d in depts:
        faculty = scrape_department(d)
        all_data[d] = faculty
        
    out_file = '/home/ubuntu/projects/baust-website/scratch/four_depts_faculty_scraped.json'
    with open(out_file, 'w', encoding='utf-8') as f:
        json.dump(all_data, f, indent=2, ensure_ascii=False)
    print(f"\nScraping complete! Saved all data to {out_file}")

if __name__ == '__main__':
    main()
