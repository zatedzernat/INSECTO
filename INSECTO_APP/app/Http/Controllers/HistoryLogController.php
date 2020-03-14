<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use OwenIt\Auditing\Models\Audit;

class HistoryLogController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    public function index()
    {

        // $a = Audit::find(1);
        $a = Audit::all();
        // dd($a); //! อ่านไทยไม่ได้
        // dd($a->getMetadata()); //* อ่านเกี่ยวกับการ audit
        // dd($a->getModified()); //* อ่านไทยได้ 1 ตัว
        $b = json_decode($a); //* อ่านไทยได้หลายตัว
        return $b;
        // dd($a->new_values); //* อ่านไทยได้ 1 ตัว
        // dd($b->new_values->brand_name); //* อ่านไทยได้ 1 ตัว
    }
}
