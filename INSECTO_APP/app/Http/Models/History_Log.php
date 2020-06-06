<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
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
        $audits =  Audit::with('user')->orderBy('created_at', 'desc')->get();
        $grouped = $audits->groupBy(function ($item) {
            return date('d-M-Y',strtotime($item->created_at));
        });
        return $grouped;
    }
}
