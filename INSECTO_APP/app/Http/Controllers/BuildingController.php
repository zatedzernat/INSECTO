<?php

namespace App\Http\Controllers;

use App\Http\Models\Building;
use Illuminate\Http\Request;
use Illuminate\Support\MessageBag;

class BuildingController extends Controller
{

    private $building;

    public function __construct()
    {
        $this->building = new Building();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $buildings = $this->building->findByCancelFlag('N');

        return view('location.buildings')
            ->with(compact('buildings'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
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
        $name = $request->building_name;
        $code = $request->building_code;
        $addBuilding = $this->building->createNewBuilding($name, $code);
        if (!$addBuilding->wasRecentlyCreated) {
            $errors->add('dupBuilding','Already have this Building!!!');
        }
        return redirect()->route('buildings')->withErrors($errors);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Building  $building
     * @return \Illuminate\Http\Response
     */
    public function show(Building $building)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Building  $building
     * @return \Illuminate\Http\Response
     */
    public function edit(Building $building)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Building  $building
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Building $building)
    {
        $id = $request->input('building_id');
        $building = $this->building->findByID($id);
        $newBuildingCode= $request->input('building_code');
        $newBuildingName= $request->input('building_name');
        $building->setName($newBuildingName);
        $building->setCode($newBuildingCode);
        $building->save();
        
        return redirect()->route('buildings');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Building  $building
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $building_id)
    {
        $building = $this->building->findByID($building_id);
        $building->setCancelFlag('Y');
        $building->save();
        return redirect()->route('buildings')->with('del_building','Delete building '.$building->building_name.' success');
    }
}
