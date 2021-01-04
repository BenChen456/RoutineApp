<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Model\Todolist;

class Task extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'completed', 'difficulty', 'todolist_id'];

    public function todolist(){
        return $this->belongsTo(Todolist::class);
    }
}
