<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Building extends Model
{
    
    protected $fillable = ['building_code','building_name','cancel_flag','update_by'];
    protected $primaryKey = 'building_id';

    public function items () {
        return $this->hasMany('App\Http\Models\Item','building_id','building_id');
    }

    public function findByCancelFlag($string) {
        return Building::where('cancel_flag',$string)->get();
    }
}
