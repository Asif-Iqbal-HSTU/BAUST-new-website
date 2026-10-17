<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('media_coverage_requests', function (Blueprint $table) {
            $table->id();

            // Appendix A: Media Coverage Requisition Form fields
            $table->string('event_name');
            $table->string('organizing_unit');
            $table->text('purpose')->nullable();
            $table->date('event_date');
            $table->time('event_time')->nullable();
            $table->string('location')->nullable();
            $table->string('chief_guest')->nullable();
            $table->string('chairperson')->nullable();
            $table->unsignedInteger('expected_participants')->nullable();
            $table->string('contact_name');
            $table->string('contact_designation')->nullable();
            $table->string('contact_mobile');

            $table->boolean('coverage_press_release')->default(false);
            $table->boolean('coverage_facebook_post')->default(false);
            $table->boolean('coverage_media_send')->default(false);
            $table->string('coverage_other')->nullable();
            $table->text('special_instructions')->nullable();

            $table->foreignId('submitted_by')->constrained('users')->cascadeOnDelete();

            // PR Office use only (bottom table of Appendix A)
            $table->string('status')->default('pending'); // pending, received, in_progress, completed, declined
            $table->string('receive_no')->nullable()->unique();
            $table->timestamp('received_at')->nullable();
            $table->foreignId('handled_by')->nullable()->constrained('users')->nullOnDelete();
            $table->text('pr_remarks')->nullable();
            $table->foreignId('notice_id')->nullable()->constrained('notices')->nullOnDelete();

            $table->timestamps();

            $table->index('status');
            $table->index('event_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('media_coverage_requests');
    }
};
