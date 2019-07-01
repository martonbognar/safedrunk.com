<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDrinksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('drinks', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->nullable()->default(null);
            $table->decimal('amount', 6, 2);
            $table->decimal('percentage', 6, 2);
            $table->enum('unit', ['cl', 'dl', 'fl_oz', 'pint_uk', 'pint_us']);
            $table->timestamp('start')->useCurrent();
            $table->timestamp('end')->nullable()->default(null);
            $table->unsignedInteger('session_id');
            $table->unsignedInteger('beverage_id')->nullable();
            $table->foreign('session_id')->references('id')->on('sessions')->onDelete('cascade');
            $table->foreign('beverage_id')->references('id')->on('beverages')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('drinks');
    }
}
