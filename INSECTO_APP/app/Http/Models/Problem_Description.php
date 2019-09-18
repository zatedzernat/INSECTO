<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Problem_Description extends Model
{
    protected $fillable = ['problem_desciption','type_id','cancel_flag','updated_by'];
    protected $primaryKey = 'problem_des_id';

    public function item_type() {
        return $this->belongsTo('App\Http\Models\Item_type','type_id');
    }

    public function notification_problems() {
        return $this->hasMany('App\Http\Models\Notification_Problem','problem_des_id','problem_des_id');
    }

    public function findByCancelFlag($string) {
        return Problem_Description::where('cancel_flag',$string)->get();
    }

    public function findByID($problem_des_id) {
        return Problem_Description::find($problem_des_id);
    }

    public function getProblemDescription($problem_des_id) {
        $problem_desc = Problem_Description::find($problem_des_id);
        return $problem_desc->problem_description;
    }
}
