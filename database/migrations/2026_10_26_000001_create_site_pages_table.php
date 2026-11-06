<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Editable content for the pages under the Administration, Library, Research
 * and Admission menus. Each row holds one page's content document; the pages
 * render from it and section admins edit it from /admin/site-pages.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('site_pages', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();      // e.g. admission.tuition-fees
            $table->string('section', 50)->index(); // administration | library | research | admission
            $table->string('title');
            $table->json('content');
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });

        \App\Models\SitePage::seedMissingFromDefaults();
    }

    public function down(): void
    {
        Schema::dropIfExists('site_pages');
    }
};
