<?php

Route::middleware('auth:sanctum')->get('/beverages', 'BeverageController@listCombined');
Route::middleware('auth:sanctum')->post('/beverages', 'BeverageController@store');
Route::middleware('auth:sanctum')->get('/beverages/own', 'BeverageController@listOwn');
Route::middleware('auth:sanctum')->get('/beverages/filter/{keyword}', 'BeverageController@listFiltered');
Route::middleware('guest')->get('/public/beverages/filter/{keyword}', 'BeverageController@listFilteredPublic');
Route::middleware('auth:sanctum')->patch('/beverages/{beverage}', 'BeverageController@update');
Route::middleware('auth:sanctum')->delete('/beverages/{beverage}', 'BeverageController@destroy');
Route::middleware('auth:sanctum')->get('/beverages/pending', 'BeverageController@listPending');

Route::middleware('auth:sanctum')->get('/favorites', 'UserController@favorites');
Route::middleware('auth:sanctum')->post('/favorites', 'UserController@addFavorite');
Route::middleware('auth:sanctum')->delete('/favorites/{favorite}', 'UserController@removeFavorite');

Route::middleware('auth:sanctum')->get('/sessions', 'SessionController@list');
Route::middleware('auth:sanctum')->post('/sessions', 'SessionController@store');
Route::middleware('auth:sanctum')->get('/sessions/recent', 'SessionController@listRecent');
Route::middleware('auth:sanctum')->delete('/sessions/{session}', 'SessionController@destroy');
Route::middleware('auth:sanctum')->get('/sessions/{session}/drinks', 'DrinkController@index');
Route::middleware('auth:sanctum')->post('/sessions/{session}/drinks', 'DrinkController@store');
Route::middleware('auth:sanctum')->post('/sessions/{session}/drinks/{drink}/duplicate', 'DrinkController@duplicate');
Route::middleware('auth:sanctum')->delete('/sessions/{session}/drinks/{drink}', 'DrinkController@destroy');

Route::middleware('auth:sanctum')->get('/personal', 'UserController@personal');

Route::middleware('guest')->post('/sanctum/token', 'UserController@tokenLogin');
