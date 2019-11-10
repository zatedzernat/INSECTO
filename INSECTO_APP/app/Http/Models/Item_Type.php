<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Item_Type extends Model
{
    //
    protected $fillable = ['type_name', 'cancel_flag', 'update_by'];
    protected $primaryKey = 'type_id';

    public function problem_descriptions()
    {
        return $this->hasMany('App\Http\Models\Problem_Description', 'type_id', 'type_id');
    }

    public function items()
    {
        return $this->hasMany('App\Http\Models\Items', 'type_id', 'type_id');
    }

    public function findByCancelFlag($string)
    {
        return Item_Type::where('cancel_flag', $string)->get();
    }

    public function findByID($int)
    {
        return Item_Type::where('type_id', $int)->first();
    }

    public function setName($name)
    {
        $this->type_name = $name;
    }

    public function setUpdateBy($updateby)
    {
        $this->update_by = $updateby;
    }

    public function setCancelFlag($cancelFlag)
    {
        $this->cancel_flag = $cancelFlag;
    }

    public function createNewItemType($type_name)
    {
        $itemtype = Item_Type::firstOrCreate(
            ['type_name' => $type_name],
            ['cancel_flag' => 'N', 'update_by' => 'ชื่อ user ตามLDAP']
        );

        //* when delete (chang cc_flag to y) and want to add same thing it will change cc_flg to n or return error (create duplicate)
        if (!$itemtype->wasRecentlyCreated) {
            if ($itemtype->cancel_flag == "Y") {
                //todo set update by ตาม LDAP
                $itemtype->cancel_flag = "N";
                $itemtype->save();
            } else {
                return true;
            }
        }
        return false;
    }

    public function updateItemType($id, $name)
    {
        $findName = Item_Type::where('type_name', $name)->first();

        if (is_null($findName)) {
            $itemtype = $this->findByID($id);
            $itemtype->type_name = $name;
            $itemtype->save();
            return true;
        }
        return false;
    }
}
