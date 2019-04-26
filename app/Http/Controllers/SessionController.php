<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Session;
use App\Beverage;
use Illuminate\Http\Request;

class SessionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function showAll()
    {
        return view('sessions');
    }

    public function list()
    {
        return Session::where('user_id', Auth::id())->orderBy('id', 'desc')->get();
    }

    public function listRecent()
    {
        $array = Session::where('user_id', Auth::id())->orderBy('id', 'desc')->limit(7)->get()->toArray();
        return response()->json(array_reverse($array));  // TODO: i'm sure this can be done with a collection method
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $session = new Session();
        $session->name = request('name');
        $session->user_id = Auth::id();
        $session->save();
        return response()->json(['id' => $session->id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Session  $session
     * @return \Illuminate\Http\Response
     */
    public function show(Session $session)
    {
        $user = Auth::user();
        if ($session->user_id !== $user->id) {
            abort(403);
        }

        return view('session', compact(['session']));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Session  $session
     * @return \Illuminate\Http\Response
     */
    public function destroy(Session $session)
    {
        $user = Auth::user();
        if ($session->user_id !== $user->id) {
            abort(403);
        }

        $session->delete();
        return response()->json(['id' => $session->id]);
    }
}
