<?php

namespace App\Resolvers;

// use Illuminate\Http\Request;

use App\Http\Models\User;
use Illuminate\Support\Facades\Request;

class UserResolver implements \OwenIt\Auditing\Contracts\UserResolver
{
    /**
     * {@inheritdoc}
     */
    public static function resolve()
    {
        $user_id = Request::header('user_id');
        $user = User::find($user_id);
        if ($user) {
            return $user;
        } else {
            $problem_sender_id = 6;
            return User::find($problem_sender_id);
        }
    }
}
