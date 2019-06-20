<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Problem_Detail extends Model
{
    protected $fillable = ['item_id','problem_des_id','cancel_flag'];
    protected $primaryKey = 'problem_detail_id';
}
