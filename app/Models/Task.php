<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Model\Todolist;
use App\Model\User;

class Task extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'completed', 'difficulty', 'todolist_id', 'user_id', 'status'];

    public function todolist(){
        return $this->belongsTo(Todolist::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
