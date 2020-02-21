<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Beverage;
use Illuminate\Http\Request;

class BeverageController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->except(['listFiltered']);
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

    public function listOwn()
    {
        return Beverage::getOwn()->get();
    }

    public function listCombined()
    {
        $custom = Beverage::getOwn()->get();
        return $custom->merge(Beverage::getApproved()->get());
    }

    public function listFiltered(Request $request, $keyword)
    {
        $keyword = '%' . $keyword . '%';
        $public = Beverage::getApproved()->where('name', 'LIKE', $keyword)->orderBy('name', 'asc')->get();
        if ($request->user('api')) {
            $custom = Beverage::where([['user_id', $request->user('api')->id], ['name', 'LIKE', $keyword]])->orderBy('name', 'asc')->get();
            return $custom->merge($public);
        } else {
            return $public;
        }
    }

    public function listFilteredPublic($keyword)
    {
        $keyword = '%' . $keyword . '%';
        return Beverage::getApproved()->where('name', 'LIKE', $keyword)->orderBy('name', 'asc')->get();
    }

    public function listPending()
    {
        if (!Auth::user()->administrator) {
            abort(403);
        }
        return Beverage::where('pending', true)->get();
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
        $beverage->pending = request('pending');
        $beverage->user_id = Auth::id();
        $beverage->mixed = (request('mixed') != null) && request('mixed');
        $beverage->percentage = request('percentage') ?? 0;
        $beverage->save();
        if ($beverage->mixed) {
            $total = request('total_cl');
            $percentage = 0;
            foreach (request('ingredients') as $ingredient) {
                $ingredientBeverage = Beverage::find($ingredient['id']);
                $amount = $ingredient['amount_cl'] / $total;
                $percentage += $amount * ($ingredientBeverage->percentage / 100.0);
                $beverage->ingredients()->attach($ingredientBeverage->id, ['percentage' => $amount]);
            }
            $beverage->percentage = $percentage * 100;
            $beverage->save();
        }
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
        if ($beverage->user_id !== $user->id && !$user->administrator) {
            abort(403);
        }

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
        if ($beverage->user_id !== $user->id && !$user->administrator) {
            abort(403);
        }

        $beverage->delete();
        return response()->json(['id' => $beverage->id]);
    }
}
