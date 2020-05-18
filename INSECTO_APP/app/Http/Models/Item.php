<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use OwenIt\Auditing\Contracts\Auditable;

class Item extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    protected $fillable = ['item_code', 'item_name', 'room_id', 'type_id', 'group', 'brand_id', 'serial_number', 'model', 'note', 'cancel_flag', 'user_id'];
    protected $primaryKey = 'item_id';

    /**
     * {@inheritdoc}
     */
    public function transformAudit(array $data): array
    {
        if (Arr::has($data['old_values'], 'cancel_flag') and Arr::has($data['new_values'], 'cancel_flag')) {
            if ($data['old_values']['cancel_flag'] == 'N' and $data['new_values']['cancel_flag'] == 'Y') {
                $data['event'] = 'deleted';
            } elseif ($data['old_values']['cancel_flag'] == 'Y' and $data['new_values']['cancel_flag'] == 'N') {
                $data['event'] = 'restored';
            }
        }

        return $data;
    }

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

    public function user()
    {
        return $this->belongsTo('App\Http\Models\User', 'user_id', 'id');
    }

    public function findByCancelFlag($string)
    {
        return Item::with('room.building', 'item_type', 'brand', 'user')->where('cancel_flag', $string)->get();
    }

    public function findByCode($code)
    {
        return Item::where([
            ['item_code', $code],
            ['cancel_flag', 'N'],
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

    public function setUser($user_id)
    {
        $this->user_id = $user_id;
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

    public function createNewItem($item_code, $item_name, $room_id, $type_id, $group, $brand_id, $serial_number, $model, $note)
    {
        $item = Item::firstOrCreate(
            ['item_code' => $item_code],
            [
                'item_name' => $item_name,
                'room_id' => $room_id,
                'type_id' => $type_id,
                'group' => $group,
                'brand_id' => $brand_id,
                'serial_number' => $serial_number,
                'model' => $model,
                'note' => $note,
                'cancel_flag' => 'N',
                'user_id' => 2,
            ]
        );

        //* when delete (chang cc_flag to y) and want to add same thing it will change cc_flg to n or return error (create duplicate)
        if (!$item->wasRecentlyCreated) {
            if ($item->cancel_flag == "Y") {
                $item->item_name = $item_name;
                $item->room_id = $room_id;
                $item->type_id = $type_id;
                $item->group = $group;
                $item->brand_id = $brand_id;
                $item->serial_number = $serial_number;
                $item->model = $model;
                $item->note = $note;
                $item->cancel_flag = "N";
                //todo set update by ตาม LDAP
                $item->user_id = 2;
                $item->save();
            } else {
                return true;
            }
        }
        return false;
    }

    public function updateItem($id, $item_name, $room_id, $type_id, $group,  $brand_id, $serial_number, $model, $note)
    {
        // $findName = Item::where('item_name', $item_name)->first();
        // if(is_null($findName) || $findName->item_id = $id) {
        $item = $this->findByID($id);
        $item->item_name = $item_name;
        $item->room_id = $room_id;
        $item->type_id = $type_id;
        $item->group = $group;
        $item->brand_id = $brand_id;
        $item->serial_number = $serial_number;
        $item->model = $model;
        $item->note = $note;
        $item->user_id = 2;
        $item->save();
        //todo set updateby ตาม LDAP
        return false;
        // }
        // return true;
    }

    public function setNullInItem($brand)
    {
        // * change brand in items
        $items = $brand->items;
        foreach ($brand->items as $item) {
            $item->brand_id = null;
            $item->user_id = 2;
            $item->save();
        }
        return $items;
    }

    public function deleteItem($item_id)
    {
        $item = $this->findByID($item_id);
        $item->setCancelFlag('Y');
        $item->user_id = 2;
        $item->save();
        return $item;
    }

    public function deleteItems($model, $data)
    {
        $collection = new Collection();
        switch ($model) {
            case 'room':
                $room = $data;
                $items = $room->items;
                foreach ($items as $item) {
                    $collection->push($item);
                    $item->cancel_flag = 'Y';
                    $item->user_id = 2;
                    $item->save();
                }
                break;
            case 'rooms':
                $rooms = $data;
                foreach ($rooms as $room) {
                    foreach ($room->items as $item) {
                        $collection->push($item);
                        $item->cancel_flag = 'Y';
                        $item->user_id = 2;
                        $item->save();
                    }
                }
                break;
            case 'item_type':
                $item_type = $data;
                $items = $item_type->items;
                foreach ($items as $item) {
                    $collection->push($item);
                    $item->cancel_flag = 'Y';
                    $item->user_id = 2;
                    $item->save();
                }
                break;
        }
        return $collection;
    }
}
