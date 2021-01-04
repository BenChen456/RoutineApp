<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Testtask;
use App\Models\Todolist;

class TesttaskController extends Controller
{
    public function store(Request $request){
        Testtask::create($request->all());
        return Testtask::all();
    }

    public function index(Request $request){
        $test = Testtask::first()->todolist;
        return $test;
    }
}
