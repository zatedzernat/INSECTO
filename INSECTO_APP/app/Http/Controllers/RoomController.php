<?php

namespace App\Http\Controllers;

use App\Http\Models\Room;
use App\Http\Models\Building;
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
            ->with(compact('rooms','buildings'));
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
        $name = $request->room_name;
        $code = $request->room_code;
        $building = $request->building_id;
        $addRoom = $this->room->createNewRoom($name, $code, $building);
        if (!$addRoom->wasRecentlyCreated) {
            $errors->add('dupRoom','Already have this Room!!!');
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
        $id = $request->input('room_id');
        $room = $this->room->findByID($id);
        $newRoomCode= $request->input('room_code');
        $newRoomName= $request->input('room_name');
        $newBuilding= $request->input('building');
        $room->setName($newRoomName);
        $room->setCode($newRoomCode);
        $room->setBuilding($newBuilding);
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
        $room = $this->room->findByID($room_id);
        $room->setCancelFlag('Y');
        $room->save();
        return redirect()->route('rooms')->with('del_room','Delete room '.$room->room_name.' success');

    }
}
