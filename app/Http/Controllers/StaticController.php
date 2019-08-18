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

    public function intro()
    {
        if (Auth::user()) {
            return redirect()->route('sessions');
        } else {
            return view('intro');
        }
    }

    public function temporary()
    {
        if (Auth::user()) {
            return redirect()->route('sessions');
        } else {
            return view('temporary');
        }
    }
}
