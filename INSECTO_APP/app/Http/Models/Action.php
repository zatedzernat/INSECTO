<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Action extends Model
{
    protected $fillable = ['action_code', 'action_description'];
    protected $primaryKey = 'action_id';

    public function history_logs()
    {
        return $this->hasMany('App\Http\Models\History_Log', 'action_id', 'action_id');
    }

    public function getAll()
    {
        return Action::all();
    }
}
