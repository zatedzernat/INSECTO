<?php

namespace App\Http\Controllers;

use App\Http\Models\Notification_Problem;
use Illuminate\Http\Request;

class NotificationProblemController extends Controller
{

    private $noti_problem;

    public function __construct()
    {
        $this->noti_problem = new Notification_Problem();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('noti_problem.send_problem');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Notification_Problem  $notification_Problem
     * @return \Illuminate\Http\Response
     */
    public function show(Notification_Problem $notification_Problem)
    {
        //
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
