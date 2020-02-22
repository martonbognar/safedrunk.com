<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\User;
use App\Beverage;
use App\Favorite;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->except(['tokenLogin']);
    }

    public function personal()
    {
        $user = Auth::user();
        return response()->json(['weight' => $user->weight, 'sex' => $user->sex, 'weight_unit' => $user->weight_unit]);
    }

    public function favorites()
    {
        return Auth::user()->favorites()->with('beverage')->get();
    }

    public function statistics()
    {
        return view('statistics');
    }

    public function compare()
    {
        return view('compare');
    }

    public function addFavorite(Request $request)
    {
        $favorite = new Favorite;
        $favorite->user_id = Auth::user()->id;
        $favorite->beverage_id = request('beverage_id');
        $favorite->amount = request('amount');
        $favorite->unit = request('unit');
        $favorite->save();
        return response()->json(['id' => $favorite->id]);
    }

    public function removeFavorite(Favorite $favorite)
    {
        $favorite->delete();
        return response()->json(['id' => $favorite->id]);
    }

    public function tokenLogin(Request $request) {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'device_name' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        return $user->createToken($request->device_name)->plainTextToken;
    }
}
