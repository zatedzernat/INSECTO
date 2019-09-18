<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $fillable = ['room_code','room_name','building_id','cancel_flag','update_by'];
    protected $primaryKey = 'room_id';

    public function buildings () {
        return $this->belongsTo('App\Http\Models\Building','building_id');
    }

    public function findByCancelFlag($string) {
        return Room::where('cancel_flag',$string)->get();
    }
}
