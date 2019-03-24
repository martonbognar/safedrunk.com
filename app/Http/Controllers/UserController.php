<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function personal()
    {
        return response()->json(['weight' => Auth::user()->weight, 'sex' => Auth::user()->sex]);
    }
}
