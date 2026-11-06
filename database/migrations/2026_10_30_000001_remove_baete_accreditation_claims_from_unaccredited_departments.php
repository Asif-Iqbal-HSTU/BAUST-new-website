<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

/**
 * Only CSE, ME and IPE are IEB-BAETE accredited. Earlier seeds showed an "IEB-BAETE /
 * Accredited Program" card for EEE, CE and ICT; replace those values where they are
 * still untouched by admins.
 */
return new class extends Migration
{
    public function up(): void
    {
        $profiles = [
            'eee' => 'The B.Sc. in Electrical and Electronic Engineering program follows an Outcome Based Education (OBE) curriculum designed around BAETE standards.',
            'ict' => null,
            'ce' => 'The Department of Civil Engineering offers a 4-year undergraduate B.Sc. in Civil Engineering program designed in line with Outcome-Based Education (OBE) principles.',
        ];

        foreach ($profiles as $slug => $text) {
            $dept = DB::table('departments')->where('slug', $slug)->first();
            if (!$dept) {
                continue;
            }

            $updates = [];
            if ($dept->accreditation_badge === 'IEB-BAETE') {
                $updates['accreditation_badge'] = 'OBE Curriculum';
            }
            if ($dept->accreditation_title === 'Accredited Program') {
                $updates['accreditation_title'] = 'Outcome-Based Education Program';
            }
            if ($text && $dept->accreditation_text && preg_match('/Washington Accord/', $dept->accreditation_text)) {
                $updates['accreditation_text'] = $text;
            }
            if ($updates) {
                DB::table('departments')->where('id', $dept->id)->update($updates);
            }

            if ($slug !== 'eee') {
                continue;
            }

            DB::table('department_highlights')
                ->where('department_id', $dept->id)
                ->where('title', 'BAETE Accredited OBE Curriculum')
                ->update([
                    'title' => 'Outcome Based Education (OBE) Curriculum',
                    'text' => 'Outcome Based Education framework with clearly defined program and course outcomes, continuously reviewed for quality.',
                ]);

            foreach (DB::table('department_curricula')->where('department_id', $dept->id)->get() as $curriculum) {
                $highlights = json_decode($curriculum->highlights ?? '[]', true);
                if (!is_array($highlights) || !in_array('Approved by UGC & BAETE (IEB Accreditation Aligned)', $highlights, true)) {
                    continue;
                }
                $highlights = array_map(
                    fn ($h) => $h === 'Approved by UGC & BAETE (IEB Accreditation Aligned)' ? 'Approved by UGC' : $h,
                    $highlights
                );
                DB::table('department_curricula')->where('id', $curriculum->id)->update(['highlights' => json_encode($highlights)]);
            }
        }
    }

    public function down(): void
    {
        // Content correction; not reversed.
    }
};
