<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/task', [App\Http\Controllers\TaskController::class, 'index']);
Route::get('/todolist', [App\Http\Controllers\TodolistController::class, 'index']);
Route::post('/task', [App\Http\Controllers\TaskController::class, 'store']);
Route::get('/testtask', [App\Http\Controllers\TesttaskController::class, 'index']);
Route::put('/task/{id}', [App\Http\Controllers\TaskController::class, 'update']);
Route::delete('/task/{id}', [App\Http\Controllers\TaskController::class, 'delete']);