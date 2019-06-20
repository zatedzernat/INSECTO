<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $fillable = ['item_name','picture','room_id','cancel_flag'];
    protected $primaryKey = 'item_id';

    public function room() {
        return $this->belongsTo('App\Http\Models\Room','room_id');
    }
}
