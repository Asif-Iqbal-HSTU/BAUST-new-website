<x-mail::message>
# Admin Panel Update

<x-mail::table>
| | |
|:--|:--|
| **Admin** | {{ $adminName }} ({{ $adminEmail }}) |
| **Role** | {{ \Illuminate\Support\Str::headline($adminRole ?? '-') }} |
| **Time** | {{ $occurredAt }} |
| **Action** | {{ $method }} {{ $route ?? '' }} |
| **Page** | {{ $url }} |
| **IP Address** | {{ $ip }} |
</x-mail::table>

@forelse ($changes as $change)
## {{ ucfirst($change['action']) }}: {{ $change['model'] }} #{{ $change['id'] }}@if ($change['label']) — {{ $change['label'] }}@endif


@if ($change['fields'])
<x-mail::table>
@if ($change['action'] === 'updated')
| Field | Before | After |
|:--|:--|:--|
@foreach ($change['fields'] as $f)
| {{ \Illuminate\Support\Str::headline($f['field']) }} | {{ str_replace('|', '/', $f['old'] ?? '—') }} | {{ str_replace('|', '/', $f['new'] ?? '—') }} |
@endforeach
@else
| Field | Value |
|:--|:--|
@foreach ($change['fields'] as $f)
| {{ \Illuminate\Support\Str::headline($f['field']) }} | {{ str_replace('|', '/', $f['new'] ?? '—') }} |
@endforeach
@endif
</x-mail::table>
@endif

@empty
Items were reordered (no individual field changes recorded).
@endforelse

Replying to this email will reach {{ $adminName }}.

{{ config('app.name') }} Website
</x-mail::message>
