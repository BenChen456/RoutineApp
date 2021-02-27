<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\Todolist;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{

    public function store(Request $request){
        for ($i = 0; $i < count($request->tasks); $i++) {
            $tasklist[] = [
                'name' => $request->tasks[$i]['name'],
                'todolist_id' => $request->tasks[$i]['todolist_id'],
                'status' => $request->tasks[$i]['status']
            ];
        }
        Task::insert($tasklist);
        $return = DB::select('select * from tasks where todolist_id = :id', ['id' => 1]);

        return $return;
    }

    public function update(Request $request){
        //Update
        for($i=0; $i<count($request->originalTasks); $i++){
            if($request->originalTasks[$i]['status'] == 'update'){
                DB::table('tasks')
                ->where('id', $request->originalTasks[$i]['id'])
                ->update(
                    [
                    'name' => $request->originalTasks[$i]['name']
                    ],
                );
            }
        }
        return 'Updated';
    }

    public function delete(Request $request){
        $delete = $request->deletedOriginalTasks;
        for($i = 0; $i < count($delete); $i++){
            DB::table('tasks')->where('id', '=', $delete[$i]['id'])->delete();
        }
        return 'Deleted';
    }

    public function oneStopUpdate(Request $request){
        //Delete
        if(count($request->deletedOriginalTasks) > 0){
            $delete = $request->deletedOriginalTasks;
            for($i = 0; $i < count($delete); $i++){
                DB::table('tasks')->where('id', '=', $delete[$i]['id'])->delete();
            }
        }

        //Update
        for($i=0; $i<count($request->originalTasks); $i++){
            if($request->originalTasks[$i]['status'] == 'update'){
                DB::table('tasks')
                ->where('id', $request->originalTasks[$i]['id'])
                ->update(
                    [
                    'name' => $request->originalTasks[$i]['name']
                    ],
                );
            }
        }

        //Post
        if(count($request->tasks) > 0){
            for ($i = 0; $i < count($request->tasks); $i++) {
                $tasklist[] = [
                    'name' => $request->tasks[$i]['name'],
                    'todolist_id' => $request->tasks[$i]['todolist_id'],
                    'status' => $request->tasks[$i]['status'],
                    'user_id' => $request->tasks[$i]['user_id']
                ];
            }
            Task::insert($tasklist);
        }

        $return = DB::select('select * from tasks where todolist_id = :id', ['id' => $request->id]);
        return $return;
    }

    public function oneStopUpdateNEW(Request $request){
        //Delete
        if(count($request->tasksToDelete) > 0){
            $delete = $request->tasksToDelete;
            for($i = 0; $i < count($delete); $i++){
                DB::table('tasks')->where('id', '=', $delete[$i]['id'])->delete();
            }
        }

        //Update
        if(count($request->update) > 0){
            for($i=0; $i<count($request->update); $i++){
                    DB::table('tasks')
                    ->where('id', $request->update[$i]['id'])
                    ->update(
                        [
                        'name' => $request->update[$i]['name']
                        ],
                    );
            }
        }

        //Post
        if(count($request->post) > 0){
            Task::insert($request->post); 
        }

        $return = DB::select('select * from tasks where todolist_id = :id', ['id' => $request->id]);
        return $return;
    }



}
