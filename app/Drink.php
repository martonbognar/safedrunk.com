<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Drink extends Model
{
    public $timestamps = false;

    public function session()
    {
        return $this->belongsTo(Session::class);
    }

    public function beverage()
    {
        return $this->belongsTo(Beverage::class);
    }
}
