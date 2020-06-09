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

Route::get('history_logs', 'HistoryLogController@index')->name('history_logs');

Route::get('noti_problems', 'NotificationProblemController@index')->name('noti_problems');
Route::get('sendprobleminroom/{room_code}', 'NotificationProblemController@showproblemNotResolvedInRoom')->where('room_code', '[A-Za-z0-9-.]+');
Route::get('sendproblem/{item_code}', 'NotificationProblemController@showproblemNotResolved')->where('item_code', '[A-Za-z0-9-.]+');
Route::post('noti_problems',  'NotificationProblemController@store');
Route::put('noti_problems/{noti_id}',  'NotificationProblemController@update');


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

Route::post('items/import', 'ItemController@importItems');
Route::get('items/export', 'ItemController@exportItems');

Route::post('getqr/{item_code}', 'ItemController@getQRCode');
Route::post('getqr_zip', 'ItemController@getQRCodeZIP');

Route::get('item_types', 'ItemTypeController@index')->name('item_types');
Route::post('item_types', 'ItemTypeController@store');
Route::put('item_types/{type_id}', 'ItemTypeController@update');
Route::delete('item_types/{type_id}', 'ItemTypeController@destroy');

Route::get('statuses', 'StatusController@index')->name('statuses');
Route::post('statuses', 'StatusController@store');
Route::put('statuses/{status_id}', 'StatusController@update');
Route::delete('statuses/{status_id}', 'StatusController@destroy');
