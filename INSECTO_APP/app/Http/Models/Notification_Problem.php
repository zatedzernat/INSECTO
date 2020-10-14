<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class Notification_Problem extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    protected $fillable = ['item_id', 'status_id', 'problem_des_id', 'problem_description', 'service_desk_code', 'note', 'cancel_flag', 'user_id'];
    protected $primaryKey = 'noti_id';

    public function status()
    {
        return $this->belongsTo('App\Http\Models\Status', 'status_id');
    }

    public function item()
    {
        return $this->belongsTo('App\Http\Models\Item', 'item_id');
    }

    /*
     * name can not use problem_description
     * because it's same as column_name
     */
    public function problem_desc()
    {
        return $this->belongsTo('App\Http\Models\Problem_Description', 'problem_des_id');
    }

    public function user()
    {
        return $this->belongsTo('App\Http\Models\User', 'user_id', 'id');
    }

    public function findByCancelFlag($string)
    {
        return Notification_Problem::where('cancel_flag', $string)->get();
    }

    public function getAll()
    {
        return Notification_Problem::with('item.room.building', 'status', 'user')->orderBy('created_at', 'desc')->get();
    }

    public function findByID($id)
    {
        return Notification_Problem::where('noti_id', $id)->first();
    }

    public function findProblemsNotResolvedByItemID($item_id)
    {
        return Notification_Problem::with('item', 'status')->where([
            ['item_id', $item_id],
            ['status_id', '<>', 8], //status_id = 8 = resolved
        ])
            ->orderBy('updated_at', 'desc')
            ->get();
    }

    public function findProblemsThatCanSendByItemID($item)
    {

        // * Admin need all problemThatCanSend and need to show duplicate send (modal or page)
        $problemsCanSend = Problem_Description::findByTypeID($item->type_id, 'N');
        // $sentProblemsID = Notification_Problem::where([
        //     ['item_id', $item->item_id],
        //     ['status_id', '<>', 8], //status_id = 8 = resolved
        // ])->pluck('problem_des_id');

        // $problemsCanSend = Problem_Description::findByTypeID($item->type_id, 'N')->whereNotIn('problem_des_id', $sentProblemsID);
        return $problemsCanSend;
    }

    public function findProblemsNotResolvedInRoomByItems($items)
    {
        $all_items_id = $items->pluck('item_id');
        $problemsNotResolved =  Notification_Problem::with('item', 'status')
            ->whereIn('item_id', $all_items_id)
            ->where([
                ['status_id', '<>', 8], //status_id = 8 = resolved
            ])
            ->orderBy('updated_at', 'desc')
            ->get();
        $rejected =  $problemsNotResolved
            ->reject(function ($noti_prob) {
                return $noti_prob->item->group == 'N';
            });
        $result = $rejected->values(); // get out of wrap
        return $result;
    }

    public function isDuplicateProblem($item_id, $problem_des_id)
    {
        $isDuplicated = Notification_Problem::where([
            ['item_id', $item_id],
            ['problem_des_id', $problem_des_id],
            ['status_id', '<>', 8], //status_id = 8 = resolved
        ])->exists();
        return $isDuplicated;
    }

    public function create($item_id, $problem_des_id, $problem_description)
    {
        $this->item_id = $item_id;
        $this->status_id = 1;
        $this->problem_des_id = $problem_des_id;
        $this->problem_description = $problem_description;
        $this->cancel_flag = 'N';
        $this->user_id = 6; //problem sender
        $this->save();
    }

    public function checkStatus($noti_id, $next_status_id, $service_desk_code, $note)
    {
        $noti_prob = $this->findByID($noti_id);
        if ($noti_prob) {
            if ($next_status_id == 2 || $next_status_id == 7) { // status_id = 2 = open
                $status = $this->openTask($noti_prob, $service_desk_code);
                return $status;
            } else if ($next_status_id == 8) { // status_id = 8 = resolved
                $status = $this->resolvedTask($noti_prob, $note);
                return $status;
            } else {
                $status = $this->changeStatus($noti_prob, $next_status_id);
                return $status;
            }
        }
    }

    public function openTask($noti_prob, $service_desk_code)
    {
        $noti_prob->service_desk_code = $service_desk_code;
        if ($noti_prob->note) {
            $noti_prob->status_id = 7; // status_id = 7 = reopen
            $status = 'reopen';
        } else {
            $noti_prob->status_id = 2; // status_id = 2 = open
            $status = 'open';
        }
        $noti_prob->user_id = 2;
        $noti_prob->save();
        return $status;
    }

    public function changeStatus($noti_prob, $next_status_id)
    {
        switch ($next_status_id) {
            case 3: // status_id = 3 = on hold
                $noti_prob->status_id = $next_status_id;
                $status = 'on hold';
                break;
            case 4: // status_id = 4 = queue
                $noti_prob->status_id = $next_status_id;
                $status = 'queue';
                break;
            case 5: // status_id = 5 = in progress
                $noti_prob->status_id = $next_status_id;
                $status = 'in progress';
                break;
        }
        $noti_prob->user_id = 2;
        $noti_prob->save();
        return $status;
    }

    public function resolvedTask($noti_prob, $note)
    {
        $noti_prob->note = $note;
        $noti_prob->status_id = 8; //status_id = 8 = resolved
        $noti_prob->user_id = 2;
        $noti_prob->save();
        return 'resolved';
    }
}
