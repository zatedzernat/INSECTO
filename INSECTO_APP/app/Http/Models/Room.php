<?php

namespace App\Http\Models;

use DB;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $fillable = ['room_code', 'room_name', 'building_id', 'cancel_flag', 'update_by'];
    protected $primaryKey = 'room_id';

    public function building()
    {
        return $this->belongsTo('App\Http\Models\Building', 'building_id');
    }

    public function items()
    {
        return $this->hasMany('App\Http\Models\Items', 'room_id', 'room_id');
    }

    public function findByCancelFlag($string)
    {
        return Room::where('cancel_flag', $string)->get();
    }

    public function findByName($string)
    {
        $rooms = DB::table('rooms')
            ->where('room_name', 'like', '%' . $string . '%')
            ->first();
        return $rooms;
    }

    public function findByID($int)
    {
        return room::where('room_id', $int)->first();
    }

    public function setName($name)
    {
        $this->room_name = $name;
    }

    public function setCode($code)
    {
        $this->room_code = $code;
    }

    public function setBuilding($building_id)
    {
        $this->building_id = $building_id;
    }

    public function setCancelFlag($CancelFlag)
    {
        $this->cancel_flag = $CancelFlag;
    }

    public function setUpdateBy($updateby)
    {
        $this->update_by = $updateby;
    }

    public function createNewRoom($room_name, $room_code, $building_id)
    {
        $room = Room::firstOrCreate(
            ['room_code' => $room_code],
            ['room_name' => $room_name, 'building_id' => $building_id, 'cancel_flag' => 'N', 'update_by' => 'ชื่อ user ตามLDAP']
        );

        //* when delete (chang cc_flag to y) and want to add same thing it will change cc_flg to n or return error (create duplicate)
        if (!$room->wasRecentlyCreated) {
            if ($room->cancel_flag == "Y") {
                //todo set update by ตาม LDAP
                $room->room_name = $room_name;
                $room->building_id = $building_id;
                $room->cancel_flag = "N";
                $room->save();
            } else {
                return true;
            }
        }
        return false;

    }

    public function updateRoom($id, $room_name, $building_id)
    {

        $room = $this->findByID($id);
        $room->room_name = $room_name;
        $room->building_id = $building_id;
        $room->save();
        //todo set updateby ตาม LDAP

        return true;
    }

    public function deleteRoom($room_id)
    {
        // * not real delete but change cancel flag to Y
        $room = $this->findByID($room_id);
        $room->setCancelFlag('Y');
        $room->save();

        // * change cancel_flag in items
        $items = DB::table('items')
            ->where('room_id', $room_id)
            ->update(['cancel_flag' => 'Y']);

        return $room;
    }
}
