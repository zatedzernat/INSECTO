<?php

namespace App\Http\Controllers;

use App\Http\Models\Building;
use App\Http\Models\Item;
use App\Http\Models\Room;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Requests\BuildingFormRequest;

class BuildingController extends Controller
{

    private $building;
    private $room;
    private $item;
    private $error;
    private $success;
    private $message;
    private $time;

    public function __construct()
    {
        $this->building = new Building();
        $this->room = new Room();
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
        $buildings = $this->building->findByCancelFlag('N');
        return compact('buildings');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(BuildingFormRequest $request)
    {
        $building_code = $request->building_code;
        $building_name = $request->building_name;
        $createFail = $this->building->createNewBuilding($building_code, $building_name);
        if ($createFail) {
            $this->error = true;
            $this->message = 'Add Duplicate Building Name';
        } else {
            $this->success = true;
            $this->message = 'Add Building \'' . $building_name . '\' Success';
        }
        return  $this->serverResponse();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Http\Models\Building  $building
     * @return \Illuminate\Http\Response
     */
    public function show(Building $building)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Http\Models\Building  $building
     * @return \Illuminate\Http\Response
     */
    public function update(BuildingFormRequest $request, Building $building)
    {
        $id = $request->input('building_id');
        $name = $request->input('building_name');
        $updateFail = $this->building->updateBuilding($id, $name);
        if ($updateFail) {
            $this->error = true;
            $this->message = 'Edit duplicate building name';
        } else {
            $this->success = true;
            $this->message = 'Update building \'' . $name . '\' success';
        }
        return  $this->serverResponse();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Http\Models\Building  $building
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $building_id)
    {
        $building = $this->building->deleteBuilding($building_id);
        $rooms = $this->room->deleteRooms($building);
        $items = $this->item->deleteItems('rooms', $rooms);
        $this->message = 'Delete building \'' . $building->building_name . '\' success';
        $this->success = true;
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
