<?php

namespace App\Http\Controllers;

use App\Http\Models\History_Log;
use App\Http\Models\Notification_Problem;
use App\Http\Models\Status;
use App\Http\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;

class HistoryLogController extends Controller
{
    private $log;

    public function __construct()
    {
        $this->log = new History_Log();
        $this->noti = new Notification_Problem();
        $this->user = new User();
        $this->status = new Status();
    }

    public function index()
    {
        $history_logs = $this->log->getAll();
        $countDays = $history_logs->count();
        $countPerDate = $this->log->countPerDate();
        $user = $this->user->getAll();
        return compact('history_logs', 'countDays', 'countPerDate', 'user');
    }

    public function getLogs($amount)
    {
        $logsByDays = $this->log->getLogsByAmountOfDays($amount);
        return compact('logsByDays');
    }

    public function getTracking($noti_id)
    {
        $noti_prob =  $this->noti->findByID($noti_id);
        $noti_trackings = $noti_prob->audits;
        // $noti_trackings = $this->log->getTrackingInSameDay($noti_trackings); //? can get tracking only in same day, why ???
        foreach ($noti_trackings as $noti_tracking) {
            $status_id = Arr::get($noti_tracking->new_values, 'status_id');
            $status_name = $this->status->findByID($status_id)->status_name;
            Arr::add($noti_tracking, 'status_name', $status_name);
        }
        $time = Carbon::now()->format('H:i:s');
        return compact('noti_trackings', 'time');
    }

    public function exportLogs(Request $request)
    {
        $from_date = $request->from_date;
        $to_date = $request->to_date;
        $logsExport = $this->log->exportLogs($from_date, $to_date);
        return  $logsExport;
    }

    public function serverResponse($error, $success)
    {
        $time = Carbon::now()->format('H:i:s');
        return response()->json([
            'errors' => $error,
            'success' => $success,
            'time' => $time
        ]);
    }
}
