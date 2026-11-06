<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
                scroll-behavior: smooth;
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>


        <link rel="icon" type="image/png" href="/images/BAUST%20logo.png">
        <link rel="shortcut icon" type="image/png" href="/images/BAUST%20logo.png">
        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="apple-touch-icon" href="/images/BAUST%20logo.png">

        <link rel="preload" href="/fonts/TiroBangla-Bengali.woff2" as="font" type="font/woff2" crossorigin>
        <link rel="preload" href="/fonts/TiroBangla-Regular.ttf" as="font" type="font/ttf" crossorigin>

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&family=Tiro+Bangla:ital@0;1&display=swap" rel="stylesheet">

        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        {{-- Search & social metadata, worked out on the server (App\Support\Seo) --}}
        @php($seo = \App\Support\Seo::forPage($page))

        {{-- SSR head tags. A hand-written title (config/seo.php) replaces the page component's. --}}
        @php(ob_start())
        @inertiaHead
        @php($ssrHead = ob_get_clean())
        @if ($seo['titleOverride'])
            @php($ssrHead = preg_replace('#<title\b[^>]*>.*?</title>#is', '', $ssrHead))
        @endif
        {!! $ssrHead !!}
        @if ($seo['titleOverride'] || ! str_contains($ssrHead, '<title'))
            <title inertia>{{ $seo['title'] }}</title>
        @endif
        <meta name="description" content="{{ $seo['description'] }}">
        <meta name="robots" content="{{ $seo['robots'] }}">
        <link rel="canonical" href="{{ $seo['url'] }}">
        <meta property="og:site_name" content="{{ \App\Support\Seo::UNIVERSITY }}">
        <meta property="og:type" content="{{ $seo['type'] }}">
        <meta property="og:title" content="{{ $seo['title'] }}">
        <meta property="og:description" content="{{ $seo['description'] }}">
        <meta property="og:url" content="{{ $seo['url'] }}">
        <meta property="og:image" content="{{ $seo['image'] }}">
        <meta property="og:locale" content="en_US">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="{{ $seo['title'] }}">
        <meta name="twitter:description" content="{{ $seo['description'] }}">
        <meta name="twitter:image" content="{{ $seo['image'] }}">
        @foreach ($seo['jsonLd'] as $schema)
            <script type="application/ld+json">{!! json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_AMP) !!}</script>
        @endforeach
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
