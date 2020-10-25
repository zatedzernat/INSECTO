<?php

namespace App\Http\Middleware;

use App\Http\Models\User;
use Carbon\Carbon;
use Closure;

class CheckAuthenToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $token = $request->header('Authorization');
        $user_id = $request->header('user_id');
        if ($token && $user_id) {
            $isValid = $this->checkToken($token, $user_id);
            if ($isValid) {
                return $next($request);
            } else {
                $error = "Invalid token!";
                return  $this->serverResponse($error, null, 401);
            }
        } else {
            $error = "Token or User ID not found!";
            return  $this->serverResponse($error, null, 404);
        }
    }

    public function checkToken($token, $user_id)
    {
        $user = User::find($user_id);
        if ($user) {
            $user_token = $user->sso_token;
            if ($user_token === $token) {
                return true;
            } else {
                return false;
            }
        } else {
            $error = 'User not found in INSECTO';
            return  $this->serverResponse($error, null, 404);
        }
    }

    public function serverResponse($error, $success, $status)
    {
        $time = Carbon::now()->format('H:i:s');
        return response()->json([
            'errors' => $error,
            'success' => $success,
            'time' => $time
        ], $status);
    }
}
