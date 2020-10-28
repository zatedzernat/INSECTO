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
        // dd($request->header());
        $token = $request->header('Authorization');
        // $user_id = $request->header('User_Id',);
        $user_id = $request->header('User-Id',);
        if ($token) {
            if ($user_id) {
                $isUserExistInINSECTO = $this->checkUser($user_id);
                if ($isUserExistInINSECTO) {
                    $isValid = $this->checkToken($token, $user_id);
                    if ($isValid) {
                        return $next($request);
                    } else {
                        $error = "Invalid token!";
                        return  $this->serverResponse($error, null, 401);
                    }
                } else {
                    $error = 'User not found in INSECTO';
                    return  $this->serverResponse($error, null, 404);
                }
            } else {
                $error = "User ID not found! (" . $user_id . ")";
                return  $this->serverResponse($error, null, 404);
            }
        } else {
            $error = "Token not found!";
            return  $this->serverResponse($error, null, 404);
        }
    }

    public function checkUser($user_id)
    {
        $user = User::find($user_id)->where('cancel_flag', 'N')->first();
        if ($user) {
            return true;
        } else {
            return false;
        }
    }

    public function checkToken($token, $user_id)
    {
        $user = User::find($user_id);
        $user_token = $user->sso_token;
        // dd('$user_token = ' . $user_token, 'token = ' . $token);
        if ($user_token === $token) {
            return true;
        } else {
            return false;
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
