# BAUST Website — Database Structure

This document describes the content database implemented for the redesigned
BAUST website. All content below is **stored in MySQL and editable via the
admin panel** — nothing is hardcoded in the pages for these areas.

Connection: MySQL 8.4 (`baust_website`). All tables use `id` bigint PK +
`created_at`/`updated_at` unless noted.

---

## 1. Notices / Archive

Populated from baust.edu.bd (460 notices, 13 categories). Files live in
`public/storage/notices/` and are served at `/storage/notices/<file>`.

### `notices`
| Column | Type | Notes |
|---|---|---|
| wp_id | int, nullable | original WordPress post id |
| title | string | |
| slug | string, unique | used in `/archive/notices/{slug}` |
| content, excerpt | text, nullable | |
| attachment | string, nullable | e.g. `/storage/notices/16385.pdf` |
| attachment_type | string, nullable | `pdf`, `image`, or external `url` |
| original_url | string, nullable | source URL on baust.edu.bd |
| author | string, nullable | |
| department | string, nullable | `cse`,`eee`,… (for dept filtering) |
| is_pinned, is_active | boolean | |
| published_at | timestamp, indexed | notice date |

### `notice_categories`
`name`, `slug` (unique), `description`, `color` (chip colour), `icon`,
`post_count`, `order`. 13 rows: Notice, Admission Notice, Exam Notice, Job
Notice, Tender Notice, News & Events, Upcoming Events, Achievements,
Conferences & Workshops, BoT/Syndicate/Finance/Academic-Council Meeting.

### `notice_notice_category` (pivot)
`notice_id`, `notice_category_id` (composite unique, cascade delete). A notice
can belong to several categories.

**Two sources, both imported:**
- **University-wide** notices (460) from the main site — `php artisan
  notices:import`; attachments self-hosted in `public/storage/notices/`.
- **Department-wise** notices (374) from each department subsite
  (`/{dept}/category/notice` + `/news-events`), tagged with `department` so
  they appear on each department page — `php artisan
  notices:import-departments` (`database/data/department_notices.json`).
  Attachments are **self-hosted** in `public/storage/notices/<dept>/`
  (367/374; 2 unavailable at source), content-deduped against the files the
  repo already ships so only genuinely-new PDFs were added.

Total: 834 notices. **Admin:** `/admin/notices` (existing resource CRUD).

---

## 2. Academic Departments

### `departments` (one row per department — profile / singleton content)
| Column | Type | Notes |
|---|---|---|
| slug | string, unique | `cse,ict,eee,me,ipe,ce,dba,ais,eng,as` |
| name | string | full name |
| short_name | string | e.g. `CSE` |
| faculty | string, nullable | `FECE,FME,FCE,FBS,FSH` |
| tagline, established | string, nullable | |
| about | longText, nullable | |
| vision | text, nullable | |
| mission | longText, nullable | |
| hod_name, hod_designation, hod_photo | string, nullable | Head of Dept |
| hod_message | longText, nullable | |
| is_active | boolean | |
| order | int | |

10 departments seeded.

### `department_slides` — hero/gallery images
`department_id` (FK, cascade), `image`, `title`, `caption`, `order`.

### `department_stats` — stat tiles
`department_id` (FK), `value`, `label`, `order`.

### `department_highlights` — feature cards
`department_id` (FK), `icon` (lucide key), `title`, `text`, `order`.

### `department_members` (pre-existing — faculty & staff, keyed by `department` slug)
`wp_id`, `name`, `designation`, `photo`, `phone`, `email`, `personal_email`,
`education` (JSON), `biography`, `experience`, `research`, `publications`,
`specialization`, `department`, `type` (`permanent|adjunct|staff`),
`status`, `category`, `order`. The `Department::members()` relation joins on
the `department` slug. Department "events" reuse the `notices` table filtered
by `department` + the news/events categories.

**Public:** the four new departments render from the DB at `/dba`, `/ais`,
`/eng`, `/as` (`Department/Show`). **Admin:** `/admin/departments` →
per-department manager (profile + slides/stats/highlights),
gate `manage-departments`.

---

## 3. IQAC (implemented earlier)

`iqac_settings` (key/JSON singletons), `iqac_slides`, `iqac_stats`,
`iqac_qa_areas`, `iqac_obe_points`, `iqac_members`, `iqac_events`,
`iqac_notices`. Admin: `/admin/iqac`, gate `manage-iqac`.

---

## 4. Access control (roles & gates)

`users.role` ∈ `super_admin`, `dept_admin`, `iqac_admin` (+ `department`).
- Gate `manage-iqac` → super_admin or iqac_admin
- Gate `manage-departments` → super_admin, dept_admin, or iqac_admin
- `/admin/*` requires `auth` + `verified`.

---

## Status / follow-ups

- **Done & live:** notices archive (460 university-wide + 374 department-wise =
  834); departmental notices now surface on every department page; 10
  department profiles; the 4 previously-missing departments live as DB-driven
  modern pages with their Heads; department + notice CRUD admin.
- **Remaining (schema ready, content to be filled via admin or future scrape):**
  full faculty rosters for DBA/AIS/English/A&S; deep sub-page content for all
  departments (curriculum, laboratories, achievements, alumni, clubs) — the
  existing 6 departments still render that content from their `.tsx` pages and
  can be migrated into new collection tables using the same pattern.
