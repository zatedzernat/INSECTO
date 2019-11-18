<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Problem_Description extends Model
{
    protected $fillable = ['problem_description', 'type_id', 'cancel_flag', 'update_by'];
    protected $primaryKey = 'problem_des_id';

    public function item_type()
    {
        return $this->belongsTo('App\Http\Models\Item_type', 'type_id');
    }

    public function notification_problems()
    {
        return $this->hasMany('App\Http\Models\Notification_Problem', 'problem_des_id', 'problem_des_id');
    }

    public function findByCancelFlag($string)
    {
        return Problem_Description::where('cancel_flag', $string)->get();
    }

    public function findByID($problem_des_id)
    {
        return Problem_Description::find($problem_des_id);
    }

    public function getProblemDescription($problem_des_id)
    {
        $problem_desc = Problem_Description::find($problem_des_id);
        return $problem_desc->problem_description;
    }

    public function setProblemDescription($problem_description)
    {
        $this->problem_description = $problem_description;
    }

    public function setTypeId($type_id)
    {
        $this->type_id = $type_id;
    }

    public function setCancelFlag($CancelFlag)
    {
        $this->cancel_flag = $CancelFlag;
    }

    public function setUpdateBy($updateby)
    {
        $this->update_by = $updateby;
    }

    public function createNewProblemDesc($problem_description, $type_id)
    {
        $problem_desc = Problem_Description::firstOrCreate(
            ['problem_description' => $problem_description, 'type_id' => $type_id],
            ['cancel_flag' => 'N', 'update_by' => 'ชื่อ user ตามLDAP']
        );

        //* when delete (chang cc_flag to y) and want to add same thing it will change cc_flg to n or return error (create duplicate)
        if (!$problem_desc->wasRecentlyCreated) {
            if ($problem_desc->cancel_flag == "Y") {
                //todo set update by ตาม LDAP
                $problem_desc->cancel_flag = "N";
                $problem_desc->save();
            } else {
                return true;
            }
        }
        return false;

    }

    public function updateProblemDesc($problem_des_id, $desc, $type_id)
    {
        $findDescAndType = Problem_Description::where([
            ['problem_description', $desc],
            ['type_id', $type_id],
        ])->first();

        if ($findDescAndType->problem_des_id == $problem_des_id || is_null($findDescAndType)) {
            $prob_desc = $this->findByID($problem_des_id);
            $prob_desc->problem_description = $desc;
            $prob_desc->type_id = $type_id;
            $prob_desc->save();
            return true;
        }
        //todo set updateby ตาม LDAP
        // $brand->setUpdateBy('ชื่อ user ตามLDAP');
        return false;

    }
}
