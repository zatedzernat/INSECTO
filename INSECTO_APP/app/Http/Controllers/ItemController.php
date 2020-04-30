<?php

namespace App\Http\Controllers;

use App\Http\Models\Brand;
use App\Http\Models\Building;
use App\Http\Models\Item;
use App\Http\Models\Item_Type;
use App\Http\Models\Room;
use App\Http\Requests\ItemFormRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\MessageBag;

class ItemController extends Controller
{

    private $item;
    private $room;
    private $itemType;
    private $brand;
    private $building;
    private $error;
    private $success;
    private $message;
    private $time;

    public function __construct()
    {
        $this->item = new Item();
        $this->room = new Room();
        $this->itemType = new Item_Type();
        $this->brand = new Brand();
        $this->building = new Building();
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
        $buildings = $this->building->findByCancelFlag('N');

        return compact('items', 'rooms', 'itemTypes', 'brands', 'buildings');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ItemFormRequest $request)
    {
        $errors = new MessageBag();
        $itemCode = $request->item_code;
        $itemName = $request->item_name;
        $roomID = $request->room_id;
        $typeID = $request->item_type_id;
        $brand_id = $request->brand_id;
        $serial = $request->serial_number;
        $model = $request->item_model;
        $createFail = $this->item->createNewItem($itemCode, $itemName, $roomID, $typeID, $brand_id, $serial, $model);
        if ($createFail) {
            $this->error = true;
            $this->message = 'Add Duplicate Item Code';
        } else {
            $this->success = true;
            $this->message = 'Add Item \'' . $itemName . '\' Success';
        }
        $this->time = Carbon::now()->format('H:i:s');
        return response()->json([
            'error' => $this->error,
            'success' => $this->success,
            'message' => $this->message,
            'time' => $this->time
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Http\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function show(Item $item)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Http\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function update(ItemFormRequest $request/*, Item $item*/)
    {
        $errors = new MessageBag();
        //todo กดปุ่มedit แล้วเข้าไปแก้แต่ไม่ได้กดsave แต่กดปิดไป พอกดeditใหม่ ควรจะต้องขึ้นอันเดิมที่ยังไม่ได้แก้ เพราะเรายังไม่ได้เซฟ
        $id = $request->input('item_id');
        // $code = $request->input('item_code');
        $item_name = $request->input('item_name');
        $room_id = $request->input('room_id');
        $type_id = $request->input('item_type_id');
        $brand_id = $request->input('brand_id');
        $serial = $request->input('serial_number');
        $model = $request->input('item_model');
        $updateSuccess = $this->item->updateItem($id, $item_name, $room_id, $type_id, $brand_id, $serial, $model);

        return redirect()->route('items')->withErrors($errors);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Http\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $item_id)
    {
        $item = $this->item->deleteItem($item_id);
        return redirect()->route('items')->with('del_item', 'Delete item ' . $item->item_code . ' success');
    }
}
