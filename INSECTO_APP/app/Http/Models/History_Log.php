<?php

namespace App\Http\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use OwenIt\Auditing\Models\Audit;

class History_log extends Model
{
    private $count = [];
    //! must add this section     
    //public function user()
    // {
    //     return $this->belongsTo('App\Http\Models\User', 'user_id', 'id');
    // }

    // public function problem_desc()
    // {
    //     return $this->belongsTo('App\Http\Models\Problem_Description', 'problem_des_id', 'auditable_id');
    // }
    //! on Audit model INSECTO/INSECTO_APP/vendor/owen-it/laravel-auditing/src/Models/Audit.php

    public function getAll()
    {
        $audits =  Audit::with('user')->orderBy('created_at', 'desc')->get();
        $grouped = $audits->groupBy(function ($item) {
            return date('d-m-Y', strtotime($item->created_at)); //21-06-2020
        });
        return $grouped;
    }

    public function countPerDate()
    {
        $audits = Audit::groupBy('date')
            ->orderBy('date', 'DESC')
            ->get(array(
                DB::raw('DATE_FORMAT(created_at, "%d-%m-%Y") as date'), //21-06-2020
                DB::raw('COUNT(*) as "count"')
            ));

        return $audits;
    }

    public function getLogsByAmountOfDays($amount)
    {
        $grouped = $this->getAll();
        $lastest_with_amount_of_day = $grouped->take($amount);
        return $lastest_with_amount_of_day;
    }

    public function getTracking($noti_tracking)
    {
        $noti_tracking_in_days = $noti_tracking->filter(function ($noti) {
            return $noti->created_at->toDateString() == Carbon::today()->toDateString();
        });
        return $noti_tracking_in_days;
    }
}
