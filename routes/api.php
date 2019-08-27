<?php

Route::get('/beverages', 'BeverageController@listCombined');
Route::post('/beverages', 'BeverageController@store');

Route::get('/beverages/own', 'BeverageController@listOwn');
Route::get('/beverages/filter/{keyword}', 'BeverageController@listFiltered');

Route::patch('/beverages/{beverage}', 'BeverageController@update');
Route::delete('/beverages/{beverage', 'BeverageController@destroy');

Route::get('/beverages/pending', 'BeverageController@listPending');

Route::get('/favorites', 'UserController@favorites');
Route::post('/favorites', 'UserController@addFavorite');
Route::delete('/favorites/{favorite}', 'UserController@removeFavorite');

Route::get('/sessions', 'SessionController@list');
Route::post('/sessions', 'SessionController@store');

Route::get('/sessions/recent', 'SessionController@listRecent');

Route::delete('/sessions/{session}', 'SessionController@destroy');

Route::get('/sessions/{session}/drinks', 'DrinkController@index');
Route::post('/sessions/{session}/drinks', 'DrinkController@store');
Route::post('/sessions/{session}/drinks/{drink}/duplicate', 'DrinkController@duplicate');
Route::delete('/sessions/{session}/drinks/{drink}', 'DrinkController@destroy');

Route::get('/personal', 'UserController@personal');
