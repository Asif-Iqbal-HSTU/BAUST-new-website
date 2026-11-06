<x-mail::message>
@if ($comment)
# New Reply on {{ $r->reference }}

**{{ $user->name }}** replied to the update request **"{{ $r->title }}"**:

<x-mail::panel>
{!! nl2br(e($comment->body)) !!}
</x-mail::panel>

Current status: **{{ $status }}**
@else
# New Update Request

<x-mail::table>
| | |
|:--|:--|
| **Reference** | {{ $r->reference }} |
| **Requested by** | {{ $user->name }} ({{ $user->email }}) |
| **Role** | {{ \Illuminate\Support\Str::headline($user->role ?? '-') }}{{ $user->department ? ' — '.strtoupper($user->department) : '' }} |
| **Type** | {{ $type }} |
| **Priority** | {{ $priority }} |
@if ($r->needed_by)
| **Needed by** | {{ $r->needed_by->format('d M Y') }} |
@endif
@if ($r->page_url)
| **Page** | {{ $r->page_url }} |
@endif
@if ($r->location_detail)
| **Where on the page** | {{ str_replace('|', '/', $r->location_detail) }} |
@endif
</x-mail::table>

## {{ $r->title }}

**Requested change**

<x-mail::panel>
{!! nl2br(e($r->requested_change)) !!}
</x-mail::panel>

@if ($r->current_state)
**Current state**

{!! nl2br(e($r->current_state)) !!}

@endif
@if ($r->reason)
**Reason**

{!! nl2br(e($r->reason)) !!}

@endif
@endif
@if (count($attached))
**Attached files:** {{ collect($attached)->pluck('original_name')->implode(', ') }}

@endif
@if (count($notAttached))
**Too large to attach (open the request to view):** {{ collect($notAttached)->pluck('original_name')->implode(', ') }}

@endif
<x-mail::button :url="$url" color="success">
Open {{ $r->reference }}
</x-mail::button>

Replying to this email will reach {{ $user->name }}.

{{ config('app.name') }} Website
</x-mail::message>
