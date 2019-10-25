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

    public function createNewItemType($newItemType)
    {
        $addItemType = Item_Type::firstOrCreate(
            ['type_name' => $newItemType],
            ['cancel_flag' => 'N',
                'update_by' => 'ชื่อ user ตามLDAP']
        );
        return $addItemType;
    }

    public function setCancelFlag($cancelFlag)
    {
        $this->cancel_flag = $cancelFlag;
    }
}
