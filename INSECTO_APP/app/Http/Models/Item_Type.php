<?php

namespace App\Http\Models;

use App\Exports\ItemTypesExport;
use App\Imports\ItemTypesImport;
use Illuminate\Database\Eloquent\Model;
use DB;
use Illuminate\Support\Arr;
use Maatwebsite\Excel\Exceptions\SheetNotFoundException;
use Maatwebsite\Excel\Facades\Excel;
use OwenIt\Auditing\Contracts\Auditable;

class Item_Type extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    protected $fillable = ['type_name', 'cancel_flag', 'user_id'];
    protected $primaryKey = 'type_id';

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

    public function problem_descriptions()
    {
        return $this->hasMany('App\Http\Models\Problem_Description', 'type_id', 'type_id');
    }

    public function items()
    {
        return $this->hasMany('App\Http\Models\Item', 'type_id', 'type_id');
    }

    public function user()
    {
        return $this->belongsTo('App\Http\Models\User', 'user_id', 'id');
    }

    public function countItemTypes()
    {
        return $this->getALL()->count();
    }

    public function findByCancelFlag($string)
    {
        return Item_Type::with('user')->where('cancel_flag', $string)->get();
    }

    public function findByID($int)
    {
        return Item_Type::where('type_id', $int)->first();
    }

    public function getALL()
    {
        return Item_Type::all();
    }

    public function setName($name)
    {
        $this->type_name = $name;
    }

    public function setUser($user_id)
    {
        $this->user_id = $user_id;
    }

    public function setCancelFlag($cancelFlag)
    {
        $this->cancel_flag = $cancelFlag;
    }

    public function createNewItemType($type_name)
    {
        $itemtype = Item_Type::firstOrCreate(
            ['type_name' => $type_name],
            ['cancel_flag' => 'N', 'user_id' => 1]
        );

        //* when delete (chang cc_flag to y) and want to add same thing it will change cc_flg to n or return error (create duplicate)
        if (!$itemtype->wasRecentlyCreated) {
            if ($itemtype->cancel_flag == "Y") {
                //todo set update by ตาม LDAP
                $itemtype->user_id = 2;
                $itemtype->cancel_flag = "N";
                $itemtype->save();
            } else {
                return true;
            }
        }
        return false;
    }

    public function updateItemType($type_id, $name)
    {
        $findName = Item_Type::where('type_name', $name)->first();

        if (is_null($findName) || $findName->type_id == $type_id) {
            $itemtype = $this->findByID($type_id);
            $itemtype->type_name = $name;
            $itemtype->user_id = 2;
            $itemtype->save();
            return false;
        }
        return true;
    }

    public function deleteItemType($type_id)
    {
        $item_type = $this->findByID($type_id);
        $item_type->cancel_flag = 'Y';
        $item_type->user_id = 2;
        $item_type->save();
        return $item_type;
    }

    public function importItemTypes($file)
    {
        try {
            $import = new ItemTypesImport();
            $import->onlySheets('Item_Types');
            $duplicated = $this->checkDuplicateImport($import, $file);
            if ($duplicated->isEmpty()) {
                Excel::import($import, $file);
                $success = 'Import data of item types success';
                return array(true, $success);
            } else {
                $error =  'Can not insert these duplicate type name: (' . implode(", ", $duplicated->toArray()) . ')';
                return array(false, $error);
            }
        } catch (SheetNotFoundException $ex) {
            $error =  'Please name your sheetname to \'Item_Types\'';
            return array(false, $error);
        }
    }

    public function checkDuplicateImport($import, $file)
    {
        $import_array = Excel::toArray($import, $file);
        $types = array();
        foreach ($import_array as $array) {
            $types = $array;
        }
        $all_types_name = Arr::pluck($types, 'type_name');
        $duplicated = Item_Type::whereIn('type_name', $all_types_name)->get();
        $duplicated_codes = $duplicated->pluck('type_name');
        return $duplicated_codes;
    }

    public function exportItemTypes($all_types_id)
    {
        $item_types = Item_Type::find($all_types_id);
        if ($item_types->isEmpty()) {
            $error =  'Please add item type before export';
            return array(false, $error);
        } else {
            $itemTypesExport =  Excel::download(new ItemTypesExport($item_types), 'item_types.xlsx');
            return array(true, $itemTypesExport);
        }
    }
}
