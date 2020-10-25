<?php

namespace App\Http\Controllers;

use App\Http\Models\Item;
use App\Http\Models\Item_Type;
use App\Http\Models\Problem_Description;
use App\Http\Requests\ImportRequest;
use App\Http\Requests\ItemTypeFormRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ItemTypeController extends Controller
{

    private $item_type;
    private $item;
    private $problem_desc;

    public function __construct()
    {
        $this->item_type = new Item_Type();
        $this->item = new Item();
        $this->problem_desc = new Problem_Description();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $item_types = $this->item_type->findByCancelFlag('N');
        $countItemTypes = $this->item_type->countItemTypes();
        return compact('item_types', 'countItemTypes');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ItemTypeFormRequest $request)
    {
        $user_id = $request->header('user_id');
        $name = $request->type_name;
        $createFail = $this->item_type->createNewItemType($name, $user_id);
        if ($createFail) {
            $error = 'Add Duplicate Type Name';
            return  $this->serverResponse($error, null);
        } else {
            $success = 'Add Type \'' . $name . '\' Success';
            return  $this->serverResponse(null, $success);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Http\Models\Item_Type  $item_Type
     * @return \Illuminate\Http\Response
     */
    public function show(Item_Type $item_Type)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Http\Models\Item_Type  $item_Type
     * @return \Illuminate\Http\Response
     */
    public function update(ItemTypeFormRequest $request, $type_id)
    {
        $user_id = $request->header('user_id');
        $id = $request->input('type_id');
        $name = $request->input('type_name');
        $updateFail = $this->item_type->updateItemType($id, $name, $user_id);
        if ($updateFail) {
            $error = 'Edit duplicate type name';
            return  $this->serverResponse($error, null);
        } else {
            $success =  'Update type \'' . $name . '\' success';
            return  $this->serverResponse(null, $success);
        }
    }

    public function deleteOne(Request $request, $type_id)
    {
        $user_id = $request->header('user_id');
        $deleted = $this->delete($type_id, $user_id);
        $success = 'Delete type \'' . $deleted . '\' success';
        return $this->serverResponse(null, $success);
    }

    public function deleteMultiple(Request $request)
    {
        $user_id = $request->header('user_id');
        $item_types = $request->item_types;
        $name = array();
        foreach ($item_types as $type_id) {
            $deleted = $this->delete($type_id, $user_id);
            array_push($name, $deleted);
        }
        $success = 'Delete types \'' . implode(", ", $name) . '\' success';
        return $this->serverResponse(null, $success);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Http\Models\Item_Type  $item_Type
     * @return \Illuminate\Http\Response
     */
    public function delete($type_id, $user_id)
    {
        $item_type = $this->item_type->deleteItemType($type_id, $user_id);
        $items = $this->item->deleteItems('item_type', $item_type, $user_id);
        $problem_desc = $this->problem_desc->deleteProblemDescs($item_type);
        $deleted = $item_type->type_name;
        return $deleted;
    }

    public function importItemTypes(ImportRequest $request)
    {
        $file = $request->file('import_file');
        $isSuccess = $this->item_type->importItemTypes($file);
        if ($isSuccess[0]) {
            return  $this->serverResponse(null, $isSuccess[1]);
        } else
            return  $this->serverResponse($isSuccess[1], null);
    }

    public function exportItemTypes(Request $request)
    {
        $all_types_id = $request->item_types;
        $isSuccess = $this->item_type->exportItemTypes($all_types_id);
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
