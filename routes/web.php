<?php

/*
/-------------
/ API routes
/-------------
*/

Route::get('/beverages/', 'BeverageController@listCombined');
Route::post('/beverages/', 'BeverageController@store');

Route::get('/beverages/own/', 'BeverageController@listOwn');
Route::get('/beverages/filter/{keyword}', 'BeverageController@listFiltered');

Route::patch('/beverages/{beverage}/', 'BeverageController@update');
Route::delete('/beverages/{beverage}/', 'BeverageController@destroy');

Route::get('/beverages/pending', 'BeverageController@listPending');
Route::get('/beverages/approve', 'BeverageController@approve');

Route::get('/sessions/', 'SessionController@list');
Route::post('/sessions/', 'SessionController@store');

Route::get('/sessions/recent/', 'SessionController@listRecent');

Route::delete('/sessions/{session}/', 'SessionController@destroy');

Route::get('/sessions/{session}/drinks/', 'DrinkController@index');
Route::post('/sessions/{session}/drinks/', 'DrinkController@store');
Route::delete('/sessions/{session}/drinks/{drink}/', 'DrinkController@destroy');

Route::post('/modify/', 'Auth\ModifyController@update')->name('modify_post');

/*
/-------------
/ Page routes
/-------------
*/

Route::get('/', 'StaticController@intro')->name('intro');

Route::get('/faq/', 'StaticController@faq')->name('faq');

Auth::routes();
Route::get('auth/{provider}', 'Auth\SocialController@redirectToProvider');
Route::get('auth/{provider}/callback', 'Auth\SocialController@handleProviderCallback');

Route::get('/sessions/all/', 'SessionController@showAll')->name('sessions');

Route::get('/statistics/', 'UserController@statistics')->name('statistics');

Route::get('/modify/', 'Auth\ModifyController@edit')->name('modify');

Route::get('/personal/', 'UserController@personal');

Route::get('/beverages/create/', 'BeverageController@create')->name('beverage_create');

Route::get('/sessions/{session}/', 'SessionController@show');
