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

Route::get('auth/{provider}', 'Auth\SocialController@redirectToProvider');
Route::get('auth/{provider}/callback', 'Auth\SocialController@handleProviderCallback');

Route::get('/', 'StaticController@intro')->name('intro');

Route::get('/faq/', 'StaticController@faq')->name('faq');

Route::get('/modify/', 'Auth\ModifyController@edit')->name('modify');
Route::post('/modify/', 'Auth\ModifyController@update')->name('modify_post');

Route::get('/personal/', 'UserController@personal');

Route::get('/statistics/', 'UserController@statistics')->name('statistics');

Route::get('/beverages/own/', 'BeverageController@listOwn');
Route::get('/beverages/filter/{keyword}', 'BeverageController@listFiltered');

Route::get('/beverages/', 'BeverageController@listCombined');
Route::post('/beverages/', 'BeverageController@store');
Route::get('/beverages/create/', 'BeverageController@create')->name('beverage_create');
Route::patch('/beverages/{beverage}/', 'BeverageController@update');
Route::delete('/beverages/{beverage}/', 'BeverageController@destroy');

Route::get('/sessions/all/', 'SessionController@showAll')->name('sessions');
Route::get('/sessions/', 'SessionController@list');
Route::get('/sessions/recent/', 'SessionController@listRecent');
Route::post('/sessions/', 'SessionController@store');
Route::get('/sessions/{session}/', 'SessionController@show');
Route::delete('/sessions/{session}/', 'SessionController@destroy');

Route::get('/sessions/{session}/drinks/', 'DrinkController@index');
Route::post('/sessions/{session}/drinks/', 'DrinkController@store');
Route::delete('/sessions/{session}/drinks/{drink}/', 'DrinkController@destroy');
