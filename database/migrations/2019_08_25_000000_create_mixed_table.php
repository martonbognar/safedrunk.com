<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMixedTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mixed', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('beverage_id');
            $table->unsignedInteger('ingredient_id');
            $table->decimal('percentage', 5, 2);
            $table->foreign('beverage_id')->references('id')->on('beverages')->onDelete('cascade');
            $table->foreign('ingredient_id')->references('id')->on('beverages')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mixed');
    }
}
