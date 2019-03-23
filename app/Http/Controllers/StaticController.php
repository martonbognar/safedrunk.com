<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Session;
use App\Beverage;
use Illuminate\Http\Request;

class StaticController extends Controller
{
    public function faq()
    {
        return view('faq');
    }
}
