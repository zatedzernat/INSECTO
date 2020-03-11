<?php

namespace App\Http\Controllers;

use App\Http\Models\Building;
use App\Http\Models\Item;
use App\Http\Models\Room;
use App\Http\Requests\RoomFormRequest;
use Illuminate\Http\Request;
use Illuminate\Support\MessageBag;

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
        $buildings = $this->building->findByCancelFlag('N');
        return compact('rooms', 'buildings');
        /* return view('location.rooms')
            ->with(compact('rooms', 'buildings')); */
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(RoomFormRequest $request)
    {
        $errors = new MessageBag();
        $room_name = $request->room_name;
        $room_code = $request->room_code;
        $building_id = $request->building_id;
        $createFail = $this->room->createNewRoom($room_name, $room_code, $building_id);
        if ($createFail) {
            $errors->add('dupRoom', 'Already have this Room!!!');
        }
        return redirect()->route('rooms')->withErrors($errors);
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
    public function update(RoomFormRequest $request, Room $room)
    {
        $errors = new MessageBag();
        //todo กดปุ่มedit แล้วเข้าไปแก้แต่ไม่ได้กดsave แต่กดปิดไป พอกดeditใหม่ ควรจะต้องขึ้นอันเดิมที่ยังไม่ได้แก้ เพราะเรายังไม่ได้เซฟ
        $id = $request->input('room_id');
        // $room_code = $request->input('room_code');
        $room_name = $request->input('room_name');
        $building_id = $request->input('building_id');
        $updateSuccess = $this->room->updateRoom($id, $room_name, $building_id);

        return redirect()->route('rooms')->withErrors($errors);
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
        return redirect()->route('rooms')->with('del_room', 'Delete room ' . $room->room_code. '-'. $room->room_name . ' success');
    }
}
