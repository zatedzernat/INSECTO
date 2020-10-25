<?php

namespace App\Http\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Arr;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'sso_token',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'sso_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getToken($slice_arrays)
    {
        $email = Arr::get($slice_arrays, 'email');
        $user = User::where('email', $email)->first();
        $token = null;
        if ($user) {
            $token = Arr::get($slice_arrays, 'token.token');
            $user->sso_token = $token;
            $user->save();
            return $token;
        } else {
            return $token;
        }
    }
    public function getUser($email)
    {
        $user = User::where('email', $email)->first();
        if ($user) {
            return $user;
        } else {
            return null;
        }
    }
}
