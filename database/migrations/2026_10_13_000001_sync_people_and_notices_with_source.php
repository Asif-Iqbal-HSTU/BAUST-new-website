<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

/**
 * Brings people and notices in line with baust.edu.bd (audit of 2026-10-13):
 *
 *  - Departments: adds people listed on the source but missing here
 *    (CSE: Iqramul Islam, ICT: Md. Atikuzzaman) and applies designation updates.
 *  - Admission Office: Section Officer (Psychologist) Sabrina Sultana Sinthi and
 *    Messenger Md. Sakim join; Most. Runa Parvin is no longer listed; Julfiker
 *    Ali is now Computer Operator; members re-ordered as on the source.
 *  - Controller of Examination: Md. Insanur Rahman -> Sgt Md Insanur Rahman (Retd),
 *    Data Entry Operator.
 *  - Notices: adds missing posts from every site and makes the top-scroll
 *    ticker match the source (notices:sync-source, also scheduled hourly).
 */
return new class extends Migration
{
    public function up(): void
    {
        // ---- Departments -------------------------------------------------
        Artisan::call('departments:sync-faculty-profiles', [
            'departments' => ['cse', 'ict', 'eee', 'me', 'ipe', 'ce', 'dba', 'ais', 'eng', 'as', 'mba'],
            '--only-missing' => true,
        ]);

        $members = DB::table('department_members');
        (clone $members)->where('department', 'as')->where('name', 'Md. Abu Saleh')->update(['designation' => 'Lecturer and DPC']);
        (clone $members)->where('designation', 'Massenger')->update(['designation' => 'Messenger']);

        // ---- Admission Office ---------------------------------------------
        $now = now();
        $office = DB::table('office_members');
        (clone $office)->where('office', 'admission-office')->where('name', 'Most. Runa Parvin')->delete();
        (clone $office)->where('office', 'admission-office')->where('name', 'Julfiker Ali')->update(['designation' => 'Computer Operator']);

        foreach ([
            ['name' => 'Md. Sakim', 'designation' => 'Messenger', 'photo' => '/images/offices/admission-office/md-sakim.jpeg', 'phone' => null, 'email' => null, 'education' => []],
            ['name' => 'Sabrina Sultana Sinthi', 'designation' => 'Section Officer (Psychologist)', 'photo' => '/images/offices/admission-office/sabrina-sultana-sinthi.jpeg', 'phone' => '01640188239', 'email' => 'sabrinasinthi999@gmail.com',
                'education' => ['Msc in Clinical Psychology (University of Dhaka)', 'B.Sc in Psychology (Jagannath University)']],
        ] as $p) {
            if (! (clone $office)->where('office', 'admission-office')->where('name', $p['name'])->exists()) {
                (clone $office)->insert(array_merge($p, [
                    'office' => 'admission-office', 'tier' => 4, 'order' => 99,
                    'education' => json_encode($p['education']), 'created_at' => $now, 'updated_at' => $now,
                ]));
            }
        }

        // Same order as the source page.
        foreach ([
            'Md. Kazi Nazmul Haque', 'Md. Shah Alam', 'Syed Fokhrul Islam', 'Md. Emdadul Haque', 'Md. Sakim',
            'Md. Iqbal Mahmud', 'Sabrina Sultana Sinthi', 'Julfiker Ali', 'Shaiid Sadakatul Bari', 'Mst. Rashida Begum',
        ] as $i => $name) {
            (clone $office)->where('office', 'admission-office')->where('name', $name)->update(['order' => $i + 1]);
        }

        // ---- Controller of Examination -----------------------------------
        (clone $office)->where('office', 'controller-of-examination')->where('name', 'Md. Insanur Rahman')
            ->update(['name' => 'Sgt Md Insanur Rahman (Retd)', 'designation' => 'Data Entry Operator', 'phone' => '01721406008', 'education' => json_encode(['B.S.S'])]);

        // ---- Notices -------------------------------------------------------
        // Needs network access; if the source is unreachable the hourly
        // schedule catches up later, so a failure must not block the deploy.
        try {
            Artisan::call('notices:sync-source');
        } catch (\Throwable $e) {
            logger()->warning('notices:sync-source failed during migration: '.$e->getMessage());
        }
    }

    public function down(): void
    {
        // Data sync; nothing to roll back.
    }
};
