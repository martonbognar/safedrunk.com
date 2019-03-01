<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::get('/', 'HomeController@index')->name('home');

Route::get('/personal/', 'UserController@personal');

Route::get('/beverages/', 'BeverageController@list');
Route::post('/beverages/', 'BeverageController@store');
Route::get('/beverages/create/', 'BeverageController@create');
Route::patch('/beverages/{beverage}/', 'BeverageController@update');
Route::delete('/beverages/{beverage}/', 'BeverageController@destroy');

Route::get('/sessions/', 'SessionController@list');
Route::post('/sessions/', 'SessionController@store');
Route::get('/sessions/{session}/', 'SessionController@show');
Route::get('/sessions/{session}/drinks/', 'DrinkController@index');
Route::post('/sessions/{session}/drinks/', 'DrinkController@store');
Route::patch('/sessions/{session}/drinks/{drink}/', 'DrinkController@update');
Route::delete('/sessions/{session}/drinks/{drink}/', 'DrinkController@destroy');
