<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table): void {
            $table->text('long_description')->nullable()->after('note');
            $table->string('material')->nullable()->after('long_description');
            $table->string('fit')->nullable()->after('material');
            $table->text('finish')->nullable()->after('fit');
            $table->string('construction')->nullable()->after('finish');
            $table->text('washing')->nullable()->after('construction');
            $table->text('best_for')->nullable()->after('washing');
            $table->text('care_instructions')->nullable()->after('best_for');
            $table->text('shipping_info')->nullable()->after('care_instructions');
            $table->json('benefits')->nullable()->after('shipping_info');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table): void {
            $table->dropColumn(['long_description', 'material', 'fit', 'finish', 'construction', 'washing', 'best_for', 'care_instructions', 'shipping_info', 'benefits']);
        });
    }
};
