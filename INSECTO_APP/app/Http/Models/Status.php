<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    protected $fillable = ['status_name', 'status_description'];
    protected $primaryKey = 'status_id';

    public function Notification_Problems()
    {
        return $this->hasMany('App\Http\Models\Notification_Problem', 'status_id', 'status_id');
    }

    public function findByID($int)
    {
        return Status::where('status_id', $int)->first();
    }

    public function getAll()
    {
        return Status::all();
    }

    public function setName($name)
    {
        $this->status_name = $name;
    }

    public function setDescription($description)
    {
        $this->status_description = $description;
    }

    public function createNewStatus($status_name, $status_description)
    {
        $status = Status::firstOrCreate(
            ['status_name' => $status_name],
            ['status_description' => $status_description]
        );

        if (!$status->wasRecentlyCreated) {
            return true;
        }

        return false;
    }

    public function updateStatus($status_id, $status_name, $status_description)
    {
        $findName = Status::where('status_name', $status_name)->first();

        if (is_null($findName) || $findName->status_id == $status_id) {
            $status = $this->findByID($status_id);
            $status->status_name = $status_name;
            $status->status_description = $status_description;
            //todo set updateby ตาม LDAP
            // $brand->setUpdateBy('ชื่อ user ตามLDAP');
            $status->save();
            return true;
        }
        return false;
    }

}
