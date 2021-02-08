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
    
    public function todolist(Request $request){
        $todolists = DB::select('select * from todolists where user_id = :id', 
         ['id' => $request->id]);
         return $todolists;
    }

}
