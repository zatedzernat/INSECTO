<?php

namespace App\Http\Controllers;

use App\Http\Models\User;
use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserUpdateRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;

class UserController extends Controller
{

    private $user;

    public function __construct()
    {
        $this->user = new User();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = $this->user->findByCancelFlag('N');
        return compact('users');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserCreateRequest $request)
    {
        $name = $request->name;
        $email = $request->email;
        $createFail = $this->user->createNewUser($name, $email);
        if ($createFail) {
            $error = 'Add duplicate user eamil!';
            return  $this->serverResponse($error, null);
        } else {
            $success = 'Add user \'' . $name . '\' success';
            return  $this->serverResponse(null, $success);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(UserUpdateRequest $request, $user_id)
    {
        $id = $request->id;
        $name = $request->name;
        $isSuccess = $this->user->updateUser($id, $name);
        if ($isSuccess) {
            $success = 'Update user \'' . $name . '\' success';
            return  $this->serverResponse(null, $success);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
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
