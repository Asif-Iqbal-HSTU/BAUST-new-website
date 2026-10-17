<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notices', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('wp_id')->nullable()->unique();
            $table->string('title');
            $table->string('slug')->unique();
            $table->longText('content')->nullable();
            $table->text('excerpt')->nullable();
            $table->string('attachment')->nullable();
            $table->string('attachment_type', 20)->nullable(); // pdf, image, etc.
            $table->string('original_url')->nullable();
            $table->string('author')->nullable();
            $table->string('department')->nullable(); // cse, eee, etc. for dept-level filtering
            $table->boolean('is_pinned')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamp('published_at')->nullable();
            $table->timestamps();

            $table->index('published_at');
            $table->index('is_pinned');
            $table->index('department');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notices');
    }
};
