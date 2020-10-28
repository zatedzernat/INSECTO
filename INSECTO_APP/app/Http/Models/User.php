<?php

namespace App\Http\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Arr;
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

    public function updateUser($id, $name)
    {
        $user = User::find($id);
        $user->name = $name;
        $user->save();
        return true;
    }
}
