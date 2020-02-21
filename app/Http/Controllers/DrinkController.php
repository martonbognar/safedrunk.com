<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Drink;
use App\Session;
use App\Beverage;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DrinkController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Session $session)
    {
        $user = Auth::user();
        if ($session->user_id !== $user->id) {
            abort(403);
        }

        return $session->drinks()->with('beverage')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Session $session)
    {
        $drink = new Drink();
        $drink->amount = request('amount');
        $drink->unit = request('unit');
        $drink->name = request('name');
        if (request('start')) {
            $drink->start = Carbon::createFromTimestamp(request('start'));
        } else {
            $drink->start = Carbon::now();
        }
        $drink->session_id = $session->id;
        if (request('beverage_id')) {
            $drink->beverage_id = request('beverage_id');
            $drink->percentage = $drink->beverage->percentage;
        } else {
            $drink->percentage = request('percentage');
        }
        $drink->save();
        return response()->json(['id' => $drink->id]);
    }

    public function duplicate(Request $request, Session $session, Drink $drink)
    {
        $newDrink = $drink->replicate();
        $newDrink->start = Carbon::now();
        $newDrink->save();
        return response()->json(['id' => $newDrink->id]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Drink  $drink
     * @return \Illuminate\Http\Response
     */
    public function destroy(Session $session, Drink $drink)
    {
        $user = Auth::user();
        if ($session->user_id !== $user->id) {
            abort(403);
        }

        $drink->delete();
        return response()->json(['id' => $drink->id]);
    }
}
