<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/** Update requests from admins to the developer (super admin), with files and a comment thread. */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('update_requests', function (Blueprint $table) {
            $table->id();
            $table->string('reference', 20)->unique();          // UR-2026-0001
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('type', 30);                          // see UpdateRequest::TYPES
            $table->string('priority', 20)->default('normal');   // low | normal | high | urgent
            $table->string('title');
            $table->string('page_url', 1000)->nullable();        // where on the website
            $table->string('location_detail', 500)->nullable();  // which section / element on the page
            $table->text('current_state')->nullable();           // what is there now
            $table->text('requested_change');                    // what it should be
            $table->text('reason')->nullable();                  // why
            $table->date('needed_by')->nullable();
            $table->string('status', 20)->default('submitted')->index();
            $table->text('developer_note')->nullable();          // the developer's response
            $table->timestamp('resolved_at')->nullable();
            $table->timestamps();
        });

        Schema::create('update_request_attachments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('update_request_id')->constrained()->cascadeOnDelete();
            $table->foreignId('update_request_comment_id')->nullable();
            $table->string('path');
            $table->string('original_name');
            $table->string('mime', 150)->nullable();
            $table->unsignedBigInteger('size')->default(0);
            $table->timestamps();
        });

        Schema::create('update_request_comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('update_request_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->text('body');
            $table->string('status_change', 20)->nullable();     // set when the comment came with a status change
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('update_request_comments');
        Schema::dropIfExists('update_request_attachments');
        Schema::dropIfExists('update_requests');
    }
};
