<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Model\Todolist;

class Testtask extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'todolist_id'];

    public function todolist(){
        return $this->belongsTo(Todolist::class);
    }
}
