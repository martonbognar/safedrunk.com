<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Drink extends Model
{
    public $timestamps = false;

    protected $casts = [
        'start' => 'datetime:Y-m-d\TH:i:s\Z',
    ];

    public function session()
    {
        return $this->belongsTo(Session::class);
    }

    public function beverage()
    {
        return $this->belongsTo(Beverage::class);
    }
}
