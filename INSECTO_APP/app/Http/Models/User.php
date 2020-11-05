<?php

namespace App\Http\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;

// use OwenIt\Auditing\Contracts\Auditable;

class User extends Authenticatable /*implements Auditable*/
{
    // use \OwenIt\Auditing\Auditable;
    use Notifiable;

    // /**
    //  * {@inheritdoc}
    //  */
    // public function transformAudit(array $data): array
    // {
    //     if (Arr::has($data['old_values'], 'cancel_flag') and Arr::has($data['new_values'], 'cancel_flag')) {
    //         if ($data['old_values']['cancel_flag'] == 'N' and $data['new_values']['cancel_flag'] == 'Y') {
    //             $data['event'] = 'deleted';
    //         } elseif ($data['old_values']['cancel_flag'] == 'Y' and $data['new_values']['cancel_flag'] == 'N') {
    //             $data['event'] = 'restored';
    //         }
    //     }

    //     return $data;
    // }

    // /**
    //  * Attributes to exclude from the Audit.
    //  *
    //  * @var array
    //  */
    // protected $auditExclude = [
    //     'sso_token',
    // ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'sso_token', 'cancel_flag',
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

    public function getAll()
    {
        return User::all();
    }

    public function findByCancelFlag($string)
    {
        return User::where('cancel_flag', $string)->get();
    }

    public function getToken($slice_arrays)
    {
        $email = Arr::get($slice_arrays, 'email');
        $user = User::where([
            ['email', $email],
            ['cancel_flag', 'N'],
        ])->first();
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
        $user = User::where([
            ['email', $email],
            ['cancel_flag', 'N'],
        ])->first();
        if ($user) {
            return $user;
        } else {
            return null;
        }
    }

    public function findByName($name)
    {
        $user = User::where('name', $name)->first();
        if ($user) {
            return $user;
        } else {
            return null;
        }
    }

    public function createNewUser($name, $email)
    {
        $user = User::firstOrNew(
            ['email' => $email],
            [
                'name' => $name,
                'password' => Hash::make(config('app.test_password')),
                'cancel_flag' => 'N'
            ]
        );

        if ($user->exists) {
            $userByName = $this->findByName($name);
            if ($userByName) {
                return array(true, "name"); // createfail == true
            } else {
                if ($user->cancel_flag == "Y") {
                    $user->name = $name;
                    $user->cancel_flag = "N";
                    $user->save();
                    return array(false);
                } else {
                    return array(true, "email");
                }
            }
        } else {
            $userByName = $this->findByName($name);
            if ($userByName) {
                return array(true, "name"); // createfail == true
            } else {
                $user->save();
                return array(false);
            }
        }

        // //* when delete (chang cc_flag to y) and want to add same thing it will change cc_flg to n or return error (create duplicate)
        // if (!$user->wasRecentlyCreated) {
        //     if ($user->cancel_flag == "Y") {
        //         $user->name = $name;
        //         $user->cancel_flag = "N";
        //         $user->save();
        //     } else {
        //         return true;
        //     }
        // }
        // return false;
    }

    public function updateUser($id, $name)
    {
        $userByName = $this->findByName($name);
        if ($userByName) {
            return false;
        } else {
            $user = User::find($id);
            $user->name = $name;
            $user->save();
            return true;
        }
    }

    public function deleteUser($id)
    {
        $user = User::find($id);
        $user->cancel_flag = 'Y';
        $user->save();
        return $user;
    }
}
