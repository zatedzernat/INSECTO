<?php

namespace App\Http\Controllers;

use App\Http\Models\Problem_Description;
use App\Http\Models\Item_Type;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Requests\ProblemDescriptionFormRequest;

class ProblemDescriptionController extends Controller
{

    private $problem_desc;
    private $type;
    private $error;
    private $success;
    private $message;
    private $time;

    public function __construct()
    {
        $this->problem_desc = new Problem_Description();
        $this->type = new Item_Type();
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
        $problems_descs = $this->problem_desc->findByCancelFlag('N');
        $types = $this->type->findByCancelFlag('N');
        return compact('problem_descs', 'types');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProblemDescriptionFormRequest $request)
    {
        $problem_description = $request->problem_description;
        $type_id = $request->type_id;
        $createFail = $this->problem_desc->createNewProblemDesc($problem_description, $type_id);
        if ($createFail) {
            $this->error = true;
            $this->message = 'Add Duplicate Problem Description and Type';
        } else {
            $this->success = true;
            $this->message = 'Add Problem \'' . $problem_description . '\' Success';
        }
        return  $this->serverResponse();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Http\Models\Problem_Description  $problem_Description
     * @return \Illuminate\Http\Response
     */
    public function show(Problem_Description $problem_Description)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Http\Models\Problem_Description  $problem_Description
     * @return \Illuminate\Http\Response
     */
    public function update(ProblemDescriptionFormRequest $request, $problem_des_id)
    {
        $id = $request->input('problem_des_id');
        $description = $request->input('problem_description');
        $type_id = $request->input('type_id');
        $updateFail = $this->problem_desc->updateProblemDesc($id, $description, $type_id);
        if ($updateFail) {
            $this->error = true;
            $this->message = 'Edit duplicate description and type';
        } else {
            $this->success = true;
            $this->message = 'Update description \'' . $description . '\' success';
        }
        return  $this->serverResponse();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Http\Models\Problem_Description  $problem_Description
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $problem_des_id)
    {
        $problem_desc = $this->problem_desc->deleteProblemDesc($problem_des_id);
        $this->message = 'Delete description \'' . $problem_desc->problem_description . '\' success';
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
