import os
import requests
import urllib3
urllib3.disable_warnings()

headers = {'User-Agent': 'Mozilla/5.0'}
BASE_DIR = '/home/ubuntu/projects/baust-website'

syllabi = [
    # ME
    {
        'url': 'https://baust.edu.bd/me/wp-content/uploads/sites/19/2021/12/Syllabus-Batches-13-to-Onwards.pdf',
        'name': 'me-syllabus-batch-13-and-onwards.pdf'
    },
    {
        'url': 'https://baust.edu.bd/me/wp-content/uploads/sites/19/2021/12/Syllabus-Batches-8-to-12.pdf',
        'name': 'me-syllabus-batch-8-to-12.pdf'
    },
    {
        'url': 'https://baust.edu.bd/me/wp-content/uploads/sites/19/2021/12/ME-Syllabus-for-1st-to-7th-Batch.pdf',
        'name': 'me-syllabus-batch-1-to-7.pdf'
    },
    # IPE
    {
        'url': 'https://baust.edu.bd/ipe/wp-content/uploads/sites/25/2026/08/4.-Syllabus-applicable-for-admitted-students-in-Summer-2026-and-onwards-semester.pdf',
        'name': 'ipe-syllabus-summer-2026-and-onwards.pdf'
    },
    {
        'url': 'https://baust.edu.bd/ipe/wp-content/uploads/sites/25/2024/10/3.-Syllabus-applicable-for-admitted-students-in-Winter-2021-and-onwards-semester.pdf',
        'name': 'ipe-syllabus-winter-2021-and-onwards.pdf'
    },
    {
        'url': 'https://baust.edu.bd/ipe/wp-content/uploads/sites/25/2024/09/2.-Syllabus-applicable-for-admitted-students-in-Winter-2020-and-onwards-semester.pdf',
        'name': 'ipe-syllabus-winter-2020-and-onwards.pdf'
    },
    {
        'url': 'https://baust.edu.bd/ipe/wp-content/uploads/sites/25/2022/10/1.-Syllabus-applicable-for-admitted-students-from-Spring-2016-to-Spring-2019-or-Summer-2019-semester-1.pdf',
        'name': 'ipe-syllabus-batch-2016-to-2019.pdf'
    }
]

for s in syllabi:
    p1 = f"{BASE_DIR}/public/storage/departments/{s['name']}"
    p2 = f"{BASE_DIR}/storage/app/public/departments/{s['name']}"
    
    print(f"Downloading {s['name']} from {s['url']}...")
    try:
        r = requests.get(s['url'], headers=headers, verify=False, timeout=30)
        if r.status_code == 200 and len(r.content) > 1000:
            with open(p1, 'wb') as f:
                f.write(r.content)
            with open(p2, 'wb') as f:
                f.write(r.content)
            print(f"Saved {s['name']} ({len(r.content)} bytes)")
        else:
            print(f"Failed to download {s['url']} (status {r.status_code})")
    except Exception as e:
        print(f"Error downloading {s['url']}: {e}")
