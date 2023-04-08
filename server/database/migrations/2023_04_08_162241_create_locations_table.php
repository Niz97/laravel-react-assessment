<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
   
    Schema::create('locations', function (Blueprint $table) {
      $table->id();
      $table->date('date_start');
      $table->date('date_end');
      $table->boolean('status'); //TODO::This could be an enum
      $table->string('name');  // TODO::Maybe we should limit length of name/description
      $table->string('description');
      
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('locations');
  }
};
