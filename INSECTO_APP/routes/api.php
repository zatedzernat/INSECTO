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

Route::group(['middleware' => 'ssoauth'], function () {

    Route::put('noti_problems/{noti_id}',  'NotificationProblemController@update');

    Route::get('history_logs', 'HistoryLogController@index')->name('history_logs');
    Route::get('history_logs/{amount}', 'HistoryLogController@getLogs');

    Route::post('history_logs/export', 'HistoryLogController@exportLogs');


    Route::get('buildings', 'BuildingController@index')->name('buildings');
    Route::post('buildings', 'BuildingController@store');
    Route::put('buildings/{building_id}', 'BuildingController@update');
    Route::delete('buildings/{building_id}', 'BuildingController@deleteOne');
    Route::post('buildings/selected', 'BuildingController@deleteMultiple');

    Route::post('buildings/import', 'BuildingController@importBuildings');
    Route::post('buildings/export', 'BuildingController@exportBuildings');

    Route::get('rooms', 'RoomController@index')->name('rooms');
    Route::post('rooms', 'RoomController@store');
    Route::put('rooms/{room_id}', 'RoomController@update');
    Route::delete('rooms/{room_id}', 'RoomController@deleteOne');
    Route::post('rooms/selected', 'RoomController@deleteMultiple');

    Route::post('get_room_qr/{room_code}', 'RoomController@getRoomQRCode');
    Route::post('get_rooms_qr_zip', 'RoomController@getQRCodeZIP');

    Route::post('rooms/import', 'RoomController@importRooms');
    Route::post('rooms/export', 'RoomController@exportRooms');

    Route::get('brands', 'BrandController@index')->name('brands');
    Route::post('brands', 'BrandController@store');
    Route::put('brands/{brand_id}', 'BrandController@update');
    Route::delete('brands/{brand_id}', 'BrandController@deleteOne');
    Route::post('brands/selected', 'BrandController@deleteMultiple');

    Route::post('brands/import', 'BrandController@importBrands');
    Route::post('brands/export', 'BrandController@exportBrands');

    Route::get('problem_descs', 'ProblemDescriptionController@index')->name('problem_descs');
    Route::post('problem_descs', 'ProblemDescriptionController@store');
    Route::put('problem_descs/{problem_des_id}', 'ProblemDescriptionController@update');
    Route::delete('problem_descs/{problem_des_id}', 'ProblemDescriptionController@deleteOne');
    Route::post('problem_descs/selected', 'ProblemDescriptionController@deleteMultiple');

    Route::post('problem_descs/import', 'ProblemDescriptionController@importProblemDescs');
    Route::post('problem_descs/export', 'ProblemDescriptionController@exportProblemDescs');

    Route::get('items', 'ItemController@index')->name('items');
    Route::post('items', 'ItemController@store');
    Route::put('items/{item_id}', 'ItemController@update');
    Route::delete('items/{item_id}', 'ItemController@deleteOne');
    Route::post('items/selected', 'ItemController@deleteMultiple');

    Route::post('get_item_qr/{item_code}', 'ItemController@getQRCode');
    Route::post('get_items_qr_zip', 'ItemController@getQRCodeZIP');

    Route::post('items/import', 'ItemController@importItems');
    Route::post('items/export', 'ItemController@exportItems');

    Route::get('item_types', 'ItemTypeController@index')->name('item_types');
    Route::post('item_types', 'ItemTypeController@store');
    Route::put('item_types/{type_id}', 'ItemTypeController@update');
    Route::delete('item_types/{type_id}', 'ItemTypeController@deleteOne');
    Route::post('item_types/selected', 'ItemTypeController@deleteMultiple');

    Route::post('item_types/import', 'ItemTypeController@importItemTypes');
    Route::post('item_types/export', 'ItemTypeController@exportItemTypes');


    Route::get('statuses', 'StatusController@index')->name('statuses');
    // Route::post('statuses', 'StatusController@store');
    // Route::put('statuses/{status_id}', 'StatusController@update');
    // Route::delete('statuses/{status_id}', 'StatusController@destroy');
});

Route::get('noti_problems', 'NotificationProblemController@index')->name('noti_problems');
Route::post('noti_problems',  'NotificationProblemController@store');

Route::get('sendprobleminroom/{room_code}', 'NotificationProblemController@showproblemNotResolvedInRoom');
Route::get('sendproblem/{item_code}', 'NotificationProblemController@showproblemNotResolved');

Route::get('history_logs/tracking/{noti_id}', 'HistoryLogController@getTracking');

Route::post('sso/gettoken', 'SSOLoginController@getToken');
Route::post('sso/fetchme', 'SSOLoginController@fetchme');
