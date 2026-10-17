<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Singleton content (about, director message, vision, mission, OBE corner, contact)
        Schema::create('iqac_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->longText('value')->nullable(); // JSON-encoded scalar or array
            $table->timestamps();
        });

        Schema::create('iqac_slides', function (Blueprint $table) {
            $table->id();
            $table->string('image');
            $table->string('title');
            $table->string('date_label')->nullable();
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });

        Schema::create('iqac_stats', function (Blueprint $table) {
            $table->id();
            $table->string('value');
            $table->string('label');
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });

        Schema::create('iqac_qa_areas', function (Blueprint $table) {
            $table->id();
            $table->string('icon')->default('ShieldCheck'); // key mapped to a lucide icon
            $table->string('label');
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });

        Schema::create('iqac_obe_points', function (Blueprint $table) {
            $table->id();
            $table->string('text');
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });

        Schema::create('iqac_members', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('role');
            $table->string('affiliation')->nullable();
            $table->text('credentials')->nullable();
            $table->string('photo')->nullable();
            $table->boolean('is_lead')->default(false);
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });

        Schema::create('iqac_events', function (Blueprint $table) {
            $table->id();
            $table->string('date_label')->nullable();
            $table->string('title');
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });

        Schema::create('iqac_notices', function (Blueprint $table) {
            $table->id();
            $table->string('text');
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('iqac_notices');
        Schema::dropIfExists('iqac_events');
        Schema::dropIfExists('iqac_members');
        Schema::dropIfExists('iqac_obe_points');
        Schema::dropIfExists('iqac_qa_areas');
        Schema::dropIfExists('iqac_stats');
        Schema::dropIfExists('iqac_slides');
        Schema::dropIfExists('iqac_settings');
    }
};
