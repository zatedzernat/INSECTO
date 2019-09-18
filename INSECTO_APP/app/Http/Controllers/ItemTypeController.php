<?php

namespace App\Http\Controllers;

use App\Http\Models\Item_Type;
use Illuminate\Http\Request;

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
    public function store(Request $request)
    {
        //
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
    public function update(Request $request, Item_Type $item_Type)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Item_Type  $item_Type
     * @return \Illuminate\Http\Response
     */
    public function destroy(Item_Type $item_Type)
    {
        //
    }
}
