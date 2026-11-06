<x-mail::message>
# New Counseling Request

A student has submitted a counseling appointment request through the BAUST website.

<x-mail::table>
| | |
|:--|:--|
| **Tracking Code** | {{ $session->tracking_code }} |
| **Name** | {{ $session->student_name }} |
| **Student ID** | {{ $session->student_id }} |
| **Department** | {{ $session->department }} |
| **Email** | {{ $session->email }} |
| **Phone** | {{ $session->phone }} |
| **Session Mode** | {{ $session->session_mode }} |
| **Concern** | {{ $session->concern_category }} |
| **Preferred Date** | {{ $session->preferred_date }} |
| **Preferred Time** | {{ $session->preferred_time }} |
</x-mail::table>

@if ($session->confidential_message)
The student also left a confidential message. For privacy it is not included in this email — please read it in the admin panel.
@endif

<x-mail::button :url="$adminUrl" color="success">
Open Counseling Sessions
</x-mail::button>

Replying to this email will reach the student directly.

Thanks,<br>
{{ config('app.name') }} Website
</x-mail::message>
