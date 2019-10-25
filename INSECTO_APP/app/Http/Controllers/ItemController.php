<?php

namespace App\Http\Controllers;

use App\Http\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{

    private $item;

    public function __construct()
    {
        $this->item = new Item();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $items = $this->item->findByCancelFlag('N');
        return view('item.items')
            ->with(compact('items'));
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
        $item = $request->newItem;
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
        // * not real delete but change cancel flag to Y
        $item = $this->item->findByID($item_id);
        $item->setCancelFlag('Y');
        $item->save();
        return redirect()->route('items')->with('del_item', 'Delete item ' . $item->item_name . ' success');
    }
}
