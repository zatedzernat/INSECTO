<?php

namespace App\Http\Controllers;

use App\Http\Models\Item;
use App\Http\Models\Item_Type;
use App\Http\Models\Problem_Description;
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
        return compact('item_types');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ItemTypeFormRequest $request)
    {
        $name = $request->type_name;
        $createFail = $this->item_type->createNewItemType($name);
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
        $id = $request->input('type_id');
        $name = $request->input('type_name');
        $updateFail = $this->item_type->updateItemType($id, $name);
        if ($updateFail) {
            $error = 'Edit duplicate type name';
            return  $this->serverResponse($error, null);
        } else {
            $success =  'Update type \'' . $name . '\' success';
            return  $this->serverResponse(null, $success);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Http\Models\Item_Type  $item_Type
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $type_id)
    {
        $item_type = $this->item_type->deleteItemType($type_id);
        $items = $this->item->deleteItems('item_type', $item_type);
        $problem_desc = $this->problem_desc->deleteProblemDescs($item_type);
        $success = 'Delete type \'' . $item_type->type_name . '\' success';
        return $this->serverResponse(null, $success);
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
