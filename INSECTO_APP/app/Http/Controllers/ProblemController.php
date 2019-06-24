<?php

namespace App\Http\Controllers;

use App\Http\Models\Problem;
use Illuminate\Http\Request;
use App\Http\Models\Item;
use Carbon\Carbon;
use App\Http\Models\Problem_Description;
use App\Http\Models\Problem_Detail;

class ProblemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // return view('problem.index');
        return view('problem.create');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create($id)
    {
        $item = Item::find($id);

        if (empty($item)) {
            $problems_det = null;
            $hasItem = false;
        } else {
            //for reject problem_detail that cancel flag === 'Y'
            $problems_det = $item->problem_details;
            $problems_det = $problems_det->reject(function ($problem_det) {
                return $problem_det->cancel_flag == "Y";
            });
            // foreach($problems_det as $problem_det) {
            //     $rs = $problem_det->problem_descriptions->problem_des;
            //     echo $rs." ";
            // }
            $hasItem = true;
        }
        return view('problem.create')
            ->with('item', $item)
            ->with('hasItem', $hasItem)
            ->with(compact('problems_det'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'room_name' => 'required',
            'floor' => 'required',
            'item_id' => 'required',
            'item_name' => 'required',
            //problem_detail_id
            //problem_des
        ]);

        $problem_detail_id = $request->input('problem_detail_id');
        if ($problem_detail_id == "etc") {
            $request->validate([
                'problem_description' => 'required'
            ]);
            // will create new problem_detail (set cancel_falg to Y) and problem_description
            $problem_des = new Problem_Description([
                'problem_des' => $request->input('problem_description'),
                'cancel_flag' => "N"
            ]);

            $problem_des->save();
            $problem_des_id = $problem_des->problem_des_id;

            $problem_det = new Problem_Detail([
                'item_id' => $request->input('item_id'),
                'problem_des_id' => $problem_des_id,
                'cancel_flag' => "Y"
            ]);

            $problem_det->save();
            $problem_detail_id = $problem_det->problem_detail_id;
            $problem = new Problem([
                'problem_date' => Carbon::now()->toDateTime(),
                'problem_detail_id' => $problem_detail_id,
                'problem_status' => "waiting",
                'cancel_flag' => "N"
            ]);
            $problem->save();
        } else {
            $problem = new Problem([
                'problem_date' => Carbon::now()->toDateTime(),
                'problem_detail_id' => $problem_detail_id,
                'problem_status' => "waiting",
                'cancel_flag' => "N"
            ]);

            $problem->save();
        }
        return redirect('/')
            ->with('status', 'send problem success');
    }

    /**
     * Display the specified resource.
     *
     * @param  App\Http\Models\Problem  $problem
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $problems = Problem::where('cancel_flag', "N")->get();
        return view('problem.problems')
            ->with(compact('problems'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Problem  $problem
     * @return \Illuminate\Http\Response
     */
    public function edit(Problem $problem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Problem  $problem
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Problem $problem)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Problem  $problem
     * @return \Illuminate\Http\Response
     */
    public function destroy(Problem $problem)
    {
        //
    }
}
