<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $fillable = ['room_name','building_code'];
    protected $primaryKey = 'room_code';

    public function buildings () {
        return $this->belongsTo('App\Http\Models\Building','building_code');
    }
}
