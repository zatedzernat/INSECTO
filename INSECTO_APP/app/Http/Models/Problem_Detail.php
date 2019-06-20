<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Problem_Detail extends Model
{
    protected $fillable = ['item_id','problem_des_id','cancel_flag'];
    protected $primaryKey = 'problem_detail_id';

    public function item() {
        return $this->belongsTo('App\Http\Models\Item','item_id');
    }

    public function problem_descriptions() {
        return $this->belongsTo('App\Http\Models\Problem_Description','problem_des_id');
    }
}
