<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ModifyController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function edit()
    {
        $user = Auth::user();
        return view('modify_data', compact(['user']));
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'sex' => ['required', 'in:male,female'],
            'weight' => ['required', 'numeric'],
            'weight_unit' => ['required', 'in:kg,lbs,stone'],
        ]);
        $user = Auth::user();
        $user->sex = $validated['sex'];
        $user->weight = $validated['weight'];
        $user->weight_unit = $validated['weight_unit'];
        $user->newsletter = $request->has('newsletter');
        $user->save();
        return redirect()->route('sessions');
    }
}
