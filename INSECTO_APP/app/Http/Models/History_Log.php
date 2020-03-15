<?php

namespace App\Http\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Models\Audit;

class History_Log extends Model
{
    public function getAll()
    {
        // $a = Audit::find(1); 
        // dd($a); //! อ่านไทยไม่ได้
        // dd($a->getMetadata()); //* อ่านเกี่ยวกับการ audit
        // dd($a->getModified()); //* อ่านไทยได้ 1 ตัว
        // $b = json_decode($a); //* อ่านไทยได้หลายตัว
        // return $b;
        // dd($a->new_values); //* อ่านไทยได้ 1 ตัว
        // dd($b->new_values->brand_name); //* อ่านไทยได้ 1 ตัว
        return Audit::all();
    }

    public function getUserAttribute()
    {
        return User::class();
    }
}
