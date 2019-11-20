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

Route::get('/', function () {
    return view('master');
})->name('home');

Route::group(['prefix' => 'send-problem'], function () {
    Route::get('/', 'NotificationProblemController@create')->name('send');
    Route::get('{code}', 'NotificationProblemController@show')->where('code', '[A-Za-z0-9-.]+');
    Route::post('send', 'NotificationProblemController@store');
});

Route::get('buildings', 'BuildingController@index')->name('buildings');
Route::post('building/create','BuildingController@store');
Route::post('building/edit','BuildingController@update');
Route::get('building/del/{building_id}','BuildingController@destroy');

Route::get('rooms', 'RoomController@index')->name('rooms');
Route::post('room/create','RoomController@store');
Route::post('room/edit','RoomController@update'); 
Route::get('room/del/{room_id}', 'RoomController@destroy');

Route::get('brands','BrandController@index')->name('brands');
Route::post('brand/create','BrandController@store');
Route::post('brand/edit','BrandController@update');
Route::get('brand/del/{brand_id}','BrandController@destroy');

Route::get('problem_descs', 'ProblemDescriptionController@index')->name('problem_descs');
Route::post('problem_desc/create','ProblemDescriptionController@store');
Route::post('problem_desc/edit','ProblemDescriptionController@update'); 
Route::get('problem_desc/del/{room_id}', 'ProblemDescriptionController@destroy');

Route::get('items', 'ItemController@index')->name('items');
Route::post('item/create', 'ItemController@store');
Route::post('item/edit', 'ItemController@update');
Route::get('item/del/{item_id}', 'ItemController@destroy');

Route::get('item_types', 'ItemTypeController@index')->name('item_types');;
Route::post('item_type/create', 'ItemTypeController@store');
Route::post('item_type/edit', 'ItemTypeController@update');
Route::get('item_type/del/{type_id}', 'ItemTypeController@destroy');

Route::get('noti_problems', 'NotificationProblemController@index')->name('noti_problems');
Route::post('noti_problem/edit/{noti_id}', 'NotificationProblemController@update');

Route::get('statuses', 'StatusController@index')->name('statuses');
Route::post('status/create', 'StatusController@store');
Route::post('status/edit', 'StatusController@update');
Route::get('status/del/{status_id}', 'StatusController@destroy');
