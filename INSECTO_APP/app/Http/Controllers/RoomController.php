<?php

namespace App\Http\Controllers;

use App\Http\Models\Building;
use App\Http\Models\Item;
use App\Http\Models\Room;
use App\Http\Requests\ImportRequest;
use App\Http\Requests\RoomFormRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;

class RoomController extends Controller
{

    private $room;
    private $building;
    private $item;

    public function __construct()
    {
        $this->room = new Room();
        $this->building = new Building();
        $this->item = new Item();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        $rooms = $this->room->findByCancelFlag('N');
        $countRooms = $this->room->countRooms();
        $buildings = $this->building->findByCancelFlag('N');
        return compact('rooms', 'buildings', 'countRooms');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(RoomFormRequest $request)
    {
        $user_id = $request->header('user_id');
        $room_code = $request->room_code;
        $room_name = $request->room_name;
        $building_id = $request->building_id;
        $createFail = $this->room->createNewRoom($room_name, $room_code, $building_id, $user_id);
        if ($createFail) {
            $error = 'Add Duplicate Room Code';
            return $this->serverResponse($error, null);
        } else {
            $success = 'Add Room \'' . $room_name . '\' Success';
            return $this->serverResponse(null, $success);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Http\Models\Room  $room
     * @return \Illuminate\Http\Response
     */
    public function show(Room $room)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Http\Models\Room  $room
     * @return \Illuminate\Http\Response
     */
    public function update(RoomFormRequest $request, $room_id)
    {
        $user_id = $request->header('user_id');
        $id = $request->input('room_id');
        $room_name = $request->input('room_name');
        $building_id = $request->input('building_id');
        $updateFail = $this->room->updateRoom($id, $room_name, $building_id, $user_id);
        $success = 'Update room \'' . $room_name . '\' success';
        return  $this->serverResponse(null, $success);
    }

    public function deleteOne(Request $request, $room_id)
    {
        $user_id = $request->header('user_id');
        $deleted = $this->delete($room_id, $user_id);
        $success = 'Delete room \'' . $deleted . '\' success';
        return $this->serverResponse(null, $success);
    }

    public function deleteMultiple(Request $request)
    {
        $user_id = $request->header('user_id');
        $rooms = $request->rooms;
        $name = array();
        foreach ($rooms as $room_id) {
            $deleted = $this->delete($room_id, $user_id);
            array_push($name, $deleted);
        }
        $success = 'Delete rooms \'' . implode(", ", $name) . '\' success';
        return $this->serverResponse(null, $success);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Http\Models\Room  $room
     * @return \Illuminate\Http\Response
     */
    public function delete($room_id, $user_id)
    {
        $room = $this->room->deleteRoom($room_id, $user_id);
        $items = $this->item->deleteItems('room', $room);
        $deleted = $room->room_name;
        return $deleted;
    }

    public function getRoomQRCode(Request $request, $room_code)
    {
        // $urlRoot = $request->root(); //http://insecto.sit.kmutt.ac.th
        $urlRoot = $request->url; //http://insecto.sit.kmutt.ac.th
        $urlQR = $urlRoot . "/sendproblem/room/" . $room_code;
        $fileName = $this->room->getRoomQRCode($room_code, $urlQR);
        return response()->download(storage_path('app') . '/' . $fileName)->deleteFileAfterSend();
    }

    public function getQRCodeZIP(Request $request)
    {
        // $urlRoot = $request->root(); //http://insecto.sit.kmutt.ac.th
        $urlRoot = $request->url; //http://insecto.sit.kmutt.ac.th
        $all_rooms_id = $request->rooms;
        $zipFileName = $this->room->getSelectedQRCodeZIP($urlRoot, $all_rooms_id);
        if ($zipFileName) {
            return response()->download(public_path() . '/' . $zipFileName)->deleteFileAfterSend();
        } else {
            $error =  'Please add room before get QR-Code';
            return  $this->serverResponse($error, null);
        }
    }

    public function importRooms(ImportRequest $request)
    {
        $file = $request->file('import_file');
        $isSuccess = $this->room->importRooms($file);
        if ($isSuccess[0]) {
            return  $this->serverResponse(null, $isSuccess[1]);
        } else
            return  $this->serverResponse($isSuccess[1], null);
    }

    public function exportRooms(Request $request)
    {
        $all_rooms_id = $request->rooms;
        $isSuccess = $this->room->exportRooms($all_rooms_id);
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
