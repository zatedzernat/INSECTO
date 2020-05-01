<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('buildings', 'BuildingController@index')->name('buildings');
Route::post('buildings', 'BuildingController@store');
Route::put('buildings/{building_id}', 'BuildingController@update');
Route::delete('buildings/{building_id}', 'BuildingController@destroy');

Route::get('rooms', 'RoomController@index')->name('rooms');
Route::post('rooms', 'RoomController@store');
Route::put('rooms/{room_id}', 'RoomController@update');
Route::delete('rooms/{room_id}', 'RoomController@destroy');

Route::get('brands', 'BrandController@index')->name('brands');
Route::post('brands', 'BrandController@store');
Route::put('brands/{brand_id}', 'BrandController@update');
Route::delete('brands/{brand_id}', 'BrandController@destroy');

Route::get('problem_descs', 'ProblemDescriptionController@index')->name('problem_descs');
Route::post('problem_descs', 'ProblemDescriptionController@store');
Route::put('problem_descs/{problem_des_id}', 'ProblemDescriptionController@update');
Route::delete('problem_descs/{problem_des_id}', 'ProblemDescriptionController@destroy');

Route::get('items', 'ItemController@index')->name('items');
Route::post('items', 'ItemController@store');
Route::put('items/{item_id}', 'ItemController@update');
Route::delete('items/{item_id}', 'ItemController@destroy');

Route::get('item_types', 'ItemTypeController@index')->name('item_types');
Route::post('item_types', 'ItemTypeController@store');
Route::put('item_types/{type_id}', 'ItemTypeController@update');
Route::delete('item_types/{type_id}', 'ItemTypeController@destroy');

Route::get('statuses', 'StatusController@index')->name('statuses');
Route::post('statuses', 'StatusController@store');
Route::put('statuses/{status_id}', 'StatusController@update');
Route::delete('statuses/{status_id}', 'StatusController@destroy');

Route::get('noti_problems', 'NotificationProblemController@index')->name('noti_problems');

Route::get('history_logs', 'HistoryLogController@index')->name('history_logs');

//temporary api for develop in react js (need edit and merge from master)

Route::group(['prefix' => 'send-problem'], function () {
    Route::get('/', 'NotificationProblemController@create')->name('send');
    Route::get('{code}', 'NotificationProblemController@show')->where('code', '[A-Za-z0-9-.]+');
    Route::post('check', 'NotificationProblemController@check');
    // Route::post('create', 'NotificationProblemController@store');
});
