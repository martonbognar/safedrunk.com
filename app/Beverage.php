<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Beverage extends Model
{
    public $timestamps = false;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function ingredients()
    {
        return $this->belongsToMany(Beverage::class, 'mixed', 'beverage_id', 'ingredient_id')->withPivot('percentage');
    }

    public static function getApproved()
    {
        return static::where([['user_id', null], ['approved', true]]);
    }

    public static function getOwn()
    {
        return static::where('user_id', Auth::id());
    }
}
