<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', [App\Http\Controllers\AuthController::class, 'login']);
    Route::post('/register', [App\Http\Controllers\AuthController::class, 'register']);
    Route::post('/logout', [App\Http\Controllers\AuthController::class, 'logout']);
    Route::post('/refresh', [App\Http\Controllers\AuthController::class, 'refresh']);
    Route::post('/me', [App\Http\Controllers\AuthController::class, 'me']);
    Route::post('/update', [App\Http\Controllers\AuthController::class, 'update']);
    
    Route::post('/loginHelper', [App\Http\Controllers\AuthController::class, 'loginHelper']);

    Route::post('/todolist', [App\Http\Controllers\AuthController::class, 'todolist']);
    Route::post('/todolist/todolistUpdate', [App\Http\Controllers\AuthController::class, 'todolistUpdate']);
    Route::post('/todolist/todolistStore', [App\Http\Controllers\AuthController::class, 'todolistStore']);
    Route::post('/todolist/todolistDelete', [App\Http\Controllers\AuthController::class, 'todolistDelete']);

    Route::post('/tasks', [App\Http\Controllers\AuthController::class, 'tasks']);
    Route::post('/task/update', [App\Http\Controllers\AuthController::class, 'tasksUpdate']);
    Route::post('/task/tasksRestart', [App\Http\Controllers\AuthController::class, 'tasksRestart']);
    Route::post('/tasks/oneStopUpdateNEW', [App\Http\Controllers\TaskController::class, 'oneStopUpdateNEW']);
    Route::post('/tasksUserPanel', [App\Http\Controllers\AuthController::class, 'tasksUserPanel']);

    Route::post('/acts', [App\Http\Controllers\AuthController::class, 'acts']);
    Route::post('/act/insert', [App\Http\Controllers\AuthController::class, 'actInsert']);

    Route::post('/getTime', [App\Http\Controllers\AuthController::class, 'getTime']);

    Route::post('/setThemes', [App\Http\Controllers\AuthController::class, 'setThemes']);
    Route::post('/userThemes', [App\Http\Controllers\AuthController::class, 'userThemes']);
    Route::post('/themesBuy', [App\Http\Controllers\AuthController::class, 'themesBuy']);
});


Route::post('/task', [App\Http\Controllers\TaskController::class, 'store']);      //post
Route::post('/task/edit', [App\Http\Controllers\TaskController::class, 'update']);//put
Route::post('/task/del', [App\Http\Controllers\TaskController::class, 'delete']); //delete
Route::post('/task/oneStopUpdate', [App\Http\Controllers\TaskController::class, 'oneStopUpdate']); 

Route::get('/testtask', [App\Http\Controllers\TesttaskController::class, 'index']);

Route::get('/orders', [App\Http\Controllers\OrderController::class, 'index']);
Route::post('/ordersToCustomer', [App\Http\Controllers\OrderController::class, 'linkCustomer']);