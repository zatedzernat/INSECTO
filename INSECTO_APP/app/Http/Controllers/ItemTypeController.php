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
    private $error;
    private $success;
    private $message;
    private $time;

    public function __construct()
    {
        $this->item_type = new Item_Type();
        $this->item = new Item();
        $this->problem_desc = new Problem_Description();
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
            $this->error = true;
            $this->message = 'Add Duplicate Type Name';
        } else {
            $this->success = true;
            $this->message = 'Add Type \'' . $name . '\' Success';
        }
        return  $this->serverResponse();
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
            $this->error = true;
            $this->message = 'Edit duplicate type name';
        } else {
            $this->success = true;
            $this->message = 'Update type \'' . $name . '\' success';
        }
        return  $this->serverResponse();
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
        $this->message = 'Delete type \'' . $item_type->type_name . '\' success';
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
