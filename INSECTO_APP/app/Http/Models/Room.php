<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $fillable = ['room_code','room_name','building_code','cancel_flag','update_by'];
    protected $primaryKey = 'room_code';
    protected $keyType = 'string';
    public $incrementing = false;

    public function buildings () {
        return $this->belongsTo('App\Http\Models\Building','building_code');
    }

    public function findByCancelFlag($string) {
        return Room::where('cancel_flag',$string)->get();
    }
}
