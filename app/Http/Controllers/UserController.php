<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function personal()
    {
        return response()->json(['weight' => Auth::user()->weight, 'sex' => Auth::user()->sex]);
    }
}
