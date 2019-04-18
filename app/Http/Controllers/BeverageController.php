<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Beverage;
use Illuminate\Http\Request;

class BeverageController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function listOwn()
    {
        return Beverage::where('user_id', Auth::id())->get();
    }

    public function listCombined()
    {
        $custom = Beverage::where('user_id', Auth::id())->get();
        return $custom->merge(Beverage::where([['user_id', null], ['approved', true]])->get());
    }

    public function listFiltered($keyword)
    {
        $custom = Beverage::where([['user_id', Auth::id()], ['name', 'LIKE', '%' . $keyword . '%']])->orderBy('name', 'asc')->get();
        return $custom->merge(Beverage::where([['user_id', null], ['approved', true], ['name', 'LIKE', '%' . $keyword . '%']])->orderBy('name', 'asc')->get());
    }

    public function listPending()
    {
        return Beverage::where('pending', true)->get();
    }

    public function approve()
    {
        if (!Auth::user()->administrator) {
            abort(403);
        }
        return view('beverage_approve');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('beverages');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $beverage = new Beverage();
        $beverage->name = request('name');
        $beverage->percentage = request('percentage');
        $beverage->pending = request('pending');
        $beverage->user_id = Auth::id();
        $beverage->save();
        return response()->json(['id' => $beverage->id]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Beverage  $beverage
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Beverage $beverage)
    {
        $user = Auth::user();
        if ($beverage->user_id === $user->id || $user->administrator) {
            $beverage->name = request('name');
            $beverage->percentage = request('percentage');
            if ($user->administrator) {
                $beverage->pending = request('pending');
                $beverage->approved = request('approved');
                if ($beverage->approved) {
                    $beverage->user_id = null;
                }
            }
            $beverage->save();
            return response()->json(['id' => $beverage->id]);
        } else {
            abort(403);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Beverage  $beverage
     * @return \Illuminate\Http\Response
     */
    public function destroy(Beverage $beverage)
    {
        $user = Auth::user();
        if ($beverage->user_id === $user->id || $user->administrator) {
            $beverage->delete();
            return response()->json(['id' => $beverage->id]);
        } else {
            abort(403);
        }
    }
}
