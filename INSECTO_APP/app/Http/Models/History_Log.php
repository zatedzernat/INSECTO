<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Models\Audit;

class History_log extends Model
{
    //! must add this section     
    //public function user()
    // {
    //     return $this->belongsTo('App\Http\Models\User', 'user_id', 'id');
    // }
    //! on Audit model INSECTO/INSECTO_APP/vendor/owen-it/laravel-auditing/src/Models/Audit.php

    public function getAll()
    {
        return Audit::with('user')->get();
    }
}
