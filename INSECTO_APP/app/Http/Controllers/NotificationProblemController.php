<?php

namespace App\Http\Controllers;

use App\Http\Models\Item;
use App\Http\Models\Notification_Problem;
use App\Http\Models\Problem_Description;
use App\Http\Requests\SendProblemRequest;
use Illuminate\Http\Request;
use Illuminate\Support\MessageBag;

class NotificationProblemController extends Controller
{

    private $noti_problem;
    private $item;
    private $problem_desc;

    public function __construct()
    {
        $this->noti_problem = new Notification_Problem();
        $this->item = new Item();
        $this->problem_desc = new Problem_Description();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $noti_problems = $this->noti_problem->getAll();
        return view('noti_problem.noti_problems')
            ->with(compact('noti_problems'));
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
        $item_id = $request->input('item_id');
        $problem_des_id = $request->input('problem_des_id');
        $problem_description = $request->input('problem_description');

        if ($problem_des_id == "etc") {
            $problem_des_id = null;
        } else {
            $problem_description = $this->problem_desc->getProblemDescription($problem_des_id);
        }

        $this->noti_problem->create($item_id, $problem_des_id, $problem_description);
        $this->noti_problem->save();

        return redirect()->route('home')->with('status', 'Send Problem Success');
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

        if (empty($item)) {
            $errors = new MessageBag();
            $errors->add('itemnotfound', 'Item Not Found');
            return redirect()->route('send')->withErrors($errors);
        } else {
            return view('noti_problem.send_problem')
                ->with('item', $item);
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
    public function update(Request $request, Notification_Problem $notification_Problem)
    {
        //
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
