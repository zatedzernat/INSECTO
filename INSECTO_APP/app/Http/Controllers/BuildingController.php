<?php

namespace App\Http\Controllers;

use App\Http\Models\Building;
use Illuminate\Http\Request;
use App\Http\Requests\BuildingFormRequest;
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
    public function store(BuildingFormRequest $request)
    {
        $errors = new MessageBag();
        $building_code = $request->building_code;
        $building_name = $request->building_name;
        $boolean = $this->building->createNewBuilding($building_code, $building_name);
        if ($boolean) {
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
    public function update(BuildingFormRequest $request, Building $building)
    {
        $errors = new MessageBag();
        $id = $request->input('building_id');
        $name= $request->input('building_name');
        $updateSuccess = $this->building->updateBuilding($id, $name);
        if (!$updateSuccess) {
            $errors->add('upDupBuilding','Duplicate Building Name!!!');
        }
        return redirect()->route('buildings')->withErrors($errors);
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
