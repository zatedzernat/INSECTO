<?php

namespace App\Http\Models;

use App\Exports\BuildingsExport;
use App\Imports\BuildingsImport;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Maatwebsite\Excel\Exceptions\SheetNotFoundException;
use Maatwebsite\Excel\Facades\Excel;
use OwenIt\Auditing\Contracts\Auditable;

class Building extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    protected $fillable = ['building_code', 'building_name', 'cancel_flag', 'user_id'];
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

    public function user()
    {
        return $this->belongsTo('App\Http\Models\User', 'user_id', 'id');
    }

    public function countBuildings()
    {
        return $this->getALL()->count();
    }

    public function findByCancelFlag($string)
    {
        return Building::with('user', 'rooms')->where('cancel_flag', $string)->get();
    }

    public function findByID($int)
    {
        return Building::where('building_id', $int)->first();
    }

    public function getALL()
    {
        return Building::all();
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

    public function setUser($user_id)
    {
        $this->user_id = $user_id;
    }

    public function createNewBuilding($building_code, $building_name, $user_id)
    {
        $building = Building::firstOrCreate(
            ['building_code' => $building_code],
            ['building_name' => $building_name, 'cancel_flag' => 'N', 'user_id' => $user_id]
        );

        //* when delete (chang cc_flag to y) and want to add same thing it will change cc_flg to n or return error (create duplicate)
        if (!$building->wasRecentlyCreated) {
            if ($building->cancel_flag == "Y") {
                $building->building_name = $building_name;
                $building->cancel_flag = "N";
                $building->user_id = $user_id;
                $building->save();
            } else {
                return true;
            }
        }
        return false;
    }

    public function updateBuilding($building_id, $name, $user_id)
    {
        $findName = Building::where('building_name', $name)->first();

        if (is_null($findName) || $findName->building_id == $building_id) {
            $building = $this->findByID($building_id);
            $building->building_name = $name;
            $building->user_id = $user_id;
            $building->save();
            return false;
        }
        return true;
    }

    public function deleteBuilding($building_id, $user_id)
    {
        $building = $this->findByID($building_id);
        $building->setCancelFlag('Y');
        $building->user_id = $user_id;
        $building->save();
        return $building;
    }

    public function importBuildings($file)
    {
        try {
            $import = new BuildingsImport();
            $import->onlySheets('Buildings');
            $duplicated = $this->checkDuplicateImport($import, $file);
            if ($duplicated->isEmpty()) {
                Excel::import($import, $file);
                $success = 'Import data of buildings success';
                return array(true, $success);
            } else {
                $error =  'Can not insert these duplicate building code: (' . implode(", ", $duplicated->toArray()) . ')';
                return array(false, $error);
            }
        } catch (SheetNotFoundException $ex) {
            $error =  'Please name your sheetname to \'Buildings\'';
            return array(false, $error);
        }
    }

    public function checkDuplicateImport($import, $file)
    {
        $import_array = Excel::toArray($import, $file);
        $buildings = array();
        foreach ($import_array as $array) {
            $buildings = $array;
        }
        $all_buildings_code = Arr::pluck($buildings, 'building_code');
        $duplicated = Building::whereIn('building_code', $all_buildings_code)->get();
        $duplicated_codes = $duplicated->pluck('building_code');
        return $duplicated_codes;
    }

    public function exportBuildings($all_buildings_id)
    {
        $buildings = Building::find($all_buildings_id);
        if ($buildings->isEmpty()) {
            $error =  'Please add building before export';
            return array(false, $error);
        } else {
            $buildingsExport =  Excel::download(new BuildingsExport($buildings), 'buildings.xlsx');
            return array(true, $buildingsExport);
        }
    }
}
