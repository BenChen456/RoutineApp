<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\Todolist;

class TaskController extends Controller
{
    public function index(){
        return Task::all();
    }

    public function store(Request $request){
        Task::create($request->all());
        return Task::all();
    }

    public function update(Request $request, $id){
        $task = Task::findOrFail($id);
        $task->update($request->all());
        return $task;
    }

    public function delete($id){
        $task = Task::findOrFail($id);
        $task->delete();
        return Task::all();
    }
}
