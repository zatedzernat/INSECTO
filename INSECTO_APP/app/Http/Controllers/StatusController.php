<?php

namespace App\Http\Controllers;

use App\Http\Models\Status;
use App\Http\Requests\StatusFormRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\MessageBag;

class StatusController extends Controller
{
    private $status;
    private $error;
    private $success;
    private $message;
    private $time;

    public function __construct()
    {
        $this->status = new Status();
        $this->error = false;
        $this->success = false;
        $this->time = Carbon::now()->format('H:i:s');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $statuses = $this->status->getAll();
        return compact('statuses');
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
            $this->error = true;
            $this->message = 'Add Duplicate Status Name';
        } else {
            $this->success = true;
            $this->message = 'Add Status \'' . $name . '\' Success';
        }
        return $this->serverResponse();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Http\Models\Status  $status
     * @return \Illuminate\Http\Response
     */
    public function show(Status $status)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Http\Models\Status  $status
     * @return \Illuminate\Http\Response
     */
    public function update(StatusFormRequest $request)
    {
        $errors = new MessageBag();
        //todo กดปุ่มedit แล้วเข้าไปแก้แต่ไม่ได้กดsave แต่กดปิดไป พอกดeditใหม่ ควรจะต้องขึ้นอันเดิมที่ยังไม่ได้แก้ เพราะเรายังไม่ได้เซฟ
        $id = $request->input('status_id');
        $status_name = $request->input('status_name');
        $status_description = $request->input('status_description');
        $updateFail = $this->status->updateStatus($id, $status_name, $status_description);
        if ($updateFail) {
            $this->error = true;
            $this->message = 'Edit duplicate status name!';
        } else {
            $this->success = true;
            $this->message = 'Update statue \'' . $status_name . '\' success';
        }
        return $this->serverResponse();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Http\Models\Status  $status
     * @return \Illuminate\Http\Response
     */
    public function destroy(Status $status, $status_id)
    {
        $status = $this->status->findByID($status_id);
        $name = $status->status_name;
        $status->delete();
        $this->message = 'Delete status \'' . $name . '\' success';
        $this->success = true;
        return $this->serverResponse();
    }

    public function serverResponse()
    {
        return response()->json([
            'error' => $this->error,
            'success' => $this->success,
            'message' => $this->message,
            'time' => $this->time
        ]);
    }
}
