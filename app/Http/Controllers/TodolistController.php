<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todolist;

class TodolistController extends Controller
{
    public function index(){
        $list = Todolist::first()->task;
        return $list;
        /* return Todolist::all(); */
    }

}
