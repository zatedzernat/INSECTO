<?php

namespace App\Http\Controllers;

use App\Http\Models\Item;
use App\Http\Models\Notification_Problem;
use App\Http\Models\Problem_Description;
use App\Http\Models\Room;
use App\Http\Models\Status;
use App\Http\Requests\NotiUpdateFormRequest;
use App\Http\Requests\SendProblemRequest;
use Illuminate\Http\Request;
use Carbon\Carbon;

class NotificationProblemController extends Controller
{

    private $noti_problem;
    private $item;
    private $problem_desc;
    private $status;
    private $room;

    public function __construct()
    {
        $this->noti_problem = new Notification_Problem();
        $this->item = new Item();
        $this->problem_desc = new Problem_Description();
        $this->status = new Status();
        $this->room = new Room();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $noti_problems = $this->noti_problem->getAll();
        $statuses = $this->status->getAll();
        return compact('noti_problems', 'statuses');
    }

    public function showproblemNotResolved($item_code)
    {
        $item = $this->item->findByCode($item_code);

        if (empty($item)) {
            $error = "Item not found!";
            return $this->serverResponse($error, null);
        } else {
            $problemsNotResolved = $this->noti_problem->findProblemsNotResolvedByItemID($item->item_id);
            $problemsThatCanSend = $this->noti_problem->findProblemsThatCanSendByItemID($item);
            return compact('problemsNotResolved', 'item', 'problemsThatCanSend');
        }
    }

    public function showproblemNotResolvedInRoom($room_code)
    {
        $room = $this->room->findByCode($room_code);
        if (empty($room)) {
            $error = "Room not found!";
            return $this->serverResponse($error, null);
        } else {
            $problemsNotResolvedInRoom = $this->noti_problem->findProblemsNotResolvedInRoomByItems($room->items);
            $itemsGroupByType = $this->item->getItemsGroupByTypeName($room->items);
            return compact('room', 'problemsNotResolvedInRoom', 'itemsGroupByType');
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(SendProblemRequest $request)
    {
        $item_id = $request->item_id;
        $problem_des_id = $request->problem_des_id; //can be 'etc' (string) and id (integer)
        $problem_description = $request->problem_description;
        $image = $request->image;
        $filename = $request->filename;

        if ($problem_des_id == "etc") {
            $problem_des_id = null;
        } else {
            $problem_description = $this->problem_desc->getProblemDescription($problem_des_id);
            if ($this->noti_problem->isDuplicateProblem($item_id, $problem_des_id)) {
                $error = "ปัญหานี้ถูกแจ้งแล้ว! - " . $problem_description;
                return $this->serverResponse($error, null);
            }
        }

        $this->noti_problem->create($item_id, $problem_des_id, $problem_description, $filename, $image);

        $success =  "Send Problem Success";
        return $this->serverResponse(null, $success);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Http\Models\Notification_Problem  $notification_Problem
     * @return \Illuminate\Http\Response
     */
    public function update(NotiUpdateFormRequest $request, $noti_id)
    {
        $user_id = $request->header('user_id');
        if ($noti_id) {
            $next_status_id = $request->next_status_id;
            $service_desk_code = $request->service_desk_code;
            $note = $request->note;
            $status = $this->noti_problem->checkStatus($noti_id, $next_status_id, $service_desk_code, $note, $user_id);
            $success = 'change status to \'' . $status . '\' complete';
            return $this->serverResponse(null, $success);
        } else {
            $error = 'Noti ID is required!';
            return $this->serverResponse($error, null);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Http\Models\Notification_Problem  $notification_Problem
     * @return \Illuminate\Http\Response
     */
    public function destroy(Notification_Problem $notification_Problem)
    {
        //
    }

    public function exportNotiProbs(Request $request)
    {
        $all_noti_probs_id = $request->noti_probs;
        $isSuccess = $this->noti_problem->exportNotiProbs($all_noti_probs_id);
        if ($isSuccess[0]) {
            return $isSuccess[1];
        } else
            return  $this->serverResponse($isSuccess[1], null);
    }

    public function serverResponse($error, $success)
    {
        $time = Carbon::now()->format('H:i:s');
        return response()->json([
            'errors' => $error,
            'success' => $success,
            'time' => $time,
        ]);
    }
}
