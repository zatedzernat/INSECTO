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

Route::get('/problem/{id}', 'ProblemController@create')
->where('id', '[0-9]+');
Route::get('/problem', 'ProblemController@index');
Route::post('/problem/send', 'ProblemController@store');

Route::get('rooms', 'RoomController@index');
Route::get('items', 'ItemController@index');
Route::get('problem_des', 'ProblemDescriptionController@index');
Route::get('problem_detail', 'ProblemDetailController@index');
Route::get('noti_problems', 'NotificationProblemController@show');
Route::get('brands','BrandController@index');
Route::get('statuses','StatusController@index');


