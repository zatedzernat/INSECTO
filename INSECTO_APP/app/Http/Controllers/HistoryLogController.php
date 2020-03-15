<?php

namespace App\Http\Controllers;

use App\Http\Models\History_Log;

class HistoryLogController extends Controller
{
    private $log;

    public function __construct()
    {
        $this->middleware('auth');
        $this->log = new History_Log();
    }

    public function index()
    {
        $logs = $this->log->getAll();
        return view('history')
            ->with(compact('logs'));
    }
}
