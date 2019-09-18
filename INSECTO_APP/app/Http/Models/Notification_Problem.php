<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Notification_Problem extends Model
{
    protected $fillable = ['item_id','status_id','problem_des_id','problem_description','cancel_flag','updated_by'];
    protected $primaryKey = 'noti_id';

    public function status() {
        return $this->belongsTo('App\Http\Models\Status','status_id');
    }

    public function item() {
        return $this->belongsTo('App\Http\Models\Item','item_id');
    }

    public function problem_description() {
        return $this->belongsTo('App\Http\Models\Problem_Description','problem_des_id');
    }

    public function findByCancelFlag($string) {
        return Notification_Problem::where('cancel_flag',$string)->get();
    }
}
