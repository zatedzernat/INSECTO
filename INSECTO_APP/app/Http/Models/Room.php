<?php

namespace App\Http\Models;

use App\Exports\RoomsExport;
use App\Imports\RoomsImport;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Exceptions\SheetNotFoundException;
use Maatwebsite\Excel\Facades\Excel;
use OwenIt\Auditing\Contracts\Auditable;
use QrCode;
use ZanySoft\Zip\Zip;

class Room extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    protected $fillable = ['room_code', 'room_name', 'building_id', 'cancel_flag', 'user_id'];
    protected $primaryKey = 'room_id';

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

    public function building()
    {
        return $this->belongsTo('App\Http\Models\Building', 'building_id');
    }

    public function items()
    {
        return $this->hasMany('App\Http\Models\Item', 'room_id', 'room_id');
    }

    public function user()
    {
        return $this->belongsTo('App\Http\Models\User', 'user_id', 'id');
    }

    public function countRooms()
    {
        return $this->getALL()->count();
    }

    public static function findByCancelFlag($string)
    {
        return Room::with('building', 'user')->where('cancel_flag', $string)->get();
    }

    public function findByCode($code)
    {
        return Room::with('building')->where([
            ['room_code', $code],
            ['cancel_flag', 'N'],
        ])->first();
    }

    public function findByID($int)
    {
        return room::where('room_id', $int)->first();
    }

    public function getALL()
    {
        return Room::all();
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

    public function setUser($user_id)
    {
        $this->user_id = $user_id;
    }

    public function createNewRoom($room_name, $room_code, $building_id, $user_id)
    {
        $room = Room::firstOrCreate(
            ['room_code' => $room_code],
            ['room_name' => $room_name, 'building_id' => $building_id, 'cancel_flag' => 'N', 'user_id' => $user_id]
        );

        //* when delete (chang cc_flag to y) and want to add same thing it will change cc_flg to n or return error (create duplicate)
        if (!$room->wasRecentlyCreated) {
            if ($room->cancel_flag == "Y") {
                //todo set update by ตาม LDAP
                $room->room_name = $room_name;
                $room->building_id = $building_id;
                $room->cancel_flag = "N";
                $room->user_id = $user_id;
                $room->save();
            } else {
                return true;
            }
        }
        return false;
    }

    public function updateRoom($id, $room_name, $building_id, $user_id)
    {

        $room = $this->findByID($id);
        $room->room_name = $room_name;
        $room->building_id = $building_id;
        $room->user_id = $user_id;
        $room->save();
        //todo set updateby ตาม LDAP

        return true;
    }

    public function deleteRoom($room_id, $user_id)
    {
        $room = $this->findByID($room_id);
        $room->setCancelFlag('Y');
        $room->user_id = $user_id;
        $room->save();
        return $room;
    }

    public function deleteRooms($building, $user_id)
    {
        $rooms = $building->rooms;
        foreach ($rooms as $room) {
            $room->cancel_flag = 'Y';
            $room->user_id = $user_id;
            $room->save();
        }
        return $rooms;
    }

    public function getRoomQRCode($room_code, $urlQR)
    {
        $qrcode = QrCode::format('png')->size(200)->margin(1)->generate($urlQR);
        $fileName = $room_code . '.png';
        Storage::disk('local')->put($fileName, $qrcode);
        return $fileName;
    }

    public function getSelectedQRCodeZIP($urlRoot, $all_rooms_id)
    {
        $rooms = Room::find($all_rooms_id);

        if ($rooms !== null) {
            $zipFileName = 'Rooms-QRcode.zip';
            $zip = Zip::create($zipFileName);

            foreach ($rooms as $room) {
                // Storage::disk('local')->makeDirectory($room->room_code);
                $urlQR = $urlRoot . "/sendproblem/room/" . $room->room_code;
                $qrcode = QrCode::format('png')->size(200)->margin(1)->generate($urlQR);
                $fileName = $room->room_code . '.png';
                Storage::disk('local')->put($fileName, $qrcode);

                if (strpos($room->room_code, "/") === false) { // find / in room code do not want to add IT/101, IT/102
                    $zip->add(storage_path('app/' . $room->room_code . '.png'));
                }
            }

            $zip->close();

            foreach ($rooms as $room) {
                Storage::disk('local')->delete($room->room_code . '.png');
            }
        } else {
            $zipFileName = null;
        }

        return $zipFileName;
    }

    public function importRooms($file)
    {
        try {
            $import = new RoomsImport();
            $import->onlySheets('Rooms');
            $duplicated = $this->checkDuplicateImport($import, $file);
            if ($duplicated->isEmpty()) {
                Excel::import($import, $file);
                $success = 'Import data of rooms success';
                return array(true, $success);
            } else {
                $error =  'Can not insert these duplicate room code: (' . implode(", ", $duplicated->toArray()) . ')';
                return array(false, $error);
            }
        } catch (SheetNotFoundException $ex) {
            $error =  'Please name your sheetname to \'Rooms\'';
            return array(false, $error);
        }
    }

    public function checkDuplicateImport($import, $file)
    {
        $import_array = Excel::toArray($import, $file);
        $rooms = array();
        foreach ($import_array as $array) {
            $rooms = $array;
        }
        $all_rooms_code = Arr::pluck($rooms, 'room_code');
        $duplicated = Room::whereIn('room_code', $all_rooms_code)->get();
        $duplicated_codes = $duplicated->pluck('room_code');
        return $duplicated_codes;
    }

    public function exportRooms($all_rooms_id)
    {
        $rooms = Room::find($all_rooms_id);
        if ($rooms->isEmpty()) {
            $error =  'Please add room before export';
            return array(false, $error);
        } else {
            $roomsExport =  Excel::download(new RoomsExport($rooms), 'items.xlsx');
            return array(true, $roomsExport);
        }
    }
}
