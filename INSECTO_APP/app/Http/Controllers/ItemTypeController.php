<?php

namespace App\Http\Controllers;

use App\Http\Models\Item_Type;
use App\Http\Requests\ItemTypeFormRequest;
use Illuminate\Http\Request;
use Illuminate\Support\MessageBag;

class ItemTypeController extends Controller
{

    private $item_type;

    public function __construct()
    {
        $this->item_type = new Item_Type();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $item_types = $this->item_type->findByCancelFlag('N');
        return view('type_desc.item_types')
            ->with(compact('item_types'));
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
    public function store(ItemTypeFormRequest $request)
    {
        //todo check null or spacebar
        $errors = new MessageBag();
        $name = $request->newItemType;
        $boolean = $this->item_type->createNewItemType($name);
        if ($boolean) {
            $errors->add('dupItemType', 'Already have this ItemType!!!');
        }
        return redirect()->route('item_types')->withErrors($errors);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Item_Type  $item_Type
     * @return \Illuminate\Http\Response
     */
    public function show(Item_Type $item_Type)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Item_Type  $item_Type
     * @return \Illuminate\Http\Response
     */
    public function edit(Item_Type $item_Type)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Item_Type  $item_Type
     * @return \Illuminate\Http\Response
     */
    public function update(ItemTypeFormRequest $request)
    {
        $errors = new MessageBag();
        //todo กดปุ่มedit แล้วเข้าไปแก้แต่ไม่ได้กดsave แต่กดปิดไป พอกดeditใหม่ ควรจะต้องขึ้นอันเดิมที่ยังไม่ได้แก้ เพราะเรายังไม่ได้เซฟ
        $id = $request->input('type_id');
        $name = $request->input('type_name');
        $updateSuccess = $this->item_type->updateItemType($id, $name);
        if (!$updateSuccess) {
            $errors->add('upDupItemType','Duplicate Type Name!!!');
        }
        //todo set update_by ตาม LDAP
        // $temType->setUpdateBy('ชื่อ user ตามLDAP');
        return redirect()->route('item_types')->withErrors($errors);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Item_Type  $item_Type
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $type_id)
    {
        //todo ถ้าผูกอยู่กับอันย่อย ๆ เช่น มี item_type air แล้วกดลบ มันไม่ควรกดได้ ต้องทำให้เช็คว่ามีข้อมูลถูกผูกอยู่ไหม
        // * not real delete but change cancel flag to Y
        $itemType = $this->item_type->findByID($type_id);
        $itemType->setCancelFlag('Y');
        $itemType->save();
        return redirect()->route('item_types')->with('del_itemType', 'Delete itemType ' . $itemType->type_name . ' success');
    }
}
