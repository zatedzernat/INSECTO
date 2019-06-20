<?php

namespace App\Http\Controllers;

use App\Http\Models\Problem_Description;
use Illuminate\Http\Request;

class ProblemDescriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $problems_desc = Problem_Description::where('cancel_flag',"N")->get();

        return view('problem_des')
        ->with(compact('problems_desc'));
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
     * @param  \App\Problem_Description  $problem_Description
     * @return \Illuminate\Http\Response
     */
    public function show(Problem_Description $problem_Description)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Problem_Description  $problem_Description
     * @return \Illuminate\Http\Response
     */
    public function edit(Problem_Description $problem_Description)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Problem_Description  $problem_Description
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Problem_Description $problem_Description)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Problem_Description  $problem_Description
     * @return \Illuminate\Http\Response
     */
    public function destroy(Problem_Description $problem_Description)
    {
        //
    }
}
