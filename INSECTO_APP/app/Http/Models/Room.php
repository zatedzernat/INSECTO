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

    public function setName($name){
        $this->room_name = $name;
    }

    public function setCode($code){
        $this->room_code = $code;
    }

    public function setCancelFlag($CancelFlag)
    {
        $this->cancel_flag = $CancelFlag;
    }

    public function setUpdateBy($updateby)
    {
        $this->update_by = $updateby;
    }

    public function createNewRoom($name, $code){
        $addRoom = Room::firstOrCreate(
            ['room_code' => $code, 'room_name' => $name],
            ['cancel_flag' => 'N', 'update_by' => 'ชื่อ user ตามLDAP']
        );
        //! ยังไม่เสร็จโว้ย มันยังไม่ได้เชื่อมกับ building เลยจะแอดยังไม่ได้นะจ๊ะ
        return $addroom;

    }
}
