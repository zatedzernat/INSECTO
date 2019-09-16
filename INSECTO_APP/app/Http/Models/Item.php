<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $fillable = ['item_name','room_code','brand_id','serial_number','model','type_id'];
    protected $primaryKey = 'item_code';

    public function rooms() {
        return $this->belongsTo('App\Http\Models\Room','room_code');
    }

    public function brands() {
        return $this->belongsTo('App\Http\Models\Brand','brand_id');
    }

    public function item_types() {
        return $this->belongsTo('App\Http\Models\Item_Type','type_id');
    }

    public function notification_problems() {
        return $this->hasMany('App\Http\Models\Notification_Problem','item_code','item_code');
    }

}
