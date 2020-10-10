<?php

namespace App\Http\Controllers;

use App\Http\Models\Problem_Description;
use App\Http\Models\Item_Type;
use App\Http\Requests\ImportRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Requests\ProblemDescriptionFormRequest;

class ProblemDescriptionController extends Controller
{

    private $problem_desc;
    private $type;

    public function __construct()
    {
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
        $problem_descs = $this->problem_desc->findByCancelFlag('N');
        $countProblemDescs = $this->problem_desc->countProblemDescs();
        $types = $this->type->findByCancelFlag('N');
        return compact('problem_descs', 'types', 'countProblemDescs');
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
            $error =  'Add Duplicate Problem Description and Type';
            return  $this->serverResponse($error, null);
        } else {
            $success = 'Add Problem \'' . $problem_description . '\' Success';
            return  $this->serverResponse(null, $success);
        }
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
            $error = 'Edit duplicate description and type';
            return  $this->serverResponse($error, null);
        } else {
            $success = 'Update description \'' . $description . '\' success';
            return  $this->serverResponse(null, $success);
        }
    }

    public function deleteOne(Request $request, $problem_des_id)
    {
        $deleted = $this->delete($problem_des_id);
        $success = 'Delete description \'' . $deleted . '\' success';
        return $this->serverResponse(null, $success);
    }

    public function deleteMultiple(Request $request)
    {
        $problem_descs = $request->problem_descs;
        $description = array();
        foreach ($problem_descs as $problem_des_id) {
            $deleted = $this->delete($problem_des_id);
            array_push($description, $deleted);
        }
        $success = 'Delete descriptions \'' . implode(", ", $description) . '\' success';
        return $this->serverResponse(null, $success);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Http\Models\Problem_Description  $problem_Description
     * @return \Illuminate\Http\Response
     */
    public function delete($problem_des_id)
    {
        $problem_desc = $this->problem_desc->deleteProblemDesc($problem_des_id);
        $deleted = $problem_desc->problem_description;
        return $deleted;
    }

    public function importProblemDescs(ImportRequest $request)
    {
        $file = $request->file('import_file');
        $isSuccess = $this->problem_desc->importProblemDescs($file);
        if ($isSuccess[0]) {
            return  $this->serverResponse(null, $isSuccess[1]);
        } else
            return  $this->serverResponse($isSuccess[1], null);
    }

    public function exportProblemDescs()
    {
        $isSuccess = $this->problem_desc->exportProblemDescs();
        if ($isSuccess[0]) {
            return $isSuccess[1];
        } else
            return  $this->serverResponse($isSuccess[1], null);
    }

    public function serverResponse($error, $success)
    {
        $time = Carbon::now()->format('H:i:s');
        return response()->json([
            'errors' => $error,
            'success' => $success,
            'time' => $time
        ]);
    }
}
