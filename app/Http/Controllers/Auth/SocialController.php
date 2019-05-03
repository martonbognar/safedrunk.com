<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Auth;
use Socialite;

use App\User;

class SocialController extends Controller
{
    public function redirectToProvider($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function handleProviderCallback($provider)
    {
        $user = Socialite::driver($provider)->user();
        return $this->findOrCreateUser($user, $provider);
    }

    public function findOrCreateUser($user, $provider)
    {
        $existing = null;
        $authUser = User::where('provider_id', $user->id)->first();

        if ($authUser) {
            $existing = $authUser;
        } else {
            $existing = User::create([
                'name'     => $user->name,
                'email'    => $user->email,
                'provider' => $provider,
                'provider_id' => $user->id
            ]);
        }
        Auth::login($existing, true);
        if ($authUser) {
            return redirect()->route('sessions');
        } else {
            return redirect()->route('settings');
        }
    }
}
