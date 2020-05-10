<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use OwenIt\Auditing\Contracts\Auditable;

class Problem_Description extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    protected $fillable = ['problem_description', 'type_id', 'cancel_flag', 'user_id'];
    protected $primaryKey = 'problem_des_id';

    /**
     * {@inheritdoc}
     */
    public function transformAudit(array $data): array
    {
        if (Arr::has($data['old_values'], 'cancel_flag') and Arr::has($data['new_values'], 'cancel_flag')) {
            if ($data['old_values']['cancel_flag'] == 'N' and $data['new_values']['cancel_flag'] == 'Y') {
                $data['event'] = 'deleted';
            } elseif ($data['old_values']['cancel_flag'] == 'Y' and $data['new_values']['cancel_flag'] == 'N') {
                $data['event'] = 'restored';
            }
        }

        return $data;
    }

    public function item_type()
    {
        return $this->belongsTo('App\Http\Models\Item_type', 'type_id');
    }

    public function notification_problems()
    {
        return $this->hasMany('App\Http\Models\Notification_Problem', 'problem_des_id', 'problem_des_id');
    }

    public function user()
    {
        return $this->belongsTo('App\Http\Models\User', 'user_id', 'id');
    }

    public function findByCancelFlag($string)
    {
        return Problem_Description::with('item_type')->where('cancel_flag', $string)->get();
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

    public function setUser($user_id)
    {
        $this->user_id = $user_id;
    }

    public function createNewProblemDesc($problem_description, $type_id)
    {
        $problem_desc = Problem_Description::firstOrCreate(
            ['problem_description' => $problem_description, 'type_id' => $type_id],
            ['cancel_flag' => 'N', 'user_id' => 2]
        );

        //* when delete (chang cc_flag to y) and want to add same thing it will change cc_flg to n or return error (create duplicate)
        if (!$problem_desc->wasRecentlyCreated) {
            if ($problem_desc->cancel_flag == "Y") {
                //todo set update by ตาม LDAP
                $problem_desc->cancel_flag = "N";
                $problem_desc->user_id = 2;
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

        if (is_null($findDescAndType) || $findDescAndType->problem_des_id == $problem_des_id) {
            $prob_desc = $this->findByID($problem_des_id);
            $prob_desc->problem_description = $desc;
            $prob_desc->type_id = $type_id;
            //todo set updateby ตาม LDAP
            $prob_desc->user_id = 2;
            $prob_desc->save();
            return false;
        }
        return true;
    }

    public function deleteProblemDesc($problem_des_id)
    {
        $problem_desc = $this->findByID($problem_des_id);
        $problem_desc->setCancelFlag('Y');
        $problem_desc->user_id = 2;
        $problem_desc->save();
        return $problem_desc;
    }

    public function deleteProblemDescs($item_type)
    {
        $problem_descs = $item_type->problem_descriptions;
        foreach ($problem_descs as $problem_desc) {
            $problem_desc->cancel_flag = 'Y';
            $problem_desc->user_id = 2;
            $problem_desc->save();
        }
        return $problem_descs;
    }
}
