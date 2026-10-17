<?php

use App\Models\OfficeMember;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('office_members', function (Blueprint $table) {
            $table->id();
            $table->string('office')->index();     // registrar, ...
            $table->string('name');
            $table->string('designation')->nullable();
            $table->string('photo')->nullable();
            $table->string('phone')->nullable();
            $table->text('email')->nullable();
            $table->json('education')->nullable();
            $table->unsignedInteger('tier')->default(4); // 1=head, 2, 3=deputies, 4=staff
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });

        // Seed the Office of the Registrar from the generated data file.
        $path = base_path('database/data/registrar_office.json');
        if (is_file($path)) {
            foreach (json_decode(file_get_contents($path), true) as $m) {
                OfficeMember::updateOrCreate(
                    ['office' => $m['office'], 'name' => $m['name']],
                    [
                        'designation' => $m['designation'] ?? null,
                        'photo' => $m['photo'] ?? null,
                        'phone' => $m['phone'] ?? null,
                        'email' => $m['email'] ?? null,
                        'education' => $m['education'] ?? [],
                        'tier' => $m['tier'] ?? 4,
                        'order' => $m['order'] ?? 0,
                    ]
                );
            }
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('office_members');
    }
};
