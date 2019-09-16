<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Item_Type extends Model
{
    //
    protected $fillable = ['type_id','type_name','cancel_flag','created_at','updated_at','updated_by'];
    protected $primaryKey = 'noti_id';

    public function problem_descriptions() {
        return $this->hasMany('App\Http\Models\Problem_Description','type_id','type_id');
    }
    public function items() {
        return $this->hasMany('App\Http\Models\Items','type_id','type_id');
    }
}
