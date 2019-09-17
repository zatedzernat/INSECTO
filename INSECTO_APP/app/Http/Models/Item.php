<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $fillable = ['item_code','item_name','room_code','brand_id','serial_number','model','type_id','cancel_flag','update_by'];
    protected $primaryKey = 'item_code';
    protected $keyType = 'string';
    public $incrementing = false;

    public function room() {
        return $this->belongsTo('App\Http\Models\Room','room_code');
    }

    public function brand() {
        return $this->belongsTo('App\Http\Models\Brand','brand_id');
    }

    public function item_type() {
        return $this->belongsTo('App\Http\Models\Item_Type','type_id');
    }

    public function notification_problems() {
        return $this->hasMany('App\Http\Models\Notification_Problem','item_code','item_code');
    }

}
