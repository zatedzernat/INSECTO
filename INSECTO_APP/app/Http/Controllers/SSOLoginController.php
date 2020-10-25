<?php

namespace App\Http\Controllers;

use App\Http\Models\User;
use App\Http\Requests\SSOGetTokenRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;

class SSOLoginController extends Controller
{
    private $user;

    public function __construct()
    {
        $this->user = new User();
    }

    function getToken(SSOGetTokenRequest $request)
    {
        $code = $request->code;
        $req_client_id = $request->client_id;
        $redirect_uri = $request->url;
        $client_id = config('app.client_id');

        if ($client_id === $req_client_id) {
            $response = $this->sendRequest($client_id, $code, $redirect_uri);
            if ($response->successful()) {
                $response_json =
                    $response->json();
                $slice_arrays = Arr::only($response_json, ['email', 'token']);

                $token = $this->user->getToken($slice_arrays);
                if ($token) {
                    return $token;
                } else {
                    $error = 'User not found in INSECTO';
                    return  $this->serverResponse($error, null);
                }
            } else {
                $error = $response->body();
                return  $this->serverResponse($error, null);
            }
        } else {
            $error = 'Unauthorized Client ID';
            return  $this->serverResponse($error, null);
        }
    }

    public function sendRequest($client_id, $code, $redirect_uri)
    {
        $sso_url = config('app.sso_url') . 'oauth/token?';
        $client_secret = config('app.client_secret');
        $params = 'client_secret=' . $client_secret . '&client_id=' . $client_id . '&code=' . $code . '&redirect_uri=' . $redirect_uri;
        $response = Http::get($sso_url . $params);
        return $response;
    }

    public function fetchme(Request $request)
    {
        $token = $request->token;
        $sso_fetch = config('app.sso_url') . 'me';
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->get($sso_fetch);
        if ($response->successful()) {
            $response_json = $response->json();
            $email = Arr::only($response_json, ['email']);
            $user = $this->user->getUser($email);
            if ($user) {
                return $user;
            } else {
                $error = 'User not found in INSECTO';
                return  $this->serverResponse($error, null);
            }
        } else {
            $error = $response->body();
            return  $this->serverResponse($error, null);
        }
    }

    public function serverResponse($error, $success)
    {
        $time = Carbon::now()->format('H:i:s');
        return response()->json([
            'errors' => $error,
            'success' => $success,
            'time' => $time
        ]);
    }
}
