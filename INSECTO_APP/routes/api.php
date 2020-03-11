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

Route::get('brands', 'BrandController@index');
Route::get('items', 'ItemController@index');
Route::get('item_types', 'ItemTypeController@index');
Route::get('noti_problems', 'NotificationProblemController@index');