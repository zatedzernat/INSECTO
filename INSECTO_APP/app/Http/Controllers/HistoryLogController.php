<?php

namespace App\Http\Controllers;

use App\Http\Models\History_Log;
use Illuminate\Http\Request;

class HistoryLogController extends Controller
{
    private $history;

    public function __construct()
    {
        $this->history = new History_Log();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $histories = $this->history->getAll();
        return view('history_logs')
        ->with(compact('histories'));
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
     * @param  \App\Http\Models\History_Log  $history_Log
     * @return \Illuminate\Http\Response
     */
    public function show(History_Log $history_Log)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Http\Models\History_Log  $history_Log
     * @return \Illuminate\Http\Response
     */
    public function edit(History_Log $history_Log)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Http\Models\History_Log  $history_Log
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, History_Log $history_Log)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Http\Models\History_Log  $history_Log
     * @return \Illuminate\Http\Response
     */
    public function destroy(History_Log $history_Log)
    {
        //
    }
}
