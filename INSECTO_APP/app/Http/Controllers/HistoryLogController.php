<?php

namespace App\Http\Controllers;

use App\Http\Models\History_Log;

class HistoryLogController extends Controller
{
    private $log;

    public function __construct()
    {
        $this->log = new History_Log();
    }

    public function index()
    {
        $history_logs = $this->log->getAll();
        $countDays = $history_logs->count();
        $countPerDate = $this->log->countPerDate();
        return compact('history_logs', 'countDays', 'countPerDate');
    }
}
