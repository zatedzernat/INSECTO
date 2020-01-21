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
    Route::post('check', 'NotificationProblemController@check');
    Route::post('create', 'NotificationProblemController@store');
});

Route::get('buildings', 'BuildingController@index')->name('buildings');
Route::group(['prefix' => 'building'], function () {
    Route::post('create', 'BuildingController@store');
    Route::post('edit', 'BuildingController@update');
    Route::post('del/{building_id}', 'BuildingController@destroy');
});

Route::get('rooms', 'RoomController@index')->name('rooms');
Route::group(['prefix' => 'room'], function () {
    Route::post('create', 'RoomController@store');
    Route::post('edit', 'RoomController@update');
    Route::post('del/{room_id}', 'RoomController@destroy');
});

Route::get('brands', 'BrandController@index')->name('brands');
Route::group(['prefix' => 'brand'], function () {
    Route::post('create', 'BrandController@store');
    Route::post('edit', 'BrandController@update');
    Route::post('del/{brand_id}', 'BrandController@destroy');
});

Route::get('problem_descs', 'ProblemDescriptionController@index')->name('problem_descs');
Route::group(['prefix' => 'problem_desc'], function () {
    Route::post('create', 'ProblemDescriptionController@store');
    Route::post('edit', 'ProblemDescriptionController@update');
    Route::post('del/{problem_des_id}', 'ProblemDescriptionController@destroy');
});

Route::get('items', 'ItemController@index')->name('items');
Route::group(['prefix' => 'item'], function () {
    Route::post('create', 'ItemController@store');
    Route::post('edit', 'ItemController@update');
    Route::post('del/{item_id}', 'ItemController@destroy');
});

Route::get('item_types', 'ItemTypeController@index')->name('item_types');
Route::group(['prefix' => 'item_type'], function () {
    Route::post('create', 'ItemTypeController@store');
    Route::post('edit', 'ItemTypeController@update');
    Route::post('del/{type_id}', 'ItemTypeController@destroy');
});

Route::get('statuses', 'StatusController@index')->name('statuses');
Route::group(['prefix' => 'status'], function () {
    Route::post('create', 'StatusController@store');
    Route::post('edit', 'StatusController@update');
    Route::post('del/{status_id}', 'StatusController@destroy');
});

Route::get('noti_problems', 'NotificationProblemController@index')->name('noti_problems');
Route::post('noti_problem/edit/{noti_id}', 'NotificationProblemController@update');

Route::get('history_logs', 'HistoryLogController@index')->name('history_logs');
Route::get('actions', 'ActionController@index')->name('actions');