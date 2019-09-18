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
});

Route::group(['prefix' => 'send-problem'], function () {
    Route::get('/', 'NotificationProblemController@index');
    Route::get('{code}', 'ProblemController@create')->where('code', '[A-Za-z0-9]+');
    Route::post('store', 'ProblemController@store');
});

Route::get('buildings', 'BuildingController@index');
Route::get('rooms', 'RoomController@index');
Route::get('items', 'ItemController@index');
Route::get('brands','BrandController@index');
Route::get('item_types','ItemTypeController@index');
Route::get('problem_descs', 'ProblemDescriptionController@index');
Route::get('noti_problems', 'NotificationProblemController@show');
Route::get('statuses','StatusController@index');


