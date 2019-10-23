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

Route::get('buildings', 'BuildingController@index');
Route::get('rooms', 'RoomController@index');
Route::get('items', 'ItemController@index');
Route::get('brands','BrandController@index')->name('brands');
Route::get('item_types','ItemTypeController@index');
Route::get('problem_descs', 'ProblemDescriptionController@index');
Route::get('noti_problems', 'NotificationProblemController@index');
Route::get('statuses','StatusController@index');
Route::post('brand/edit','BrandController@update');
Route::post('brand/create','BrandController@store');


