<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class History_Log extends Model
{
    protected $fillable = ['transaction_id', 'action_id', 'table_name', 'column_name', 'old_data', 'old_data', 'new_data', 'note', 'user'];
    protected $primaryKey = 'log_id';
    public $timestamps = false;

    public function action()
    {
        return $this->belongsTo('App\Http\Models\Action', 'action_id');
    }

    public function getAll()
    {
        return History_Log::all();
    }

}
