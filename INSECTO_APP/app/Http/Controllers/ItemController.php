<?php

namespace App\Http\Controllers;

use App\Http\Models\Brand;
use App\Http\Models\Item;
use App\Http\Models\Room;
use App\Http\Models\Item_Type;
use Illuminate\Http\Request;

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
        //todo check null or spacebar
        $errors = new MessageBag();
        $item = $request->newItem;
        //? เวลาลบ (change cancel flag) จะไม่สามารถ add ได้ ใช่หรอ?
        //todo ควรเปลี่ยน cancel_flag row นั้นๆ เป็น N
        $addItem = $this->item->createNewBrand($item);
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
    public function update(Request $request, Item $item)
    {
        //
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
