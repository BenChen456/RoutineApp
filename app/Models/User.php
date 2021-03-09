<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Model\Todolist;
use App\Model\Task;
use App\Model\Act;
use App\Model\Theme;
use App\Model\Theme_User;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    public function todolist(){
        return $this->hasMany(Todolist::class);
    }

    public function tasks(){
        return $this->hasMany(Task::class);
    }

    public function acts(){
        return $this->hasMany(Act::class);
    }

    public function themes(){
        return $this->hasMany(Theme::class);
    }

    public function themes_users(){
        return $this->hasMany(Theme_User::class);
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'current_todolist',
        'points',
        'current_time',
        'timezone',
        'theme'
    ]; 

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}
