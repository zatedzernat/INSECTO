<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use OwenIt\Auditing\Models\Audit;

class HistoryLogController extends Controller
{
    public function index()
    {
        $a = Audit::all();
        $b = json_decode($a);
        return $b;
    }
}
