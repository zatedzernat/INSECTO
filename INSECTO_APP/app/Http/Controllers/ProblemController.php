<?php

namespace App\Http\Controllers;

use App\Http\Models\Problem;
use Illuminate\Http\Request;
use App\Http\Models\Item;
use Carbon\Carbon;

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
            $hasItem = false;
        } else {
            $hasItem = true;
        }
        return view('problem.create')
            ->with('item', $item)
            ->with('hasItem', $hasItem);
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
            dd(555);
        }else {
            $problem = new Problem([
                'problem_date' => Carbon::now()->toDateTime(),
                'problem_detail_id' => $problem_detail_id,
                'problem_status' => "waiting",
                'cancel_flag' => "N"          
            ]);

            $problem->save();

            return redirect('/')
            ->with('status','send problem success');

        }
    }

    /**
     * Display the specified resource.
     *
     * @param  App\Http\Models\Problem  $problem
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $problems = Problem::where('cancel_flag',"N")->get();
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
