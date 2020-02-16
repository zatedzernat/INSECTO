<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use OwenIt\Auditing\Models\Audit;

class HistoryLogController extends Controller
{
    public function index() 
    {
        $a = Audit::find(4);
        // dd($a);
        // dd($a->getMetadata());
        // dd($a->getModified());
        // $b = json_decode($a);
        // dd($a->new_values);
        // dd($b->new_values->brand_name);
    }
}
