<?php
 
namespace Database\Seeders;
 
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
 
class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Delete existing admin users if they exist to prevent duplicates
        User::whereIn('email', [
            'superadmin@baust.edu.bd',
            'cseadmin@baust.edu.bd',
            'eeeadmin@baust.edu.bd',
            'ictadmin@baust.edu.bd',
            'meadmin@baust.edu.bd',
            'ipeadmin@baust.edu.bd',
            'pro@baust.edu.bd',
        ])->delete();

        // 1. Super Admin
        User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@baust.edu.bd',
            'password' => Hash::make('password'),
            'role' => 'super_admin',
            'department' => null,
        ]);

        // Public Relations Officer: CRUDs News & Events (any department) and
        // university-wide notices, not department administrative content.
        User::create([
            'name' => 'Public Relations Officer',
            'email' => 'pro@baust.edu.bd',
            'password' => Hash::make('password'),
            'role' => 'pro',
            'department' => null,
        ]);
 
        // 2. CSE Admin
        User::create([
            'name' => 'CSE Dept Admin',
            'email' => 'cseadmin@baust.edu.bd',
            'password' => Hash::make('password'),
            'role' => 'dept_admin',
            'department' => 'cse',
        ]);
 
        // 3. EEE Admin
        User::create([
            'name' => 'EEE Dept Admin',
            'email' => 'eeeadmin@baust.edu.bd',
            'password' => Hash::make('password'),
            'role' => 'dept_admin',
            'department' => 'eee',
        ]);
 
        // 4. ICT Admin
        User::create([
            'name' => 'ICT Dept Admin',
            'email' => 'ictadmin@baust.edu.bd',
            'password' => Hash::make('password'),
            'role' => 'dept_admin',
            'department' => 'ict',
        ]);

        // 5. ME Admin
        User::create([
            'name' => 'ME Dept Admin',
            'email' => 'meadmin@baust.edu.bd',
            'password' => Hash::make('password'),
            'role' => 'dept_admin',
            'department' => 'me',
        ]);

        // 6. IPE Admin
        User::create([
            'name' => 'IPE Dept Admin',
            'email' => 'ipeadmin@baust.edu.bd',
            'password' => Hash::make('password'),
            'role' => 'dept_admin',
            'department' => 'ipe',
        ]);
    }
}
