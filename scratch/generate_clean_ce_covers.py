import json, re, urllib.request

posts = json.load(open('scratch/ce_wp_posts.json'))
media_ids = sorted(list(set(p.get('featured_media') for p in posts if p.get('featured_media'))))

media_map = {}
for i in range(0, len(media_ids), 50):
    batch = media_ids[i:i+50]
    id_str = ",".join(map(str, batch))
    url = f"https://baust.edu.bd/ce/wp-json/wp/v2/media?include={id_str}&per_page=100"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            items = json.loads(r.read())
            for item in items:
                media_map[item['id']] = item.get('source_url')
    except Exception as e:
        print(f"Error fetching batch {i}: {e}")

print(f"Fetched {len(media_map)} media items from WP media API.")

def is_valid_image(url):
    if not url:
        return False
    u = url.lower()
    if 'emoji' in u or 'static.xx.fbcdn.net' in u or '.svg' in u:
        return False
    if 'icon' in u or '16x16' in u or '/16/' in u or 'avatar' in u:
        return False
    return True

def extract_content_images(html):
    if not html:
        return []
    imgs = re.findall(r'<img[^>]+src=[\"\']([^\"\']+)[\"\']', html)
    return [img for img in imgs if is_valid_image(img)]

covers = {}
for p in posts:
    slug = p.get('slug')
    ce_slug = f"ce-{slug}"
    fm_id = p.get('featured_media')
    cover = None
    
    if fm_id and fm_id in media_map and is_valid_image(media_map[fm_id]):
        cover = media_map[fm_id]
    else:
        content_imgs = extract_content_images(p.get('content', {}).get('rendered', ''))
        if content_imgs:
            cover = content_imgs[0]
        else:
            cover = None
            
    covers[slug] = cover
    covers[ce_slug] = cover

with open('scratch/ce_covers_map.json', 'w') as f:
    json.dump(covers, f, indent=2)

print(f"Successfully wrote {len(covers)} cover mappings to scratch/ce_covers_map.json")
