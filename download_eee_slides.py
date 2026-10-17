import urllib.request, ssl, os, re, json
from bs4 import BeautifulSoup

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

headers = {'User-Agent': 'Mozilla/5.0'}

slider_urls = [
    ("Industrial Visit 2026 (Confidence Power Rangpur Limited)", "https://baust.edu.bd/eee/sliders/industrial-visit-2026-confidence-power-rangpur-limited-department-of-eee-baust/"),
    ("GNSS Remote Sensing: Space Weather and Atmospheric Monitoring", "https://baust.edu.bd/eee/sliders/the-seminar-titled-%f0%9f%8c%8d-gnss-remote-sensing-from-navigation-to-space-weather-and-atmospheric-monitoring/"),
    ("Role of BNBC 2020 in Electrical Services for Buildings", "https://baust.edu.bd/eee/sliders/seminar-on-from-design-to-maintenance-the-role-of-bnbc-2020-in-electrical-services-for-buildings/"),
    ("Freshers’ Reception & Farewell Ceremony 2026", "https://baust.edu.bd/eee/sliders/freshers-reception-farewell-ceremony-2026/"),
    ("Outcome Based Curriculum Workshop", "https://baust.edu.bd/eee/sliders/a-day-long-training-session-on-outcome-based-curriculum/"),
    ("BAUST 10th Raising Day & Pitha Utshab in EEE", "https://baust.edu.bd/eee/sliders/%e0%a6%ac%e0%a6%bf%e0%a6%8f%e0%a6%87%e0%a6%89%e0%a6%8f%e0%a6%b8%e0%a6%9f%e0%a6%bf-%e0%a7%a7%e0%a7%a6%e0%a6%ae-%e0%a6%aa%e0%a7%8d%e0%a6%b0%e0%a6%a4%e0%a6%bf%e0%a6%b7%e0%a7%8d%e0%a6%a0%e0%a6%be%e0%a6%ac/"),
    ("Department of EEE Faculty Members", "https://baust.edu.bd/eee/sliders/dept-of-eee-faculty-members/"),
    ("Orientation Program of 21st Batch EEE", "https://baust.edu.bd/eee/sliders/orientation-program-of-21st-batch-eee/"),
]

slides_dir = '/home/ubuntu/projects/baust-website/public/images/eee/slides'
os.makedirs(slides_dir, exist_ok=True)

slides_data = []

for title, url in slider_urls:
    print(f"Fetching slide: {title}")
    try:
        req = urllib.request.Request(url, headers=headers)
        html = urllib.request.urlopen(req, context=ctx, timeout=15).read().decode('utf-8')
        soup = BeautifulSoup(html, 'html.parser')
        
        img_url = ""
        for img in soup.find_all('img'):
            src = img.get('src')
            if src and '/uploads/' in src and not any(k in src.lower() for k in ['logo', 'banner', 'goved', 'ugc', 'baust-2']):
                img_url = src
                break
                
        local_img = None
        if img_url:
            filename = os.path.basename(img_url).split('?')[0]
            local_path = os.path.join(slides_dir, filename)
            if not os.path.exists(local_path):
                with urllib.request.urlopen(urllib.request.Request(img_url, headers=headers), context=ctx, timeout=15) as r:
                    with open(local_path, 'wb') as f:
                        f.write(r.read())
            local_img = f"/images/eee/slides/{filename}"
            print(f"  Downloaded: {filename}")
            
        slides_data.append({
            'title': title,
            'image': local_img or "/images/eee/slides/default-slide.jpg",
            'subtitle': "Department of Electrical and Electronic Engineering, BAUST",
        })
    except Exception as e:
        print(f"  Failed for {title}: {e}")

with open('scraped_eee_slides.json', 'w') as f:
    json.dump(slides_data, f, indent=2)
print("Saved scraped_eee_slides.json")
