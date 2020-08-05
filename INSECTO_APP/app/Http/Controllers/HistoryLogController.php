<?php

namespace App\Http\Controllers;

use App\Http\Models\History_Log;
use App\Http\Models\Notification_Problem;
use Carbon\Carbon;

class HistoryLogController extends Controller
{
    private $log;

    public function __construct()
    {
        $this->log = new History_Log();
        $this->noti = new Notification_Problem();
    }

    public function index()
    {
        $history_logs = $this->log->getAll();
        $countDays = $history_logs->count();
        $countPerDate = $this->log->countPerDate();
        return compact('history_logs', 'countDays', 'countPerDate');
    }

    public function getLogs($amount)
    {
        $logsByDays = $this->log->getLogsByAmountOfDays($amount);
        return compact('logsByDays');
    }

    public function getTracking($noti_id)
    {
        $noti_tracking = $this->noti->findByID($noti_id)->audits;
        $noti_tracking = $this->log->getTracking($noti_tracking); //3 days
        $time = Carbon::now()->format('H:i:s');
        return compact('noti_tracking', 'time');
    }
}
