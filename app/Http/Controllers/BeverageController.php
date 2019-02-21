<?php

namespace App\Http\Controllers;

use App\Beverage;
use Illuminate\Http\Request;

class BeverageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('drink');
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
        $beverage->save();
        return 'OK';
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Beverage  $beverage
     * @return \Illuminate\Http\Response
     */
    public function show(Beverage $beverage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Beverage  $beverage
     * @return \Illuminate\Http\Response
     */
    public function edit(Beverage $beverage)
    {
        //
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
        $beverage->name = request('name');
        $beverage->percentage = request('percentage');
        $beverage->save();
        return 'OK';
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Beverage  $beverage
     * @return \Illuminate\Http\Response
     */
    public function destroy(Beverage $beverage)
    {
        $beverage->delete();
        return 'OK';
    }
}
