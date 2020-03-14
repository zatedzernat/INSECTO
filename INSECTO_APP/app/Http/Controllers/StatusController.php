<?php

namespace App\Http\Controllers;

use App\Http\Models\Status;
use App\Http\Requests\StatusFormRequest;
use Illuminate\Http\Request;
use Illuminate\Support\MessageBag;

class StatusController extends Controller
{
    private $status;

    public function __construct()
    {
        $this->middleware('auth');
        $this->status = new Status();
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $statuses = $this->status->getAll();
        return view('noti_problem.statuses')
            ->with(compact('statuses'));
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
    public function store(StatusFormRequest $request)
    {
        $errors = new MessageBag();
        $name = $request->status_name;
        $description = $request->status_description;
        $createFail = $this->status->createNewStatus($name, $description);
        if ($createFail) {
            $errors->add('dupStatus', 'Already have this status!!!');
        }
        return redirect()->route('statuses')->withErrors($errors);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Status  $status
     * @return \Illuminate\Http\Response
     */
    public function show(Status $status)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Status  $status
     * @return \Illuminate\Http\Response
     */
    public function edit(Status $status)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Status  $status
     * @return \Illuminate\Http\Response
     */
    public function update(StatusFormRequest $request)
    {
        $errors = new MessageBag();
        //todo กดปุ่มedit แล้วเข้าไปแก้แต่ไม่ได้กดsave แต่กดปิดไป พอกดeditใหม่ ควรจะต้องขึ้นอันเดิมที่ยังไม่ได้แก้ เพราะเรายังไม่ได้เซฟ
        $id = $request->input('status_id');
        $status_name = $request->input('status_name');
        $status_description = $request->input('status_description');
        $updateSuccess = $this->status->updateStatus($id, $status_name, $status_description);
        if (!$updateSuccess) {
            $errors->add('upDupStatus', 'Duplicate Status Name!!!');
        }
        return redirect()->route('statuses')->withErrors($errors);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Status  $status
     * @return \Illuminate\Http\Response
     */
    public function destroy(Status $status, $status_id)
    {
        // * not real delete but change cancel flag to Y
        $status = $this->status->findByID($status_id);
        $name = $status->status_name;
        $status->delete();
        return redirect()->route('statuses')->with('del_status', 'Delete status ' . $name . ' success');
    }
}
