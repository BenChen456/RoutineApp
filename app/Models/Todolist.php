<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Task; 
use App\Models\Testtask; 
use App\Models\User;

class Todolist extends Model
{
    use HasFactory; protected $guarded = [];

    public function task(){
        return $this->hasMany(Task::class);
    }
    public function testTask(){
        return $this->hasMany(Testtask::class);
    }
    public function user(){
        return $this->belongsTo(User::class);
    }
}
