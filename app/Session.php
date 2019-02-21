<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function drinks()
    {
        return $this->hasMany(Drink::class);
    }
}
