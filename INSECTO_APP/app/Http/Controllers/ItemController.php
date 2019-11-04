<?php

namespace App\Http\Controllers;

use App\Http\Models\Brand;
use App\Http\Models\Item;
use App\Http\Models\Room;
use App\Http\Models\Item_Type;
use Illuminate\Http\Request;
use Illuminate\Support\MessageBag;

class ItemController extends Controller
{

    private $item;
    private $room;
    private $itemType;
    private $brand;

    public function __construct()
    {
        $this->item = new Item();
        $this->room = new Room();
        $this->itemType = new Item_Type();
        $this->brand = new Brand();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $items = $this->item->findByCancelFlag('N');
        $rooms = $this->room->findByCancelFlag('N');
        $itemTypes = $this->itemType->findByCancelFlag('N');
        $brands = $this->brand->findByCancelFlag('N');

        return view('item.items')
            ->with(compact('items','rooms','itemTypes','brands'));
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
        $errors = new MessageBag();
        $itemCode = $request->item_code;
        $itemName = $request->item_name;
        $roomID = $request->room_id;
        $typeID = $request->item_type_id;
        $brandName = $request->brand_name;
        $serial = $request->serial_number;
        $model = $request->item_model;
        $addItem = $this->item->createNewItem($itemCode,$itemName,$roomID,$typeID,$brandName,$serial,$model);
        if (!$addItem->wasRecentlyCreated) {
            $errors->add('dupItem', 'Already have this Item!!!');
        }
        return redirect()->route('items')->withErrors($errors);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function show(Item $item)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function edit(Item $item)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request/*, Item $item*/)
    {
        $id = $request->input('item_id');
        $newCode = $request->input('item_code');
        $newItemName = $request->input('item_name');
        $newRoomID = $request->input('room_id');
        $newTypeID = $request->input('item_type_id');
        $newBrandID = $request->input('brand_id');
        $newSerial = $request->input('serial_number');
        $newModel = $request->input('item_model');
        $item = $this->item->findByID($id);
        // ? เวลาเปลี่ยนชื่อ code หรือ name ต้องเช็คค่าซ้ำไหม ?
        $item->setCode($newCode);
        $item->setItemName($newItemName);
        $item->setRoomID($newRoomID);
        $item->setTypeID($newTypeID);
        $item->setBrandID($newBrandID);
        $item->setSerial($newSerial);
        $item->setModel($newModel);
        // $item->setUpdateBy('ชื่อ user ตามLDAP');
        $item->save();
        
        return redirect()->route('items');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $item_id)
    {
        //todo ถ้าผูกอยู่กับอันย่อย ๆ เช่น มี item_type air แล้วกดลบ มันไม่ควรกดได้ ต้องทำให้เช็คว่ามีข้อมูลถูกผูกอยู่ไหมก่อน ถ้าไม่มีก็ลบได้
        // * not real delete but change cancel flag to Y
        $item = $this->item->findByID($item_id);
        $item->setCancelFlag('Y');
        $item->save();
        return redirect()->route('items')->with('del_item', 'Delete item ' . $item->item_name . ' success');
    }
}
