<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Problem_Description extends Model
{
    protected $fillable = ['problem_des_id','problem_desciption','type_id','cancel_flag','created_at','updated_at','updated_by'];
    protected $primaryKey = 'problem_des_id';

    public function item_types() {
        return $this->belongsTo('App\Http\Models\Item_type','type_id');
    }
    public function notification_problems() {
        return $this->hasMany('App\Http\Models\Notification_Problem','problem_detail_id','problem_detail_id');
    }
}
