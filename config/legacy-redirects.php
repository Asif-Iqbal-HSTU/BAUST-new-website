<?php

/*
|--------------------------------------------------------------------------
| Legacy URLs (old WordPress site and renamed pages)
|--------------------------------------------------------------------------
|
| The one place to add or change a moved URL.
|
| 'paths'  Exact old path (no leading or trailing slash) => new URL. Each one is
|          registered as a 301 route in routes/web.php. Trailing-slash variants
|          are already folded into the bare path by nginx.
|
| 'gone'   Regular expressions (matched against the path, no leading slash) for
|          old WordPress URLs that have no counterpart on this site. They answer
|          410 Gone so search engines drop them. LegacyRedirectController checks
|          them only after it has failed to match a post, category or profile, so
|          an old post permalink still redirects when we hold its source URL.
|
| Old post, category and employee-profile permalinks are matched against the
| database in LegacyRedirectController, not listed here.
|
*/

return [

    'paths' => [
        // Misspelled admission slug (the page now lives at the correct spelling)
        'admission/admission-requirment' => '/admission/admission-requirements',

        // Admission
        'admission-cancel-policy' => '/admission/cancel-policy',
        'dress-code' => '/admission/dress-code',

        // Facilities (old sub-pages merged into one Facilities page)
        'library' => '/facilities/library',
        'counseling' => '/facilities#counseling',
        'facilities/wifi-campus' => '/facilities#wifi',
        'facilities/multimedia-classroom' => '/facilities#multimedia',
        'facilities/modern-laboratories' => '/facilities#laboratories',
        'facilities/residential-facilities-male-female' => '/facilities#residential',
        'facilities/cafeteria' => '/facilities#cafeteria',
        'facilities/counseling' => '/facilities#counseling',

        // Research (single merged page)
        'research/publications' => '/research#publications',
        'research/projects' => '/research#projects',
        'administration/offices/journal-office' => '/research#cell',

        // Gallery and notice categories
        'photo-gallery' => '/gallery',
        'category/home-university-highlights' => '/gallery',
        'category/notice' => '/archive/notices',
        'category/news-events' => '/archive/notices?category=news-events',
        'category/admission-notice' => '/archive/notices?category=admission-notice',

        // Department pages that were renamed or merged
        'me/online-education' => '/me/online-resources',
        'ipe/online-education' => '/ipe/online-resources',
        'ce/online-education' => '/ce/student-voice',
        'ce/research' => '/ce/research/publications',
        'ce/gallery' => '/ce/gallery/photos',
        'ce/ce-society' => '/ce/clubs',
    ],

    'gone' => [
        '#^(?:[a-z]+/)?wp-(?:admin|includes|json)(?:/|$)#',          // WordPress admin / API
        '#^(?:[a-z]+/)?wp-[a-z-]+\.php$#',                           // wp-login.php, wp-cron.php, ...
        '#^(?:[a-z]+/)?xmlrpc\.php$#',
        '#^(?:[a-z]+/)?wp-content/(?:themes|plugins|cache)/#',       // theme/plugin files (uploads: see nginx)
        '#(?:^|/)feed(?:/[a-z0-9]+)?$#',                             // /feed, /category/x/feed, /cse/feed/atom
        '#^(?:[a-z]+/)?(?:tag|author)/#',                            // tag and author archives
        '#^(?:[a-z]+/)?page/\d+$#',                                  // old blog home pagination
        '#^(?:[a-z]+/)?\d{4}(?:/\d{2}){0,2}(?:/.*)?$#',              // date archives /2021/05/10/...
    ],

];
