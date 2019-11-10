<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Building extends Model
{

    protected $fillable = ['building_code', 'building_name', 'cancel_flag', 'update_by'];
    protected $primaryKey = 'building_id';

    public function items()
    {
        return $this->hasMany('App\Http\Models\Item', 'building_id', 'building_id');
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

    public function updateBuilding($id, $code, $name)
    {
        $findCode = Building::where('building_code', $code)->first();
        $findName = Building::where('building_name', $name)->first();

        if(is_null($findCode)) {
            if (is_null($findName)) {
                $building = $this->findByID($id);
                $building->building_code = $code;
                $building->building_name = $name;
                $building->save();
                return true;
            }
        }
        return false;
    }
}
