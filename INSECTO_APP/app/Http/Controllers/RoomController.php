<?php

namespace App\Http\Controllers;

use App\Http\Models\Building;
use App\Http\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\MessageBag;

class RoomController extends Controller
{

    private $room;
    private $building;

    public function __construct()
    {
        $this->room = new Room();
        $this->building = new Building();
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

        return view('location.rooms')
            ->with(compact('rooms', 'buildings'));
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
        $room_name = $request->room_name;
        $room_code = $request->room_code;
        $building_id = $request->building_id;
        $boolean = $this->room->createNewRoom($room_name, $room_code, $building_id);
        if ($boolean) {
            $errors->add('dupRoom', 'Already have this Room!!!');
        }
        return redirect()->route('rooms')->withErrors($errors);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Room  $room
     * @return \Illuminate\Http\Response
     */
    public function show(Room $room)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Room  $room
     * @return \Illuminate\Http\Response
     */
    public function edit(Room $room)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Room  $room
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Room $room)
    {
        //todo กดปุ่มedit แล้วเข้าไปแก้แต่ไม่ได้กดsave แต่กดปิดไป พอกดeditใหม่ ควรจะต้องขึ้นอันเดิมที่ยังไม่ได้แก้ เพราะเรายังไม่ได้เซฟ
        //todo validated null or spac value
        $id = $request->input('room_id');
        $room = $this->room->findByID($id);
        $newRoomCode = $request->input('room_code');
        $newRoomName = $request->input('room_name');
        $newBuilding = $request->input('building');
        $room->setName($newRoomName);
        $room->setCode($newRoomCode);
        $room->setBuilding($newBuilding);
        //todo set updateby ตาม LDAP
        $room->save();

        return redirect()->route('rooms');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Room  $room
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $room_id)
    {
        //todo ถ้าผูกอยู่กับอันย่อย ๆ เช่น มี item_type air แล้วกดลบ มันไม่ควรกดได้ ต้องทำให้เช็คว่ามีข้อมูลถูกผูกอยู่ไหม
        // * not real delete but change cancel flag to Y
        $room = $this->room->findByID($room_id);
        $room->setCancelFlag('Y');
        $room->save();
        return redirect()->route('rooms')->with('del_room', 'Delete room ' . $room->room_name . ' success');

    }
}
