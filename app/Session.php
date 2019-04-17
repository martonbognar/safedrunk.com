<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    protected $casts = [
        'created_at' => 'datetime:Y-m-d\TH:i:s\Z',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function drinks()
    {
        return $this->hasMany(Drink::class);
    }
}
