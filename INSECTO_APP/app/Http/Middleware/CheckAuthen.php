<?php

namespace App\Http\Middleware;

use App\Http\Models\User;
use Carbon\Carbon;
use Closure;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;

class CheckAuthen
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
        if ($token) {
            $isValid = $this->fetchme($token);
            if ($isValid) {
                return $next($request);
            } else {
                $error = "Invalid token!";
                return  $this->serverResponse($error, null, 401);
            }
        } else {
            $error = "Token not found!";
            return  $this->serverResponse($error, null, 404);
        }
    }

    public function fetchme($token)
    {
        $sso_fetch = config('app.sso_url') . 'me';
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->get($sso_fetch);
        if ($response->successful()) {
            $response_json = $response->json();
            $email = Arr::only($response_json, ['email']);
            $user = new User();
            $user = $user->getUser($email);
            if ($user) {
                return true;
            } else {
                $error = 'User not found in INSECTO';
                return  $this->serverResponse($error, null, 404);
            }
        } else {
            $error = $response->body();
            return  $this->serverResponse($error, null, 401);
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
