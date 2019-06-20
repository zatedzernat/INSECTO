<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Problem_Description extends Model
{
    protected $fillable = ['problem_des','cancel_flag'];
    protected $primaryKey = 'problem_des_id';

    public function problem_details() {
        return $this->hasMany('App\Http\Models\Problem_Detail','problem_detail_id','problem_detail_id');
    }
}
