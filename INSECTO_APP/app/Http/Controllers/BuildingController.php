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
        $user_id = $request->header('user_id');
        $building_code = $request->building_code;
        $building_name = $request->building_name;
        $createFail = $this->building->createNewBuilding($building_code, $building_name, $user_id);
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
        $user_id = $request->header('user_id');
        $id = $request->input('building_id');
        $name = $request->input('building_name');
        $updateFail = $this->building->updateBuilding($id, $name, $user_id);
        if ($updateFail) {
            $error = 'Edit duplicate building name';
            return  $this->serverResponse($error, null);
        } else {
            $success = 'Update building \'' . $name . '\' success';
            return  $this->serverResponse(null, $success);
        }
    }

    public function deleteOne(Request $request, $buildind_id)
    {
        $user_id = $request->header('user_id');
        $deleted = $this->delete($buildind_id, $user_id);
        $success = 'Delete building \'' . $deleted . '\' success';
        return $this->serverResponse(null, $success);
    }

    public function deleteMultiple(Request $request)
    {
        $user_id = $request->header('user_id');
        $buildings = $request->buildings;
        $name = array();
        foreach ($buildings as $building_id) {
            $deleted = $this->delete($building_id, $user_id);
            array_push($name, $deleted);
        }
        $success = 'Delete buildings \'' . implode(", ", $name) . '\' success';
        return $this->serverResponse(null, $success);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Http\Models\Building  $building
     * @return \Illuminate\Http\Response
     */
    public function delete($building_id, $user_id)
    {
        $building = $this->building->deleteBuilding($building_id, $user_id);
        $rooms = $this->room->deleteRooms($building);
        $items = $this->item->deleteItems('rooms', $rooms);
        $deleted = $building->building_name;
        return $deleted;
    }

    public function importBuildings(ImportRequest $request)
    {
        $file = $request->file('import_file');
        $isSuccess = $this->building->importBuildings($file);
        if ($isSuccess[0]) {
            return  $this->serverResponse(null, $isSuccess[1]);
        } else
            return  $this->serverResponse($isSuccess[1], null);
    }

    public function exportBuildings(Request $request)
    {
        $all_buildings_id = $request->buildings;
        $isSuccess = $this->building->exportBuildings($all_buildings_id);
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
