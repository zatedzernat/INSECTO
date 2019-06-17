<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Problem extends Model
{
    protected $fillable = ['problem_date','problem_detail_id','problem_status','cancel_flag'];
}
