<?php

namespace App\Http\Models;

use App\Exports\BrandsExport;
use App\Imports\BrandsImport;
use Illuminate\Database\Eloquent\Model;
use DB;
use Illuminate\Support\Arr;
use Maatwebsite\Excel\Exceptions\SheetNotFoundException;
use Maatwebsite\Excel\Facades\Excel;
use OwenIt\Auditing\Contracts\Auditable;

class Brand extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    protected $fillable = ['brand_name', 'cancel_flag', 'user_id'];
    protected $primaryKey = 'brand_id';

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

    public function items()
    {
        return $this->hasMany('App\Http\Models\Item', 'brand_id', 'brand_id');
    }

    public function user()
    {
        return $this->belongsTo('App\Http\Models\User', 'user_id', 'id');
    }

    public function countBrands()
    {
        return $this->getALL()->count();
    }

    public function findByCancelFlag($string)
    {
        return Brand::with('user')->where('cancel_flag', $string)->get();
    }

    public function findByID($int)
    {
        return Brand::where('brand_id', $int)->first();
    }

    public function getALL()
    {
        return Brand::all();
    }

    public function setName($name)
    {
        $this->brand_name = $name;
    }

    public function setCancelFlag($CancelFlag)
    {
        $this->cancel_flag = $CancelFlag;
    }

    public function setUser($user_id)
    {
        $this->user_id = $user_id;
    }

    public function createNewBrand($brand_name, $user_id)
    {
        $brand = Brand::firstOrCreate(
            ['brand_name' => $brand_name],
            [
                'cancel_flag' => 'N',
                'user_id' => $user_id
            ]
        );

        //* when delete (chang cc_flag to y) and want to add same thing it will change cc_flg to n or return error (create duplicate)
        if (!$brand->wasRecentlyCreated) {
            if ($brand->cancel_flag == "Y") {
                //todo set update by ตาม LDAP
                $brand->cancel_flag = "N";
                $brand->user_id = $user_id;
                $brand->save();
            } else {
                return true;
            }
        }
        return false;
    }

    public function updateBrand($brand_id, $brand_name, $user_id)
    {
        $findName = Brand::where('brand_name', $brand_name)->first();
        if (is_null($findName) || $findName->brand_id == $brand_id) {
            $brand = $this->findByID($brand_id);
            $brand->brand_name = $brand_name;
            $brand->user_id = $user_id;
            $brand->save();
            return false;
        }
        //todo set updateby ตาม LDAP

        return true;
    }

    public function deleteBrand($brand_id, $user_id)
    {
        $brand = $this->findByID($brand_id);
        $brand->cancel_flag = 'Y';
        $brand->user_id = $user_id;
        $brand->save();
        return $brand;
    }

    public function importBrands($file)
    {
        try {
            $import = new BrandsImport();
            $import->onlySheets('Brands');
            $duplicated = $this->checkDuplicateImport($import, $file);
            if ($duplicated->isEmpty()) {
                Excel::import($import, $file);
                $success = 'Import data of brands success';
                return array(true, $success);
            } else {
                $error =  'Can not insert these duplicate brand name: (' . implode(", ", $duplicated->toArray()) . ')';
                return array(false, $error);
            }
        } catch (SheetNotFoundException $ex) {
            $error =  'Please name your sheetname to \'Brands\'';
            return array(false, $error);
        }
    }

    public function checkDuplicateImport($import, $file)
    {
        $import_array = Excel::toArray($import, $file);
        $brands = array();
        foreach ($import_array as $array) {
            $brands = $array;
        }
        $all_brands_name = Arr::pluck($brands, 'brand_name');
        $duplicated = Brand::whereIn('brand_name', $all_brands_name)->get();
        $duplicated_codes = $duplicated->pluck('brand_name');
        return $duplicated_codes;
    }

    public function exportBrands($all_brands_id)
    {
        $brands = Brand::find($all_brands_id);
        if ($brands->isEmpty()) {
            $error =  'Please add brand before export';
            return array(false, $error);
        } else {
            $BrandsExport =  Excel::download(new BrandsExport($brands), 'brands.xlsx');
            return array(true, $BrandsExport);
        }
    }
}
