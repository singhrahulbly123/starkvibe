<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->string('canonical_url', 500)->nullable()->after('meta_description');
            $table->json('labels')->nullable()->after('canonical_url');
            $table->json('variants')->nullable()->after('labels');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['canonical_url', 'labels', 'variants']);
        });
    }
};
