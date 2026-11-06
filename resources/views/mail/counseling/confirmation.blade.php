<x-mail::message>
# Request Received

Dear {{ $session->student_name }},

Your counseling appointment request has been received and forwarded to the University Psychologist. You will be contacted to confirm your session.

<x-mail::panel>
**Tracking Code:** {{ $session->tracking_code }}<br>
**Preferred Date:** {{ $session->preferred_date }}<br>
**Preferred Time:** {{ $session->preferred_time }}<br>
**Session Mode:** {{ $session->session_mode }}
</x-mail::panel>

Please keep your tracking code for reference. All information you shared is kept strictly confidential.

If you need to reach the psychologist, simply reply to this email.

Take care,<br>
Psychological Counseling Unit, BAUST
</x-mail::message>
