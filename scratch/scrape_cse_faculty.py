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
            
    # Get inner html
    html = ''.join(str(c) for c in tab.contents).strip()
    text = tab.get_text(strip=True)
    
    # Generic placeholder filter
    placeholders = [
        'experience', 'publications', 'research interests', 
        'achievement, awards and grants', 'seminar workshop', 
        'seminar/workshop', 'training', 'others', 'teaching experience:',
        'research interests:'
    ]
    if not text:
        return None
    if text.lower().strip(': ') in placeholders:
        return None
    # Clean multiple consecutive &nbsp; or <p>&nbsp;</p>
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

def main():
    list_url = 'https://baust.edu.bd/cse/faculty-members/'
    print(f'Fetching faculty listing from {list_url}...')
    req = urllib.request.Request(list_url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    html = urllib.request.urlopen(req, timeout=30).read().decode('utf-8')
    soup = BeautifulSoup(html, 'html.parser')

    cards = soup.find_all('div', class_='card-area')
    print(f'Found {len(cards)} faculty cards.')

    faculty_list = []

    for idx, card in enumerate(cards):
        title_el = card.find(class_='title')
        desig_el = card.find(class_='designation-title')
        link_el = card.find('a', href=lambda h: h and '/employees/' in h)
        img_div = card.find(class_='image')
        
        name = title_el.get_text(strip=True) if title_el else ''
        designation = desig_el.get_text(strip=True) if desig_el else ''
        profile_url = link_el['href'].strip() if link_el else ''
        
        # Photo from card background style
        photo_url = ''
        if img_div and img_div.get('style'):
            m = re.search(r'url\((.*?)\)', img_div['style'])
            if m:
                p = m.group(1).strip('\'"')
                if 'no-profile-pic' not in p:
                    photo_url = p
        
        # Also card contact info
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

        print(f'[{idx+1}/{len(cards)}] Processing: {name} ({designation}) | Slug: {slug}')

        details = {
            'order': idx + 1,
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
            details['status'] = 'study_leave'

        if 'adjunct' in designation.lower():
            details['type'] = 'adjunct'

        # Fetch detail page
        if profile_url:
            try:
                d_req = urllib.request.Request(profile_url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
                d_html = urllib.request.urlopen(d_req, timeout=20).read().decode('utf-8')
                d_soup = BeautifulSoup(d_html, 'html.parser')

                # Check status in title or body
                page_text = d_soup.get_text()
                if 'study leave' in page_text.lower() and ('(on study leave)' in page_text.lower() or 'study leave' in details['designation'].lower()):
                    details['status'] = 'study_leave'

                # Profile info & contact
                p_info = d_soup.find(class_='profile-info')
                if p_info:
                    # Full name if better
                    h4 = p_info.find('h4')
                    if h4 and len(h4.get_text(strip=True)) > 2:
                        details['name'] = h4.get_text(strip=True)

                    # Check designation & qualification
                    for p in p_info.find_all('p'):
                        txt = p.get_text(strip=True)
                        if txt.startswith('Designation:'):
                            des = txt.replace('Designation:', '').strip()
                            if des:
                                details['designation'] = des
                                details['category'] = determine_category(des)
                                if 'study leave' in des.lower():
                                    details['status'] = 'study_leave'
                                if 'adjunct' in des.lower():
                                    details['type'] = 'adjunct'
                        elif txt.startswith('Qualification:'):
                            qual = txt.replace('Qualification:', '').strip()
                            if qual:
                                # Split qualifications by semicolon or newline
                                parts = [q.strip() for q in re.split(r'[;\n]', qual) if q.strip()]
                                details['education'] = parts

                p_contact = d_soup.find(class_='profile-contact')
                if p_contact:
                    for p in p_contact.find_all('p'):
                        txt = p.get_text(strip=True)
                        if 'Mobile:' in txt or 'Phone:' in txt:
                            mob = p.get_text(separator=' ', strip=True).replace('Mobile:', '').replace('Phone:', '').strip()
                            if mob:
                                details['phone'] = mob
                        elif 'E-mail:' in txt or 'Email:' in txt:
                            # Extract all decoded emails
                            emails = []
                            for cf in p.find_all(attrs={'data-cfemail': True}):
                                dec = cf_decode(cf['data-cfemail'])
                                if dec and dec not in emails:
                                    emails.append(dec)
                            # Also check plain text emails
                            for em in re.findall(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', p.get_text()):
                                if em not in emails and 'email-protection' not in em:
                                    emails.append(em)

                            if emails:
                                details['email'] = emails[0]
                                if len(emails) > 1:
                                    details['personal_email'] = ', '.join(emails[1:])

                # Areas of interest
                interests_div = d_soup.find('div', class_='profile-interrest-container')
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
                    details['areas_of_interest'] = interests
                    if interests and not details['specialization']:
                        details['specialization'] = ', '.join(interests[:2])

                # Tabs
                t1 = d_soup.find(id='tab-1')
                t2 = d_soup.find(id='tab-2')
                t3 = d_soup.find(id='tab-3')
                t4 = d_soup.find(id='tab-4')
                t5 = d_soup.find(id='tab-5')
                t6 = d_soup.find(id='tab-6')
                t8 = d_soup.find(id='tab-8')

                details['experience'] = clean_tab_html(t1)
                details['publications'] = clean_tab_html(t2)
                details['research'] = clean_tab_html(t3)
                details['achievements'] = clean_tab_html(t4)
                details['seminars'] = clean_tab_html(t5)
                details['training'] = clean_tab_html(t6)
                details['others'] = clean_tab_html(t8)

            except Exception as e:
                print(f'   Error fetching {profile_url}: {e}')

        faculty_list.append(details)
        time.sleep(0.1)

    output_path = '/home/ubuntu/projects/baust-website/database/data/cse_faculty_scraped.json'
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(faculty_list, f, indent=2, ensure_ascii=False)

    print(f'\nFinished scraping {len(faculty_list)} faculty members.')
    print(f'Saved to {output_path}')

if __name__ == '__main__':
    main()
