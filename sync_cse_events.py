#!/usr/bin/env python3
"""
Sync full content, writings, and photographs for CSE department events and notices
from https://baust.edu.bd/cse/ into local storage, JSON, and MySQL database.
"""

import os
import sys
import json
import re
import html
import urllib.parse
import requests
from bs4 import BeautifulSoup

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DEPT_NOTICES_JSON = os.path.join(BASE_DIR, 'database/data/department_notices.json')
CSE_STORAGE_DIR = os.path.join(BASE_DIR, 'public/storage/notices/cse')
os.makedirs(CSE_STORAGE_DIR, exist_ok=True)

def safe_filename(wp_id, original_url, index=0):
    parsed = urllib.parse.urlparse(original_url)
    basename = os.path.basename(parsed.path)
    # decode URL encoded characters
    basename = urllib.parse.unquote(basename)
    # sanitize characters that might cause filesystem/url issues
    clean_name = re.sub(r'[^\w\-_\.]', '_', basename)
    if not clean_name or clean_name == '_':
        ext = '.jpg'
        clean_name = f"img_{index}{ext}"
    if not clean_name.startswith(str(wp_id)):
        clean_name = f"{wp_id}_{clean_name}"
    return clean_name

def download_file(url, target_path):
    if os.path.exists(target_path) and os.path.getsize(target_path) > 0:
        return True
    try:
        r = requests.get(url, headers=HEADERS, timeout=15)
        if r.status_code == 200 and len(r.content) > 100:
            with open(target_path, 'wb') as f:
                f.write(r.content)
            return True
    except Exception as e:
        print(f"    Error downloading {url}: {e}")
    return False

def sync_cse_notice(item):
    wp_id = item.get('wp_id')
    url = item.get('url')
    if not url:
        return item

    print(f"[{wp_id}] Fetching: {item.get('title', '')[:50]}...")
    try:
        r = requests.get(url, headers=HEADERS, timeout=15)
        if len(r.text) < 500:
            print(f"    Failed with status {r.status_code}, length {len(r.text)}")
            return item
    except Exception as e:
        print(f"    Failed request: {e}")
        return item

    soup = BeautifulSoup(r.text, 'html.parser')

    # 1. Main featured image
    main_img_url = None
    main_img_el = soup.find('div', class_='main-image') or soup.find('div', class_='img-thumbnail') or soup.find('div', class_='ArticleFeatureImg')
    if main_img_el and main_img_el.find('img'):
        main_img_url = main_img_el.find('img').get('src')
    elif not main_img_url and item.get('attachment_url') and item.get('attachment_type') == 'image':
        main_img_url = item.get('attachment_url')

    local_featured_img = None
    if main_img_url and ('wp-content/uploads' in main_img_url or 'storage' in main_img_url):
        fn = safe_filename(wp_id, main_img_url, index=0)
        target = os.path.join(CSE_STORAGE_DIR, fn)
        if download_file(main_img_url, target):
            local_featured_img = f"/storage/notices/cse/{fn}"

    # 2. PDF Attachment
    pdf_url = None
    m = re.search(r'file=(https?://[^\s"\'&<>]+\.pdf)', r.text, re.IGNORECASE)
    if m:
        pdf_url = urllib.parse.unquote(m.group(1))
    else:
        m2 = re.search(r'href=[\'"](https?://[^\'"<>]+\.pdf)[\'"]', r.text, re.IGNORECASE)
        if m2:
            pdf_url = m2.group(1)

    local_pdf = None
    if pdf_url:
        fn = safe_filename(wp_id, pdf_url, index=0)
        target = os.path.join(CSE_STORAGE_DIR, fn)
        if download_file(pdf_url, target):
            local_pdf = f"/storage/notices/cse/{fn}"

    # 3. Article Content (Writings & Inline Photos)
    content_el = soup.find('div', class_='articleContent') or soup.find('div', class_='the-content') or soup.find('div', class_='post-content')
    if not content_el:
        content_el = soup.find('div', class_='content-box')

    content_html = None
    excerpt = None

    if content_el:
        # Clone / copy
        content_soup = BeautifulSoup(str(content_el), 'html.parser')

        # Clean out style tags, scripts, social shares, and metadata
        for tag in content_soup.find_all(['style', 'script', 'iframe']):
            tag.decompose()
        for tag in content_soup.find_all(class_=['single-post-meta', 'meta-area', 'share-post', 'flat-social', 'date-and-view']):
            tag.decompose()
        # Remove empty or junk wrapper h1
        for h in content_soup.find_all(['h1', 'h2']):
            if h.text.strip() == item.get('title', '').strip():
                h.decompose()
        # Remove main-image wrapper if it's already at the top
        for mi in content_soup.find_all(class_=['main-image', 'ArticleFeatureImg']):
            mi.decompose()

        # Process all inline images
        img_idx = 1
        for img in content_soup.find_all('img'):
            src = img.get('src')
            if not src or 'BAUST-1' in src or 'logo' in src.lower():
                img.decompose()
                continue
            
            # Download inline image locally
            img_fn = safe_filename(wp_id, src, index=img_idx)
            img_target = os.path.join(CSE_STORAGE_DIR, img_fn)
            if download_file(src, img_target):
                img['src'] = f"/storage/notices/cse/{img_fn}"
                img['class'] = "rounded-2xl shadow-md my-4 max-w-full h-auto mx-auto"
                img['loading'] = "lazy"
                if not local_featured_img and not local_pdf:
                    local_featured_img = f"/storage/notices/cse/{img_fn}"
            img_idx += 1

        # Extract excerpt
        paragraphs = []
        for p in content_soup.find_all('p'):
            pt = p.text.strip()
            if pt and len(pt) > 20 and not pt.startswith('Copyright') and 'troubleshooting WordPress' not in pt:
                paragraphs.append(pt)
        if paragraphs:
            excerpt = paragraphs[0][:250] + ("..." if len(paragraphs[0]) > 250 else "")

        # Format clean inner HTML
        inner_html = ""
        for child in content_soup.children:
            s = str(child).strip()
            if s and 'troubleshooting WordPress' not in s and 'critical error on this website' not in s:
                inner_html += s + "\n"
        
        if inner_html.strip():
            content_html = inner_html.strip()

    # Determine final attachment
    final_att = local_pdf or local_featured_img or item.get('attachment')
    final_att_type = 'pdf' if local_pdf else ('image' if local_featured_img else item.get('attachment_type'))

    # If attachment on disk had percent-encoded name, fix it!
    if final_att and '%' in final_att:
        decoded_path = urllib.parse.unquote(final_att)
        old_file = os.path.join(BASE_DIR, 'public' + final_att.lstrip('/'))
        new_file = os.path.join(BASE_DIR, 'public' + decoded_path.lstrip('/'))
        if os.path.exists(old_file) and old_file != new_file:
            os.rename(old_file, new_file)
        final_att = decoded_path

    item['attachment'] = final_att
    item['attachment_type'] = final_att_type
    item['content'] = content_html
    item['excerpt'] = excerpt

    print(f"    Done! Attachment: {final_att} | Content len: {len(content_html or '')} | Excerpt: {bool(excerpt)}")
    return item

def main():
    if not os.path.exists(DEPT_NOTICES_JSON):
        print(f"File not found: {DEPT_NOTICES_JSON}")
        return

    with open(DEPT_NOTICES_JSON, 'r', encoding='utf-8') as f:
        notices = json.load(f)

    updated_notices = []
    cse_count = 0
    for item in notices:
        if item.get('dept') == 'cse':
            item = sync_cse_notice(item)
            cse_count += 1
        updated_notices.append(item)

    with open(DEPT_NOTICES_JSON, 'w', encoding='utf-8') as f:
        json.dump(updated_notices, f, ensure_ascii=False, indent=2)

    print(f"\nSuccessfully synced {cse_count} CSE notices in {DEPT_NOTICES_JSON}!")

if __name__ == '__main__':
    main()
