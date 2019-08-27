<?php

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
Route::get('/compare', 'UserController@compare')->name('compare');

Route::get('/settings', 'Auth\ModifyController@edit')->name('settings');
Route::post('/settings', 'Auth\ModifyController@update')->name('settings_post');

Route::get('/beverages/create', 'BeverageController@create')->name('beverage_create');
Route::get('/beverages/approve', 'BeverageController@approve');

Route::get('/sessions/{session}', 'SessionController@show');
