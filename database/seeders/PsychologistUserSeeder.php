<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class PsychologistUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'psychologist@baust.edu.bd'],
            [
                'name'              => 'University Psychologist & Counselor',
                'password'          => Hash::make('password'),
                'role'              => 'psychologist',
                'department'        => 'Counseling Cell',
                'email_verified_at' => now(),
            ]
        );
    }
}
