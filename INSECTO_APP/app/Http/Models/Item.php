<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $fillable = ['item_code', 'item_name', 'room_id', 'type_id', 'brand_id', 'serial_number', 'model', 'note', 'cancel_flag', 'update_by'];
    protected $primaryKey = 'item_id';

    public function room()
    {
        return $this->belongsTo('App\Http\Models\Room', 'room_id');
    }

    public function brand()
    {
        return $this->belongsTo('App\Http\Models\Brand', 'brand_id');
    }

    public function item_type()
    {
        return $this->belongsTo('App\Http\Models\Item_Type', 'type_id');
    }

    public function notification_problems()
    {
        return $this->hasMany('App\Http\Models\Notification_Problem', 'item_id', 'item_id');
    }

    public function findByCancelFlag($string)
    {
        return Item::where('cancel_flag', $string)->get();
    }

    public function findByCode($code)
    {
        return Item::where('item_code', $code)->first();
    }

    public function findByID($int)
    {
        return Item::where('item_id', $int)->first();
    }
    
    public function setCancelFlag($CancelFlag)
    {
        $this->cancel_flag = $CancelFlag;
    }

    public function setUpdateBy($updateby)
    {
        $this->update_by = $updateby;
    }

    public function createNewBrand($newItem)
    {
        $addItem = Item::firstOrCreate(
            ['item_name' => $newItem],
            [
                'cancel_flag' => 'N',
                'update_by' => 'ชื่อ user ตามLDAP'
            ]
        );
        return $addItem;
    }
}
