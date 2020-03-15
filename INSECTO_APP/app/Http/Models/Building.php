<?php

namespace App\Http\Models;

use DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use OwenIt\Auditing\Contracts\Auditable;

class Building extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    protected $fillable = ['building_code', 'building_name', 'cancel_flag', 'update_by'];
    protected $primaryKey = 'building_id';

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

    public function rooms()
    {
        return $this->hasMany('App\Http\Models\Room', 'building_id', 'building_id');
    }

    public function findByCancelFlag($string)
    {
        return Building::where('cancel_flag', $string)->get();
    }

    public function findByName($string)
    {
        $buildings = DB::table('buildings')
            ->where('building_name', 'like', '%' . $string . '%')
            ->first();
        return $buildings;
    }

    public function findByID($int)
    {
        return Building::where('building_id', $int)->first();
    }

    public function setName($name)
    {
        $this->building_name = $name;
    }

    public function setCode($code)
    {
        $this->building_code = $code;
    }

    public function setCancelFlag($CancelFlag)
    {
        $this->cancel_flag = $CancelFlag;
    }

    public function setUpdateBy($updateby)
    {
        $this->update_by = $updateby;
    }

    public function getRooms($building_id)
    {
        $rooms = $this->findByID($building_id)->rooms;
        return $rooms;
    }

    public function createNewBuilding($building_code, $building_name)
    {
        $building = Building::firstOrCreate(
            ['building_code' => $building_code],
            ['building_name' => $building_name, 'cancel_flag' => 'N', 'update_by' => 'ชื่อ user ตามLDAP']
        );

        //* when delete (chang cc_flag to y) and want to add same thing it will change cc_flg to n or return error (create duplicate)
        if (!$building->wasRecentlyCreated) {
            if ($building->cancel_flag == "Y") {
                //todo set update by ตาม LDAP
                $building->building_name = $building_name;
                $building->cancel_flag = "N";
                $building->save();
            } else {
                return true;
            }
        }
        return false;
    }

    public function updateBuilding($building_id, $name)
    {
        $findName = Building::where('building_name', $name)->first();

        if (is_null($findName) || $findName->building_id == $building_id) {
            $building = $this->findByID($building_id);
            $building->building_name = $name;
            $building->save();
            return true;
        }
        return false;
    }

    public function deleteBuilding($building_id)
    {
        $building = $this->findByID($building_id);
        $building->setCancelFlag('Y');
        $building->save();
        return $building;
    }
}
