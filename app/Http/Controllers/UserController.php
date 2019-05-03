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
        $user = Auth::user();
        return response()->json(['weight' => $user->weight, 'sex' => $user->sex, 'weight_unit' => $user->weight_unit]);
    }

    public function statistics()
    {
        return view('statistics');
    }
}
