<?php

/*
/-------------
/ API routes
/-------------
*/

Route::get('/api/beverages', 'BeverageController@listCombined');
Route::post('/api/beverages', 'BeverageController@store');

Route::get('/api/beverages/own', 'BeverageController@listOwn');
Route::get('/api/beverages/filter/{keyword}', 'BeverageController@listFiltered');

Route::patch('/api/beverages/{beverage}', 'BeverageController@update');
Route::delete('/api/beverages/{beverage', 'BeverageController@destroy');

Route::get('/api/beverages/pending', 'BeverageController@listPending');

Route::get('/api/favorites', 'UserController@favorites');
Route::post('/api/favorites', 'UserController@addFavorite');
Route::delete('/api/favorites/{favorite}', 'UserController@removeFavorite');

Route::get('/api/sessions', 'SessionController@list');
Route::post('/api/sessions', 'SessionController@store');

Route::get('/api/sessions/recent', 'SessionController@listRecent');

Route::delete('/api/sessions/{session}', 'SessionController@destroy');

Route::get('/api/sessions/{session}/drinks', 'DrinkController@index');
Route::post('/api/sessions/{session}/drinks', 'DrinkController@store');
Route::post('/api/sessions/{session}/drinks/{drink}/duplicate', 'DrinkController@duplicate');
Route::delete('/api/sessions/{session}/drinks/{drink}', 'DrinkController@destroy');

Route::get('/api/personal', 'UserController@personal');

/*
/-------------
/ Page routes
/-------------
*/

Auth::routes();

Route::get('/', 'StaticController@intro')->name('intro');

Route::get('/faq', 'StaticController@faq')->name('faq');

Route::get('/auth/{provider}', 'Auth\SocialController@redirectToProvider');
Route::get('/auth/{provider}/callback', 'Auth\SocialController@handleProviderCallback');

Route::get('/sessions', 'SessionController@showAll')->name('sessions');

Route::get('/try', 'StaticController@temporary')->name('temporary');

Route::get('/statistics', 'UserController@statistics')->name('statistics');

Route::get('/settings', 'Auth\ModifyController@edit')->name('settings');
Route::post('/settings', 'Auth\ModifyController@update')->name('settings_post');

Route::get('/beverages/create', 'BeverageController@create')->name('beverage_create');
Route::get('/beverages/approve', 'BeverageController@approve');

Route::get('/sessions/{session}', 'SessionController@show');
