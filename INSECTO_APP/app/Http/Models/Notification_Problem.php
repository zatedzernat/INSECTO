<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Notification_Problem extends Model
{
    protected $fillable = ['item_id', 'status_id', 'problem_des_id', 'problem_description', 'help_desk_code', 'sender_ip', 'cancel_flag', 'updated_by'];
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

    public function findByCancelFlag($string)
    {
        return Notification_Problem::where('cancel_flag', $string)->get();
    }

    public function getAll()
    {
        return Notification_Problem::all();
    }

    public function create($item_id, $problem_des_id, $problem_description, $sender_ip)
    {
        $this->item_id = $item_id;
        $this->status_id = 1;
        $this->problem_des_id = $problem_des_id;
        $this->problem_description = $problem_description;
        $this->sender_ip = $sender_ip;
        $this->cancel_flag = 'N';
        $this->update_by = "std";
    }
}
