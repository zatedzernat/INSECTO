<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class Item extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
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
        // return Item::where('item_code', $code)->first();
        return Item::where([
            ['item_code', $code],
            ['cancel_flag', 'N']
        ])->first();
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

    public function setCode($code)
    {
        $this->item_code = $code;
    }

    public function setItemName($item_name)
    {
        $this->item_name = $item_name;
    }

    public function setRoomID($room_id)
    {
        $this->room_id = $room_id;
    }
    public function setTypeID($type_id)
    {
        $this->type_id = $type_id;
    }
    public function setBrandID($brand_id)
    {
        $this->brand_id = $brand_id;
    }
    public function setSerial($serial_number)
    {
        $this->serial_number = $serial_number;
    }
    public function setModel($model)
    {
        $this->model = $model;
    }

    public function createNewItem($item_code, $item_name, $room_id, $type_id, $brand_id, $serial_number, $model)
    {
        $item = Item::firstOrCreate(
            ['item_code' => $item_code],
            [
                'item_name' => $item_name,
                'room_id' => $room_id,
                'type_id' => $type_id,
                'brand_id' => $brand_id,
                'serial_number' => $serial_number,
                'model' => $model,
                'cancel_flag' => 'N',
                'update_by' => 'ชื่อ user ตามLDAP',
            ]
        );

        //* when delete (chang cc_flag to y) and want to add same thing it will change cc_flg to n or return error (create duplicate)
        if (!$item->wasRecentlyCreated) {
            if ($item->cancel_flag == "Y") {
                //todo set update by ตาม LDAP
                $item->item_name = $item_name;
                $item->room_id = $room_id;
                $item->type_id = $type_id;
                $item->brand_id = $brand_id;
                $item->serial_number = $serial_number;
                $item->model = $model;
                $item->cancel_flag = "N";
                $item->save();
            } else {
                return true;
            }
        }
        return false;
    }

    public function updateItem($id, $item_name, $room_id, $type_id, $brand_id, $serial_number, $model)
    {

        $item = $this->findByID($id);
        $item->item_name = $item_name;
        $item->room_id = $room_id;
        $item->type_id = $type_id;
        $item->brand_id = $brand_id;
        $item->serial_number = $serial_number;
        $item->model = $model;
        $item->save();
        //todo set updateby ตาม LDAP
        // $item->setUpdateBy('ชื่อ user ตามLDAP');

        return true;
    }

    public function deleteItem($item_id)
    {
        // * not real delete but change cancel flag to Y
        $item = $this->findByID($item_id);
        $item->setCancelFlag('Y');
        $item->save();
        return $item;
    }

    public function setNullInItem($brand_id)
    {
        // * change brand in items
        $items = Item::where('brand_id', $brand_id)->get();
        foreach ($items as $item) {
            $item->brand_id = null;
            $item->save();
        }
    }
}
