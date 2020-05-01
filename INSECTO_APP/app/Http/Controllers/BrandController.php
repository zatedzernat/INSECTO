<?php

namespace App\Http\Controllers;

use App\Http\Models\Brand;
use App\Http\Models\Item;
use App\Http\Requests\BrandFormRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;

class BrandController extends Controller
{

    private $brand;
    private $item;
    private $error;
    private $success;
    private $message;
    private $time;

    public function __construct()
    {
        $this->brand = new Brand();
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
        $brands = $this->brand->findByCancelFlag('N');
        return compact('brands');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(BrandFormRequest $request)
    {
        $name = $request->brand_name;
        $createFail = $this->brand->createNewBrand($name);
        if ($createFail) {
            $this->error = true;
            $this->message = 'Add duplicate brand name!';
        } else {
            $this->success = true;
            $this->message = 'Add brand \'' . $name . '\' success';
        }
        return  $this->serverResponse();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Http\Models\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function show(Brand $brand)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Http\Models\Brand $brand
     * @return \Illuminate\Http\Response
     */
    public function update(BrandFormRequest $request, $brand_id)
    {
        $id = $request->input('brand_id');
        $name = $request->input('brand_name');
        $updateFail = $this->brand->updateBrand($id, $name);
        if ($updateFail) {
            $this->error = true;
            $this->message = 'Edit duplicate brand name!';
        } else {
            $this->success = true;
            $this->message = 'Update brand \'' . $name . '\' success';
        }
        return  $this->serverResponse();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Http\Models\Brand   $brand
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $brand_id)
    {
        $brand = $this->brand->deleteBrand($brand_id);
        $items = $this->item->setNullInItem($brand);
        $this->message = 'Delete brand \'' . $brand->brand_name . '\' success';
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
