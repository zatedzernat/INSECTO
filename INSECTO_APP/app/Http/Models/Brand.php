<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    protected $fillable = ['brand_name','cancel_flag','update_by'];
    protected $primaryKey = 'brand_id';

    public function items() {
        return $this->hasMany('App\Http\Models\Item','brand_id','brand_id');
    }

    public function findByCancelFlag($string) {
        return Brand::where('cancel_flag',$string)->get();
    }

    public function findByName($string) {
        $brands = DB::table('brands')
                    ->where('brand_name','like','%'.$string.'%')
                    ->get();
        return $brands; 
    }

    public function findByID($int) {
        return Brand::where('brand_id',$int)->get();
    }
}
