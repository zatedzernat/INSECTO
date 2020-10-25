<?php

namespace App\Http\Controllers;

use App\Http\Models\Brand;
use App\Http\Models\Item;
use App\Http\Requests\BrandFormRequest;
use App\Http\Requests\ImportRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;

class BrandController extends Controller
{

    private $brand;
    private $item;

    public function __construct()
    {
        $this->brand = new Brand();
        $this->item = new Item();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $brands = $this->brand->findByCancelFlag('N');
        $countBrands = $this->brand->countBrands();
        return compact('brands', 'countBrands');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(BrandFormRequest $request)
    {
        $user_id = $request->header('user_id');
        $name = $request->brand_name;
        $createFail = $this->brand->createNewBrand($name, $user_id);
        if ($createFail) {
            $error = 'Add duplicate brand name!';
            return  $this->serverResponse($error, null);
        } else {
            $success = 'Add brand \'' . $name . '\' success';
            return  $this->serverResponse(null, $success);
        }
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
        $user_id = $request->header('user_id');
        $id = $request->input('brand_id');
        $name = $request->input('brand_name');
        $updateFail = $this->brand->updateBrand($id, $name, $user_id);
        if ($updateFail) {
            $error = 'Edit duplicate brand name!';
            return  $this->serverResponse($error, null);
        } else {
            $success = 'Update brand \'' . $name . '\' success';
            return  $this->serverResponse(null, $success);
        }
    }

    public function deleteOne(Request $request, $brand_id)
    {
        $user_id = $request->header('user_id');
        $deleted = $this->delete($brand_id, $user_id);
        $success =  'Delete brand \'' . $deleted . '\' success';
        return $this->serverResponse(null, $success);
    }

    public function deleteMultiple(Request $request)
    {
        $user_id = $request->header('user_id');
        $brands = $request->brands;
        $name = array();
        foreach ($brands as $brand_id) {
            $deleted = $this->delete($brand_id, $user_id);
            array_push($name, $deleted);
        }
        $success = 'Delete brands \'' . implode(", ", $name) . '\' success';
        return $this->serverResponse(null, $success);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Http\Models\Brand   $brand
     * @return \Illuminate\Http\Response
     */
    public function delete($brand_id, $user_id)
    {
        $brand = $this->brand->deleteBrand($brand_id, $user_id);
        $items = $this->item->setNullInItem($brand, $user_id);
        $deleted = $brand->brand_name;
        return $deleted;
    }

    public function importBrands(ImportRequest $request)
    {
        $file = $request->file('import_file');
        $isSuccess = $this->brand->importBrands($file);
        if ($isSuccess[0]) {
            return  $this->serverResponse(null, $isSuccess[1]);
        } else
            return  $this->serverResponse($isSuccess[1], null);
    }

    public function exportBrands(Request $request)
    {
        $all_brands_id = $request->brands;
        $isSuccess = $this->brand->exportBrands($all_brands_id);
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
