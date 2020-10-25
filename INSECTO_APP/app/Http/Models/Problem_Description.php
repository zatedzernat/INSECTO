<?php

namespace App\Http\Models;

use App\Exports\ProblemDescriptionsExport;
use App\Imports\ProblemDescriptionsImport;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Exceptions\SheetNotFoundException;
use Maatwebsite\Excel\Facades\Excel;
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

    public function countProblemDescs()
    {
        return $this->getALL()->count();
    }

    public static function findByCancelFlag($string)
    {
        return Problem_Description::with('item_type', 'user')->where('cancel_flag', $string)->get();
    }

    public function findByID($problem_des_id)
    {
        return Problem_Description::find($problem_des_id);
    }

    public static function findByTypeID($type_id, $cancel_flag)
    {
        return Problem_Description::where([
            ['type_id', $type_id],
            ['cancel_flag', $cancel_flag]
        ])->get();
    }

    public function getALL()
    {
        return Problem_Description::all();
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

    public function createNewProblemDesc($problem_description, $type_id, $user_id)
    {
        $problem_desc = Problem_Description::firstOrCreate(
            ['problem_description' => $problem_description, 'type_id' => $type_id],
            ['cancel_flag' => 'N', 'user_id' => $user_id]
        );

        //* when delete (chang cc_flag to y) and want to add same thing it will change cc_flg to n or return error (create duplicate)
        if (!$problem_desc->wasRecentlyCreated) {
            if ($problem_desc->cancel_flag == "Y") {
                $problem_desc->cancel_flag = "N";
                $problem_desc->user_id = $user_id;
                $problem_desc->save();
            } else {
                return true;
            }
        }
        return false;
    }

    public function updateProblemDesc($problem_des_id, $desc, $type_id, $user_id)
    {
        $findDescAndType = Problem_Description::where([
            ['problem_description', $desc],
            ['type_id', $type_id],
        ])->first();

        if (is_null($findDescAndType) || $findDescAndType->problem_des_id == $problem_des_id) {
            $prob_desc = $this->findByID($problem_des_id);
            $prob_desc->problem_description = $desc;
            $prob_desc->type_id = $type_id;
            $prob_desc->user_id = $user_id;
            $prob_desc->save();
            return false;
        }
        return true;
    }

    public function deleteProblemDesc($problem_des_id, $user_id)
    {
        $problem_desc = $this->findByID($problem_des_id);
        $problem_desc->setCancelFlag('Y');
        $problem_desc->user_id = $user_id;
        $problem_desc->save();
        return $problem_desc;
    }

    public function deleteProblemDescs($item_type, $user_id)
    {
        $problem_descs = $item_type->problem_descriptions;
        foreach ($problem_descs as $problem_desc) {
            $problem_desc->cancel_flag = 'Y';
            $problem_desc->user_id = $user_id;
            $problem_desc->save();
        }
        return $problem_descs;
    }

    public function importProblemDescs($file)
    {
        try {
            $import = new ProblemDescriptionsImport();
            $import->onlySheets('Problem_Descriptions');
            $duplicated = $this->checkDuplicateImport($import, $file);
            if ($duplicated->isEmpty()) {
                Excel::import($import, $file);
                $success = 'Import data of problem descriptions success';
                return array(true, $success);
            } else {
                $str_collection = $this->stringResult($duplicated->toArray());
                $error =  'Can not insert these duplicate Problem Description and Type: (' . implode(", ", $str_collection->toArray()) . ')';
                return array(false, $error);
            }
        } catch (SheetNotFoundException $ex) {
            $error =  'Please name your sheetname to \'Problem_Descriptions\'';
            return array(false, $error);
        }
    }

    public function checkDuplicateImport($import, $file)
    {
        $import_array = Excel::toArray($import, $file);
        $prob_descs = array();
        foreach ($import_array as $array) {
            $prob_descs = $array;
        }
        $all_probs = Arr::pluck($prob_descs, 'type_id', 'problem_description');
        $duplicated = new Collection();
        foreach ($all_probs as $problem_description => $type_id) {
            $prob_desc = Problem_Description::where([
                ['problem_description', $problem_description],
                ['type_id', $type_id],
            ])->first();
            if ($prob_desc !== null) {
                $duplicated->push($prob_desc);
            }
        }
        $duplicated = $duplicated->pluck('type_id', 'problem_description');
        return $duplicated;
    }

    public function stringResult($arrays)
    {
        $str_collection = new Collection();
        foreach ($arrays as $problem_description => $type_id) {
            $str_collection->push($problem_description . " - " . $type_id);
        }
        return $str_collection;
    }

    public function exportProblemDescs($all_problem_descs_id)
    {
        $prob_descs = Problem_Description::find($all_problem_descs_id);
        if ($prob_descs->isEmpty()) {
            $error =  'Please add problem description before export';
            return array(false, $error);
        } else {
            $ProblemDescriptionsExport =  Excel::download(new ProblemDescriptionsExport($prob_descs), 'problem_descriptions.xlsx');
            return array(true, $ProblemDescriptionsExport);
        }
    }
}
