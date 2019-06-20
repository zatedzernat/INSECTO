<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $fillable = ['floor','room_name','cancel_flag'];
    protected $primaryKey = 'room_id';

    public function items () {
        return $this->hasMany('App\Http\Models\Item','room_id','room_id');
    }
}
