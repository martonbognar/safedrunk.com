<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

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

    public static function getOwn()
    {
        return static::where('user_id', Auth::id())->orderBy('id', 'desc');
    }
}
