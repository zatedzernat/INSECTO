<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Building extends Model
{
    
    protected $fillable = ['building_name'];
    protected $primaryKey = 'building_code';

    public function items () {
        return $this->hasMany('App\Http\Models\Item','building_code','building_code');
    }
}
