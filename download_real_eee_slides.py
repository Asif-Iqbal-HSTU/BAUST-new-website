import urllib.request, ssl, os

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

slides = [
    ("industrial_visit_2026.jpg", "https://baust.edu.bd/eee/wp-content/uploads/sites/20/2026/09/782144936_1587883553030956_3014558888344546444_n-650x488.jpg"),
    ("gnss_remote_sensing.jpg", "https://baust.edu.bd/eee/wp-content/uploads/sites/20/2026/09/713725415_1519472709872041_2315990637623620689_n-380x285.jpg"),
    ("bnbc_2020_electrical_services.jpg", "https://baust.edu.bd/eee/wp-content/uploads/sites/20/2026/03/651181952_1453622736457039_8301660699862219475_n-650x434.jpg"),
    ("freshers_farewell_2026.jpg", "https://baust.edu.bd/eee/wp-content/uploads/sites/20/2026/03/645531428_1446019890550657_1140536649163408648_n-650x434.jpg"),
    ("outcome_based_curriculum.jpg", "https://baust.edu.bd/eee/wp-content/uploads/sites/20/2025/02/WhatsApp-Image-2025-02-17-at-17.20.30-650x488.jpeg"),
    ("baust_10th_raising_day.jpg", "https://baust.edu.bd/eee/wp-content/uploads/sites/20/2025/02/WhatsApp-Image-2025-02-17-at-21.16.27-650x488.jpeg"),
    ("eee_faculty_members.jpg", "https://baust.edu.bd/eee/wp-content/uploads/sites/20/2025/02/475765202_1141178761034773_5084513110849371105_n-650x414.jpg"),
    ("orientation_21st_batch.jpg", "https://baust.edu.bd/eee/wp-content/uploads/sites/20/2025/10/565792986_1337629181389729_2761051049403262908_n-380x253.jpg"),
]

out_dir = '/home/ubuntu/projects/baust-website/public/images/eee/slides'
os.makedirs(out_dir, exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0'}

for name, url in slides:
    dest = os.path.join(out_dir, name)
    print(f"Downloading {name} from {url}")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ctx, timeout=15) as r:
            with open(dest, 'wb') as f:
                f.write(r.read())
        print(f" Saved {name}")
    except Exception as e:
        print(f" Failed {name}: {e}")
