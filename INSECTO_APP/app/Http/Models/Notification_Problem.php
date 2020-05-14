<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class Notification_Problem extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    protected $fillable = ['item_id', 'status_id', 'problem_des_id', 'problem_description', 'help_desk_code', 'note', 'cancel_flag', 'user_id'];
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
        return Notification_Problem::with('item.room', 'status', 'user')->get();
    }

    public function findByID($id)
    {
        return Notification_Problem::where('noti_id', $id)->first();
    }

    public function findProblemsNotResolvedByItemID($item_id)
    {
        return Notification_Problem::where([
            ['item_id', $item_id],
            ['status_id', '<>', 6], //6 == closed
        ])->get();
    }

    public function findProblemsThatCanSendByItemID($item)
    {
        $sentProblemsID = Notification_Problem::where([
            ['item_id', $item->item_id],
            ['status_id', '<>', 6], // where status_id != 6 (closed task)
        ])->pluck('problem_des_id');

        $problemsCanSend = Problem_Description::findByTypeID($item->type_id, 'N')->whereNotIn('problem_des_id', $sentProblemsID);
        return $problemsCanSend;
    }

    public function create($item_id, $problem_des_id, $problem_description)
    {
        $this->item_id = $item_id;
        $this->status_id = 1;
        $this->problem_des_id = $problem_des_id;
        $this->problem_description = $problem_description;
        $this->cancel_flag = 'N';
        $this->user_id = 3;
        $this->save();
    }

    public function checkStatus($next_status, $help_desk_code, $id, $note)
    {
        $noti_prob = $this->findByID($id);
        if ($noti_prob) {
            if ($next_status == 'open') {
                $status = $this->openTask($help_desk_code, $noti_prob);
                return $status;
            } else if ($next_status == 'resolved') {
                $this->closeTask($note, $noti_prob);
                return 'resolved';
            } else {
                $status = $this->changeStatus($next_status, $noti_prob);
                return $status;
            }
        }
    }

    public function openTask($help_desk_code, $noti_prob)
    {
        $noti_prob->help_desk_code = $help_desk_code;
        if ($noti_prob->note) {
            $noti_prob->status_id = 7;
            $status = 'reopen';
        } else {
            $noti_prob->status_id = 2;
            $status = 'open';
        }
        $noti_prob->user_id = 3;
        $noti_prob->save();
        return $status;
    }

    public function changeStatus($next_status, $noti_prob)
    {
        switch ($next_status) {
            case 'on hold':
                $noti_prob->status_id = 3;
                $status = 'on hold';
                break;
            case 'queue':
                $noti_prob->status_id = 4;
                $status = 'queue';
                break;
            case 'in progress':
                $noti_prob->status_id = 5;
                $status = 'in progress';
                break;
        }
        $noti_prob->user_id = 2;
        $noti_prob->save();
        return $status;
    }

    public function closeTask($note, $noti_prob)
    {
        $noti_prob->note = $note;
        $noti_prob->status_id = 8;
        $noti_prob->user_id = 2;
        $noti_prob->save();
    }
}
