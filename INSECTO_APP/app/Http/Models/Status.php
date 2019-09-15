<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    protected $fillable = ['status_id','status_name'];
    protected $primaryKey = 'status_id';
    public $incrementing = false;

    public function Notification_Problems() {
        return $this->hasMany('App\Http\Models\Notification_Problem','status_id','status_id');
    }

    public function findByID($int) {
        return Status::where('status_id',$int)->get();
    }

    public function getAll() {
        return Status::all();
    }

}
