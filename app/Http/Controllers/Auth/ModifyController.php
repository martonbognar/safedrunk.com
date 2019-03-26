<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ModifyController extends Controller
{
    /**
     * Get a validator for an incoming modify request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
            'sex' => ['required', 'in:male,female'],
            'weight' => ['required', 'numeric'],
        ]);
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
        ]);
        $user = Auth::user();
        $user->sex = $validated['sex'];
        $user->weight = $validated['weight'];
        $user->newsletter = $request->has('newsletter');
        $user->save();
        return redirect()->route('sessions');
    }
}
