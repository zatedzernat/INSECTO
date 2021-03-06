<?php

namespace App\Http\Controllers;

use App\Http\Models\Brand;
use App\Http\Models\Building;
use App\Http\Models\Item;
use App\Http\Models\Item_Type;
use App\Http\Models\Room;
use App\Http\Requests\ImportRequest;
use App\Http\Requests\ItemFormRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ItemController extends Controller
{

    private $item;
    private $room;
    private $itemType;
    private $brand;
    private $building;

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
        $countItems = $this->item->countItems();
        $items = $this->item->findByCancelFlag('N');
        $rooms = $this->room->findByCancelFlag('N');
        $itemTypes = $this->itemType->findByCancelFlag('N');
        $brands = $this->brand->findByCancelFlag('N');
        $buildings = $this->building->findByCancelFlag('N');

        return compact('countItems', 'items', 'rooms', 'itemTypes', 'brands', 'buildings');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ItemFormRequest $request)
    {
        $user_id = $request->header('user_id');
        $itemCode = $request->item_code;
        $itemName = $request->item_name;
        $roomID = $request->room_id;
        $typeID = $request->type_id;
        $group = $request->group;
        $brand_id = $request->brand_id;
        $serial = $request->serial_number;
        $model = $request->model;
        $note = $request->note;
        $createFail = $this->item->createNewItem($itemCode, $itemName, $roomID, $typeID, $group, $brand_id, $serial, $model, $note, $user_id);
        if ($createFail) {
            $error =  'Add Duplicate Item Code';
            return  $this->serverResponse($error, null);
        } else {
            $success = 'Add Item \'' . $itemName . '\' Success';
            return  $this->serverResponse(null, $success);
        }
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
    public function update(ItemFormRequest $request, $item_id)
    {
        $user_id = $request->header('user_id');
        $id = $request->input('item_id');
        $item_name = $request->input('item_name');
        $room_id = $request->input('room_id');
        $type_id = $request->input('type_id');
        $group = $request->group;
        $brand_id = $request->input('brand_id');
        $serial = $request->input('serial_number');
        $model = $request->input('model');
        $note = $request->input('note');
        $updateFail = $this->item->updateItem($id, $item_name, $room_id, $type_id, $group, $brand_id, $serial, $model, $note, $user_id);
        $success = 'Update item \'' . $item_name . '\' success';
        return  $this->serverResponse(null, $success);
    }

    public function deleteOne(Request $request, $item_id)
    {
        $user_id = $request->header('user_id');
        $deleted = $this->delete($item_id, $user_id);
        $success = 'Delete item \'' . $deleted . '\' success';
        return $this->serverResponse(null, $success);
    }

    public function deleteMultiple(Request $request)
    {
        $user_id = $request->header('user_id');
        $items = $request->items;
        $code = array();
        foreach ($items as $item_id) {
            $deleted = $this->delete($item_id, $user_id);
            array_push($code, $deleted);
        }
        $success = 'Delete items \'' . implode(", ", $code) . '\' success';
        return $this->serverResponse(null, $success);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Http\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function delete($item_id, $user_id)
    {
        $item = $this->item->deleteItem($item_id, $user_id);
        $deleted = $item->item_code;
        return $deleted;
    }

    public function moveItems(Request $request)
    {
        $user_id = $request->header('user_id');
        $all_items_id = $request->items;
        $room_id = $request->room_id;
        $items = $this->item->moveItems($all_items_id, $room_id, $user_id);
        $room = $this->room->findByID($room_id);
        $success = 'Move items ID = [' . implode(", ", $items) . '] to ' . $room->room_name . ' success';
        return $this->serverResponse(null, $success);
    }

    public function getQRCode(Request $request, $item_code)
    {
        // $urlRoot = $request->root(); //http://insecto.sit.kmutt.ac.th
        $urlRoot = $request->url; //http://insecto.sit.kmutt.ac.th
        $urlQR = $urlRoot . "/sendproblem/" . $item_code;
        $fileName = $this->item->getQRCode($item_code, $urlQR);
        return response()->download(storage_path('app') . '/' . $fileName)->deleteFileAfterSend();
    }

    public function getQRCodeZIP(Request $request)
    {
        // $urlRoot = $request->root(); //http://insecto.sit.kmutt.ac.th
        $urlRoot = $request->url; //http://insecto.sit.kmutt.ac.th
        $all_items_id = $request->items;
        $zipFileName = $this->item->getSelectedQRCodeZIP($urlRoot, $all_items_id);
        if ($zipFileName) {
            return response()->download(public_path() . '/' . $zipFileName)->deleteFileAfterSend();
        } else {
            $error =  'Please add item before get QR-Code';
            return  $this->serverResponse($error, null);
        }
    }

    public function importItems(ImportRequest $request)
    {
        $file = $request->file('import_file');
        $isSuccess = $this->item->importItems($file);
        if ($isSuccess[0]) {
            return  $this->serverResponse(null, $isSuccess[1]);
        } else
            return  $this->serverResponse($isSuccess[1], null);
    }

    public function exportItems(Request $request)
    {
        $all_items_id = $request->items;
        $urlRoot = $request->url;
        $isSuccess = $this->item->exportItems($all_items_id, $urlRoot);
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
