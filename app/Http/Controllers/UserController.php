<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    }

    public function index(Request $request){
        $userStatus = auth()->user();
        return $userStatus;
    }

    public function store(Request $request){
        User::create($request->all());
        return 'sucess';
        /* return Task::findOrFail($id); */
    }
}
