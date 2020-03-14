<?php

namespace App\Http\Controllers;

use App\Http\Models\Item;
use App\Http\Models\Notification_Problem;
use App\Http\Models\Problem_Description;
use App\Http\Models\Status;
use App\Http\Requests\NotiUpdateFormRequest;
use App\Http\Requests\SendProblemRequest;
use Illuminate\Http\Request;
use Illuminate\Support\MessageBag;

class NotificationProblemController extends Controller
{

    private $noti_problem;
    private $item;
    private $problem_desc;
    private $status;

    public function __construct()
    {
        $this->noti_problem = new Notification_Problem();
        $this->item = new Item();
        $this->problem_desc = new Problem_Description();
        $this->status = new Status();
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
        return view('noti_problem.noti_problems')
            ->with(compact('noti_problems', 'statuses'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('noti_problem.send_problem');
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
        $problem_des_id = $request->problem_des_id;
        $problem_description = $request->problem_description;
        $sender_ip = $request->ip();

        if ($problem_des_id == "etc") {
            $problem_des_id = null;
        } else {
            $problem_description = $this->problem_desc->getProblemDescription($problem_des_id);
        }

        $this->noti_problem->create($item_id, $problem_des_id, $problem_description, $sender_ip);
        return redirect()->route('home')->with('status', 'Send Problem Success');
    }

    // check is it the same problem before store
    public function check(SendProblemRequest $request)
    {
        $item_id = $request->input('item_id');
        $problem_des_id = $request->input('problem_des_id');
        $problem_description = $request->input('problem_description');
        $noti_prob = $this->noti_problem->checkSameProblem($item_id, $problem_des_id);

        if ($noti_prob) {
            return view('checkProblem')->with(compact('noti_prob', 'problem_description'));
        } else {
            return $this->store($request);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Notification_Problem  $notification_Problem
     * @return \Illuminate\Http\Response
     */
    public function show($code)
    {
        $item = $this->item->findByCode($code);
        // dd($item);
        return view('noti_problem.send_problem')
            ->with('item', $item);
    }

    public function showproblemNotResolved($code)
    {
        $item = $this->item->findByCode($code);

        if (empty($item)) {
            $errors = new MessageBag();
            $errors->add('itemnotfound', 'Item Not Found');
            return redirect()->route('send')->withErrors($errors);
        } else {
            $problemsNotResolved = $this->noti_problem->findProblemNotResolvedByItemID($item->item_id);
            if ($problemsNotResolved->isEmpty()) {
                $this->show($item->item_code);
            } else {
                return view('itemproblemreport')
                    ->with(compact('item', 'problemsNotResolved'));
            }
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Notification_Problem  $notification_Problem
     * @return \Illuminate\Http\Response
     */
    public function edit(Notification_Problem $notification_Problem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Notification_Problem  $notification_Problem
     * @return \Illuminate\Http\Response
     */
    public function update(NotiUpdateFormRequest $request, $id)
    {
        // $errors = new MessageBag();
        $help_desk_code = $request->help_desk_code;
        $next_status = $request->next_status;
        $note = $request->note;
        $status = $this->noti_problem->checkStatus($next_status, $help_desk_code, $id, $note);
        return redirect()->route('noti_problems')
            ->with('changeComplete', 'change status to \'' . $status . '\' complete');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Notification_Problem  $notification_Problem
     * @return \Illuminate\Http\Response
     */
    public function destroy(Notification_Problem $notification_Problem)
    {
        //
    }
}
