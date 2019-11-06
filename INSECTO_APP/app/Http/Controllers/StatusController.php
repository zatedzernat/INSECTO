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
        $boolean = $this->status->createNewStatus($name);
        if ($boolean) {
            $errors->add('dupStatus','Already have this status!!!');
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
        //todo กดปุ่มedit แล้วเข้าไปแก้แต่ไม่ได้กดsave แต่กดปิดไป พอกดeditใหม่ ควรจะต้องขึ้นอันเดิมที่ยังไม่ได้แก้ เพราะเรายังไม่ได้เซฟ
        $id = $request->input('status_id');
        $newStatus = $request->input('status_name');
        $status = $this->status->findByID($id);
        $status->setName($newStatus);
        //todo set updateby ตาม LDAP
        // $brand->setUpdateBy('ชื่อ user ตามLDAP');
        $status->save();

        return redirect()->route('statuses');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Status  $status
     * @return \Illuminate\Http\Response
     */
    public function destroy(Status $status, $status_id)
    {
        //todo ถ้าผูกอยู่กับอันย่อย ๆ เช่น มี item_type air แล้วกดลบ มันไม่ควรกดได้ ต้องทำให้เช็คว่ามีข้อมูลถูกผูกอยู่ไหม
        // * not real delete but change cancel flag to Y
        $status = $this->status->findByID($status_id);
        $name = $status->status_name;
        $status->delete();
        return redirect()->route('statuses')->with('del_status', 'Delete status ' . $name . ' success');
    }
}
