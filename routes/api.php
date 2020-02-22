<?php

Route::middleware('auth:airlock')->get('/beverages', 'BeverageController@listCombined');
Route::middleware('auth:airlock')->post('/beverages', 'BeverageController@store');
Route::middleware('auth:airlock')->get('/beverages/own', 'BeverageController@listOwn');
Route::middleware('auth:airlock')->get('/beverages/filter/{keyword}', 'BeverageController@listFiltered');
Route::middleware('guest')->get('/public/beverages/filter/{keyword}', 'BeverageController@listFilteredPublic');
Route::middleware('auth:airlock')->patch('/beverages/{beverage}', 'BeverageController@update');
Route::middleware('auth:airlock')->delete('/beverages/{beverage}', 'BeverageController@destroy');
Route::middleware('auth:airlock')->get('/beverages/pending', 'BeverageController@listPending');

Route::middleware('auth:airlock')->get('/favorites', 'UserController@favorites');
Route::middleware('auth:airlock')->post('/favorites', 'UserController@addFavorite');
Route::middleware('auth:airlock')->delete('/favorites/{favorite}', 'UserController@removeFavorite');

Route::middleware('auth:airlock')->get('/sessions', 'SessionController@list');
Route::middleware('auth:airlock')->post('/sessions', 'SessionController@store');
Route::middleware('auth:airlock')->get('/sessions/recent', 'SessionController@listRecent');
Route::middleware('auth:airlock')->delete('/sessions/{session}', 'SessionController@destroy');
Route::middleware('auth:airlock')->get('/sessions/{session}/drinks', 'DrinkController@index');
Route::middleware('auth:airlock')->post('/sessions/{session}/drinks', 'DrinkController@store');
Route::middleware('auth:airlock')->post('/sessions/{session}/drinks/{drink}/duplicate', 'DrinkController@duplicate');
Route::middleware('auth:airlock')->delete('/sessions/{session}/drinks/{drink}', 'DrinkController@destroy');

Route::middleware('auth:airlock')->get('/personal', 'UserController@personal');

Route::middleware('guest')->post('/airlock/token', 'UserController@tokenLogin');
