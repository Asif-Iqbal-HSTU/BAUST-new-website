#!/usr/bin/env python3
"""
Sync notices and attachments from https://www.baust.edu.bd and department subsites
into local storage and database JSON files.
"""

import os
import sys
import json
import re
import html
import urllib.parse
import requests

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
NOTICES_JSON_PATH = os.path.join(BASE_DIR, 'database/data/notices.json')
DEPT_NOTICES_JSON_PATH = os.path.join(BASE_DIR, 'database/data/department_notices.json')
PUBLIC_STORAGE_NOTICES = os.path.join(BASE_DIR, 'public/storage/notices')

VALID_MAIN_SLUGS = {
    'notice',
    'admission-notice',
    'exam-notice',
    'job-notice',
    'tender-notice',
    'news-events',
    'upcoming-events',
    'achievements',
    'conference-workshops',
    'bot-meeting',
    'syndicate-meeting',
    'finance-committee-meeting',
    'academic-council-meeting',
    'disciplinary-committee-meeting',
}

def clean_url(u):
    if not u:
        return None
    u = u.replace('&amp;', '&').replace('&#038;', '&')
    # strip query params if it is direct file url or extract clean file url
    parsed = urllib.parse.urlparse(u)
    return u

def extract_attachment_from_html(page_url, html_content):
    """
    Extract PDF or primary image URL from post HTML.
    """
    if not html_content:
        return None, None

    # 1. Search for PDF in pdfjs viewer shortcode / iframe
    # e.g., viewer.php?file=https://.../something.pdf&...
    m = re.search(r'file=(https?://[^\s"\'&<>]+\.pdf)', html_content, re.IGNORECASE)
    if m:
        pdf_url = urllib.parse.unquote(m.group(1))
        return clean_url(pdf_url), 'pdf'

    # 2. Search for direct link to a PDF in href
    m = re.search(r'href=[\'"](https?://[^\'"<>]+\.pdf)[\'"]', html_content, re.IGNORECASE)
    if m:
        return clean_url(m.group(1)), 'pdf'

    # 3. Check for image attachments in single-post content
    img_matches = re.findall(r'src=[\'"](https?://[^\'"<>]+\.(?:png|jpe?g|webp))[\'"]', html_content, re.IGNORECASE)
    ignore_patterns = ['BAUST-1.png', 'cropped-BAUST', 'BAUST-logo', '1.jpg', 'default', 'avatar', 'gravatar', 'theme', 'plugin']
    for img in img_matches:
        if not any(p in img for p in ignore_patterns):
            ext = img.split('.')[-1].split('?')[0].lower()
            return clean_url(img), ext

    return None, None

def download_file(url, target_path):
    """Download a file with timeout and error handling, ensuring valid size."""
    if os.path.exists(target_path) and os.path.getsize(target_path) > 0:
        return True

    os.makedirs(os.path.dirname(target_path), exist_ok=True)
    temp_path = target_path + '.tmp'
    try:
        r = requests.get(url, headers=HEADERS, stream=True, timeout=30)
        if r.status_code != 200:
            print(f"    ⚠️ Download failed (status {r.status_code}): {url}")
            return False
        
        with open(temp_path, 'wb') as f:
            for chunk in r.iter_content(chunk_size=65536):
                if chunk:
                    f.write(chunk)
        
        if os.path.getsize(temp_path) == 0:
            os.remove(temp_path)
            return False
        
        os.replace(temp_path, target_path)
        print(f"    ✓ Downloaded: {os.path.basename(target_path)} ({os.path.getsize(target_path)} bytes)")
        return True
    except Exception as e:
        print(f"    ⚠️ Download error for {url}: {e}")
        if os.path.exists(temp_path):
            os.remove(temp_path)
        return False

def sync_main_notices():
    print("\n==========================================")
    print("1. Synchronizing Main Site Notices")
    print("==========================================")

    # 1. Fetch categories
    print("Fetching main site categories...")
    r = requests.get('https://www.baust.edu.bd/wp-json/wp/v2/categories?per_page=100', headers=HEADERS, timeout=15)
    r.raise_for_status()
    cat_map = {c['id']: c['slug'] for c in r.json()}

    # 2. Load existing notices.json
    with open(NOTICES_JSON_PATH, 'r', encoding='utf-8') as f:
        existing_notices = json.load(f)

    existing_ids = {n.get('wp_id') for n in existing_notices if n.get('wp_id')}
    existing_urls = {n.get('url') for n in existing_notices if n.get('url')}
    print(f"Current notices in notices.json: {len(existing_notices)}")

    # 3. Fetch all posts from API (up to 5 pages)
    all_remote_posts = []
    for page in range(1, 10):
        url = f"https://www.baust.edu.bd/wp-json/wp/v2/posts?per_page=100&page={page}"
        resp = requests.get(url, headers=HEADERS, timeout=20)
        if resp.status_code == 400: # past last page
            break
        resp.raise_for_status()
        posts = resp.json()
        if not posts:
            break
        all_remote_posts.extend(posts)
        if len(posts) < 100:
            break
    print(f"Fetched {len(all_remote_posts)} total posts from remote API.")

    new_posts = [p for p in all_remote_posts if p['id'] not in existing_ids and p['link'] not in existing_urls]
    print(f"Found {len(new_posts)} new/missing posts to process.")

    added_entries = []
    for idx, p in enumerate(new_posts, 1):
        pid = p['id']
        plink = p['link']
        title = html.unescape(p['title']['rendered']).strip()
        date_str = p['date'].replace('T', ' ')
        print(f"[{idx}/{len(new_posts)}] Processing #{pid}: {title[:60]}")

        # Fetch HTML for attachment extraction
        att_url, att_type = None, None
        try:
            r_page = requests.get(plink, headers=HEADERS, timeout=20)
            att_url, att_type = extract_attachment_from_html(plink, r_page.text)
        except Exception as e:
            print(f"    ⚠️ Failed to fetch page HTML: {e}")

        # If not found in HTML, check featured media in REST API
        if not att_url and p.get('featured_media'):
            try:
                r_media = requests.get(f"https://www.baust.edu.bd/wp-json/wp/v2/media/{p['featured_media']}", headers=HEADERS, timeout=15)
                if r_media.status_code == 200:
                    media_data = r_media.json()
                    source_url = media_data.get('source_url')
                    if source_url:
                        att_url = clean_url(source_url)
                        ext = att_url.split('.')[-1].split('?')[0].lower()
                        att_type = 'pdf' if ext == 'pdf' else ext
            except Exception as e:
                print(f"    ⚠️ Media fetch error: {e}")

        # Download attachment if present
        att_local = None
        if att_url:
            ext = 'pdf' if att_type == 'pdf' else (att_type or 'png')
            if ext not in ['pdf', 'png', 'jpg', 'jpeg', 'webp']:
                ext = 'pdf'
            target_fn = f"{pid}.{ext}"
            target_path = os.path.join(PUBLIC_STORAGE_NOTICES, target_fn)
            if download_file(att_url, target_path):
                att_local = target_fn
            else:
                att_local = None
        else:
            print(f"    ℹ️ No attachment found on source.")

        # Map categories
        post_cats = []
        for cid in p.get('categories', []):
            slug = cat_map.get(cid)
            if slug in VALID_MAIN_SLUGS and slug not in post_cats:
                post_cats.append(slug)
        if not post_cats:
            post_cats = ['notice']

        entry = {
            "wp_id": pid,
            "url": plink,
            "title": title,
            "cats": post_cats,
            "published_at": date_str,
            "attachment_type": att_type,
            "attachment_local": att_local,
            "attachment_url": att_url
        }
        added_entries.append(entry)

    # Combine and sort by published_at desc
    all_notices = added_entries + existing_notices
    # Deduplicate by wp_id or url
    seen_ids = set()
    deduped = []
    for n in all_notices:
        nid = n.get('wp_id') or n.get('url')
        if nid not in seen_ids:
            seen_ids.add(nid)
            deduped.append(n)

    deduped.sort(key=lambda x: x.get('published_at') or '', reverse=True)

    with open(NOTICES_JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(deduped, f, indent=2, ensure_ascii=False)
    print(f"✅ Main notices updated: {len(deduped)} total notices saved in {NOTICES_JSON_PATH}")

def sync_department_notices():
    print("\n==========================================")
    print("2. Synchronizing Department Notices")
    print("==========================================")

    with open(DEPT_NOTICES_JSON_PATH, 'r', encoding='utf-8') as f:
        existing_dept_notices = json.load(f)

    existing_keys = {(n.get('dept'), n.get('wp_id')) for n in existing_dept_notices}
    existing_urls = {n.get('url') for n in existing_dept_notices if n.get('url')}
    print(f"Current department notices in department_notices.json: {len(existing_dept_notices)}")

    depts = ['ce', 'eee', 'ipe', 'cse', 'me', 'dba', 'eng', 'ais', 'as', 'ict']
    added_dept_entries = []

    for dept in depts:
        print(f"\nScanning department: {dept.upper()}...")
        dept_posts = []
        for page in range(1, 5):
            url = f"https://www.baust.edu.bd/{dept}/wp-json/wp/v2/posts?per_page=100&page={page}"
            try:
                resp = requests.get(url, headers=HEADERS, timeout=20)
                if resp.status_code == 400 or resp.status_code == 404:
                    break
                resp.raise_for_status()
                posts = resp.json()
                if not posts:
                    break
                dept_posts.extend(posts)
                if len(posts) < 100:
                    break
            except Exception as e:
                print(f"  Error fetching {dept} page {page}: {e}")
                break

        new_posts = [p for p in dept_posts if (dept, p['id']) not in existing_keys and p['link'] not in existing_urls]
        print(f"  Found {len(new_posts)} new posts for {dept.upper()}.")

        for idx, p in enumerate(new_posts, 1):
            pid = p['id']
            plink = p['link']
            title = html.unescape(p['title']['rendered']).strip()
            date_str = p['date'].replace('T', ' ')
            print(f"  [{idx}/{len(new_posts)}] {dept.upper()} #{pid}: {title[:50]}")

            att_url, att_type = None, None
            try:
                r_page = requests.get(plink, headers=HEADERS, timeout=20)
                att_url, att_type = extract_attachment_from_html(plink, r_page.text)
            except Exception as e:
                print(f"    ⚠️ Failed to fetch page HTML: {e}")

            if not att_url and p.get('featured_media'):
                try:
                    r_media = requests.get(f"https://www.baust.edu.bd/{dept}/wp-json/wp/v2/media/{p['featured_media']}", headers=HEADERS, timeout=15)
                    if r_media.status_code == 200:
                        media_data = r_media.json()
                        source_url = media_data.get('source_url')
                        if source_url:
                            att_url = clean_url(source_url)
                            ext = att_url.split('.')[-1].split('?')[0].lower()
                            att_type = 'pdf' if ext == 'pdf' else ext
                except Exception as e:
                    print(f"    ⚠️ Media fetch error: {e}")

            att_local_rel = None
            if att_url:
                ext = 'pdf' if att_type == 'pdf' else (att_type or 'png')
                if ext not in ['pdf', 'png', 'jpg', 'jpeg', 'webp']:
                    ext = 'pdf'
                target_fn = f"{pid}.{ext}"
                target_path = os.path.join(PUBLIC_STORAGE_NOTICES, dept, target_fn)
                if download_file(att_url, target_path):
                    att_local_rel = f"/storage/notices/{dept}/{target_fn}"
                else:
                    att_local_rel = att_url
            else:
                print(f"    ℹ️ No attachment found.")

            entry = {
                "dept": dept,
                "wp_id": pid,
                "url": plink,
                "title": title,
                "cats": ["notice"],
                "published_at": date_str,
                "attachment_url": att_url,
                "attachment_type": att_type or 'url',
                "attachment": att_local_rel
            }
            added_dept_entries.append(entry)

    all_dept_notices = added_dept_entries + existing_dept_notices
    seen_dept_keys = set()
    deduped_dept = []
    for n in all_dept_notices:
        key = (n.get('dept'), n.get('wp_id')) if n.get('wp_id') else (n.get('dept'), n.get('url'))
        if key not in seen_dept_keys:
            seen_dept_keys.add(key)
            deduped_dept.append(n)

    deduped_dept.sort(key=lambda x: x.get('published_at') or '', reverse=True)

    with open(DEPT_NOTICES_JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(deduped_dept, f, indent=2, ensure_ascii=False)
    print(f"✅ Department notices updated: {len(deduped_dept)} total notices saved in {DEPT_NOTICES_JSON_PATH}")

if __name__ == '__main__':
    sync_main_notices()
    sync_department_notices()
    print("\n🎉 Sync process completed successfully.")
