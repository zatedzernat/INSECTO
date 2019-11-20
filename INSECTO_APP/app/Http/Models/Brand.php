<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    protected $fillable = ['brand_name', 'cancel_flag', 'update_by'];
    protected $primaryKey = 'brand_id';

    public function items()
    {
        return $this->hasMany('App\Http\Models\Item', 'brand_id', 'brand_id');
    }

    public function findByCancelFlag($string)
    {
        return Brand::where('cancel_flag', $string)->get();
    }

    public function findByName($string)
    {
        $brands = DB::table('brands')
            ->where('brand_name', 'like', '%' . $string . '%')
            ->first();
        return $brands;
    }

    public function findByID($int)
    {
        return Brand::where('brand_id', $int)->first();
    }

    public function setName($name)
    {
        $this->brand_name = $name;
    }

    public function setCancelFlag($CancelFlag)
    {
        $this->cancel_flag = $CancelFlag;
    }

    public function setUpdateBy($updateby)
    {
        $this->update_by = $updateby;
    }

    public function createNewBrand($brand_name)
    {
        $brand = Brand::firstOrCreate(
            ['brand_name' => $brand_name],
            ['cancel_flag' => 'N',
                'update_by' => 'ชื่อ user ตามLDAP']
        );

        //* when delete (chang cc_flag to y) and want to add same thing it will change cc_flg to n or return error (create duplicate)
        if (!$brand->wasRecentlyCreated) {
            if ($brand->cancel_flag == "Y") {
                //todo set update by ตาม LDAP
                $brand->cancel_flag = "N";
                $brand->save();
            } else {
                return true;
            }

        }
        return false;
    }

    public function updateBrand($brand_id, $brand_name)
    {
        $findName = Brand::where('brand_name', $brand_name)->first();
        // dd($findName);
        if (is_null($findName) || $findName->brand_id == $brand_id) {
            $brand = $this->findByID($brand_id);
            $brand->brand_name = $brand_name;
            $brand->save();
            return true;
        }
        //todo set updateby ตาม LDAP
        // $brand->setUpdateBy('ชื่อ user ตามLDAP');

        return false;
    }
}
