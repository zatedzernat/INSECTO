<?php

namespace App\Http\Controllers;

use App\Http\Models\Item_Type;
use App\Http\Models\Problem_Description;
use App\Http\Requests\ProblemDescriptionFormRequest;
use Illuminate\Http\Request;
use Illuminate\Support\MessageBag;

class ProblemDescriptionController extends Controller
{

    private $problem_desc;
    private $type;

    public function __construct()
    {
        $this->middleware('auth');
        $this->problem_desc = new Problem_Description();
        $this->type = new Item_Type();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $problems_descs = $this->problem_desc->findByCancelFlag('N');
        $types = $this->type->findByCancelFlag('N');

        return view('type_desc.problem_descs')
            ->with(compact('problems_descs', 'types'));
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
    public function store(ProblemDescriptionFormRequest $request)
    {
        //todo check null or spacebar
        $errors = new MessageBag();
        $problem_description = $request->problem_description;
        $type_id = $request->type_id;
        $createFail = $this->problem_desc->createNewProblemDesc($problem_description, $type_id);
        if ($createFail) {
            $errors->add('dupProblem_Description', 'add duplicate problem description and type name');
        }
        return redirect()->route('problem_descs')->withErrors($errors);
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
    public function update(ProblemDescriptionFormRequest $request, Problem_Description $problem_desc)
    {
        $errors = new MessageBag();
        $id = $request->input('problem_des_id');
        $description = $request->input('problem_description');
        $type_id = $request->input('type_id');
        $updateSuccess = $this->problem_desc->updateProblemDesc($id, $description, $type_id);
        if (!$updateSuccess) {
            $errors->add('upDupProbDesc', 'Update duplicate problem description and type name');
        }
        return redirect()->route('problem_descs')->withErrors($errors);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Problem_Description  $problem_Description
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $problem_des_id)
    {
        $problem_desc = $this->problem_desc->deleteProblemDesc($problem_des_id);
        return redirect()->route('problem_descs')->with('del_problem_desc', 'Delete problem_descs \'' . $problem_desc->problem_description . '\' in ' . $problem_desc->item_type->type_name . ' type success');
    }
}
