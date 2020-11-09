<?php

namespace App\Http\Models;

use App\Exports\NotificationProblemsExport;
use Exception;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
use OwenIt\Auditing\Contracts\Auditable;

class Notification_Problem extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    protected $fillable = ['item_id', 'status_id', 'problem_des_id', 'problem_description', 'service_desk_code', 'note', 'image_extension', 'cancel_flag', 'user_id'];
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

    public function create($item_id, $problem_des_id, $problem_description, $filename, $image)
    {
        try {
            $noti = new Notification_Problem();
            $noti->item_id = $item_id;
            $noti->status_id = 1;
            $noti->problem_des_id = $problem_des_id;
            $noti->problem_description = $problem_description;

            if ($filename) {
                $explode = explode('.', $filename);
                $image_extension = $explode[1];
                $noti->image_extension = $image_extension;
            }

            $noti->cancel_flag = 'N';
            $noti->user_id = 2; //problem sender
            $noti->save();

            if ($filename && $image) {
                $isExists = Storage::disk('public')->exists('//noti_prob');
                if (!($isExists)) {
                    $maked = Storage::disk('public')->makeDirectory('//noti_prob');
                }
                $noti_id = $noti->noti_id;
                $path = storage_path('app/public') . '/noti_prob/noti_' . $noti_id . '.' . $image_extension;
                $img = Image::make($image)->orientate()->save($path, 40);
                return null;
            }
        } catch (Exception $ex) {
            return $ex->getMessage();
        }
    }

    public function checkStatus($noti_id, $next_status_id, $service_desk_code, $note, $user_id)
    {
        $noti_prob = $this->findByID($noti_id);
        if ($noti_prob) {
            if ($next_status_id == 2 || $next_status_id == 7) { // status_id = 2 = open
                $status = $this->openTask($noti_prob, $service_desk_code, $user_id);
                return $status;
            } else if ($next_status_id == 8) { // status_id = 8 = resolved
                $status = $this->resolvedTask($noti_prob, $note, $user_id);
                return $status;
            } else {
                $status = $this->changeStatus($noti_prob, $next_status_id, $user_id);
                return $status;
            }
        }
    }

    public function openTask($noti_prob, $service_desk_code, $user_id)
    {
        $noti_prob->service_desk_code = $service_desk_code;
        if ($noti_prob->note) {
            $noti_prob->status_id = 7; // status_id = 7 = reopen
            $status = 'reopen';
        } else {
            $noti_prob->status_id = 2; // status_id = 2 = open
            $status = 'open';
        }
        $noti_prob->user_id = $user_id;
        $noti_prob->save();
        return $status;
    }

    public function changeStatus($noti_prob, $next_status_id, $user_id)
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
        $noti_prob->user_id = $user_id;
        $noti_prob->save();
        return $status;
    }

    public function resolvedTask($noti_prob, $note, $user_id)
    {
        $noti_prob->note = $note;
        $noti_prob->status_id = 8; //status_id = 8 = resolved
        $noti_prob->user_id = $user_id;
        $noti_prob->save();
        return 'resolved';
    }

    public function exportNotiProbs($all_noti_probs_id)
    {
        $noti_probs = Notification_Problem::find($all_noti_probs_id);
        if ($noti_probs->isEmpty()) {
            $error =  'No Notification Problems in record!';
            return array(false, $error);
        } else {
            $notiProbsExport =  Excel::download(new NotificationProblemsExport($noti_probs), 'Notification_Problems.xlsx');
            return array(true, $notiProbsExport);
        }
    }

    public function getImagePathFromNotiID($noti_id)
    {
        $noti = Notification_Problem::find($noti_id);
        $path = storage_path('app/public') . '/noti_prob/noti_' . $noti->noti_id . '.' . $noti->image_extension;
        return $path;
    }

    public function delImage($noti_id)
    {
        $noti = Notification_Problem::find($noti_id);

        $path = '/noti_prob/noti_' . $noti->noti_id . '.' . $noti->image_extension;
        $deleted = Storage::disk('public')->delete($path);

        $noti->image_extension = null;
        $noti->save();

        return true;
    }
}
