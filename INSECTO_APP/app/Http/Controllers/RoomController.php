<?php

namespace App\Http\Controllers;

use App\Http\Models\Building;
use App\Http\Models\Item;
use App\Http\Models\Room;
use App\Http\Requests\RoomFormRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;

class RoomController extends Controller
{

    private $room;
    private $building;
    private $item;
    private $error;
    private $success;
    private $message;
    private $time;

    public function __construct()
    {
        $this->room = new Room();
        $this->building = new Building();
        $this->item = new Item();
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
        $rooms = $this->room->findByCancelFlag('N');
        $buildings = $this->building->findByCancelFlag('N');
        return compact('rooms', 'buildings');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(RoomFormRequest $request)
    {
        $room_code = $request->room_code;
        $room_name = $request->room_name;
        $building_id = $request->building_id;
        $createFail = $this->room->createNewRoom($room_name, $room_code, $building_id);
        if ($createFail) {
            $this->error = true;
            $this->message = 'Add Duplicate Room Code';
        } else {
            $this->success = true;
            $this->message = 'Add Room \'' . $room_name . '\' Success';
        }
        return $this->serverResponse();
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
        $id = $request->input('room_id');
        $room_name = $request->input('room_name');
        $building_id = $request->input('building_id');
        $updateFail = $this->room->updateRoom($id, $room_name, $building_id);
        $this->success = true;
        $this->message = 'Update room \'' . $room_name . '\' success';
        return  $this->serverResponse();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Http\Models\Room  $room
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $room_id)
    {
        $room = $this->room->deleteRoom($room_id);
        $items = $this->item->deleteItems('room', $room);
        $this->message = 'Delete room \'' . $room->room_name . '\' success';
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
