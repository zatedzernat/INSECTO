<?php

namespace App\Http\Controllers;

use App\Http\Models\Item;
use App\Http\Models\Item_Type;
use App\Http\Models\Problem_Description;
use App\Http\Requests\ItemTypeFormRequest;
use Illuminate\Http\Request;
use Illuminate\Support\MessageBag;

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
        return $item_types;
        /* return view('type_desc.item_types')
            ->with(compact('item_types')); */
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ItemTypeFormRequest $request)
    {
        $errors = new MessageBag();
        $name = $request->type_name;
        $createFail = $this->item_type->createNewItemType($name);
        if ($createFail) {
            $errors->add('dupItemType', 'Already have this ItemType!!!');
        }
        return redirect()->route('item_types')->withErrors($errors);
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
    public function update(ItemTypeFormRequest $request)
    {
        $errors = new MessageBag();
        //todo กดปุ่มedit แล้วเข้าไปแก้แต่ไม่ได้กดsave แต่กดปิดไป พอกดeditใหม่ ควรจะต้องขึ้นอันเดิมที่ยังไม่ได้แก้ เพราะเรายังไม่ได้เซฟ
        $id = $request->input('type_id');
        $name = $request->input('type_name');
        $updateSuccess = $this->item_type->updateItemType($id, $name);
        if (!$updateSuccess) {
            $errors->add('upDupItemType', 'Duplicate Type Name!!!');
        }
        //todo set update_by ตาม LDAP
        // $temType->setUpdateBy('ชื่อ user ตามLDAP');
        return redirect()->route('item_types')->withErrors($errors);
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
        return redirect()->route('item_types')->with('del_itemType', 'Delete type ' . $item_type->type_name . ' success');
    }
}
