<?php

namespace App\Http\Controllers;

use App\Http\Models\Building;
use App\Http\Models\Item;
use App\Http\Models\Room;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Requests\BuildingFormRequest;
use App\Http\Requests\ImportRequest;

class BuildingController extends Controller
{

    private $building;
    private $room;
    private $item;

    public function __construct()
    {
        $this->building = new Building();
        $this->room = new Room();
        $this->item = new Item();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $buildings = $this->building->findByCancelFlag('N');
        $countBuildings = $this->building->countBuildings();
        return compact('buildings', 'countBuildings');
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
            $error = 'Add Duplicate Building Name';
            return  $this->serverResponse($error, null);
        } else {
            $success =  'Add Building \'' . $building_name . '\' Success';
            return  $this->serverResponse(null, $success);
        }
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
            $error = 'Edit duplicate building name';
            return  $this->serverResponse($error, null);
        } else {
            $success = 'Update building \'' . $name . '\' success';
            return  $this->serverResponse(null, $success);
        }
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
        $success = 'Delete building \'' . $building->building_name . '\' success';
        return $this->serverResponse(null, $success);
    }

    // public function destroySelected(Request $request)
    // {
    //     $buildings = $request->buildings;
    //     $name = array();
    //     foreach ($buildings as $building_id) {
    //         $building = $this->building->deleteBuilding($building_id);
    //         $rooms = $this->room->deleteRooms($building);
    //         $items = $this->item->deleteItems('rooms', $rooms);
    //         array_push($name, $building->building_name);
    //     }
    //     $success = 'Delete buildings \'' . implode(" ", $name) . '\' success';
    //     return $this->serverResponse(null, $success);
    // }

    public function importBuildings(ImportRequest $request)
    {
        $file = $request->file('import_file');
        $isSuccess = $this->building->importBuildings($file);
        if ($isSuccess[0]) {
            return  $this->serverResponse(null, $isSuccess[1]);
        } else
            return  $this->serverResponse($isSuccess[1], null);
    }

    public function exportBuildings()
    {
        $isSuccess = $this->building->exportBuildings();
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
