<?php

namespace App\Http\Controllers;

use App\Http\Models\Brand;
use App\Http\Models\Item;
use App\Http\Requests\BrandFormRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\MessageBag;

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
        return $brands;
        /* return view('item.brands')
             ->with(compact('brands')); */
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(BrandFormRequest $request) //todo check form validate to return error to frontend
    {
        $name = $request->brand_name;
        $createFail = $this->brand->createNewBrand($name);
        if ($createFail) {
            return response()->json([
                'error' => true,
                'message' => 'Add Duplicate Brand Name',
                'time' => Carbon::now()->format('H:i:s'),
            ]);
        }
        return response()->json([
            'error' => false,
            'time' => Carbon::now()->format('H:i:s'),
        ]);
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
    public function update(BrandFormRequest $request)
    {
        $errors = new MessageBag();
        //todo กดปุ่มedit แล้วเข้าไปแก้แต่ไม่ได้กดsave แต่กดปิดไป พอกดeditใหม่ ควรจะต้องขึ้นอันเดิมที่ยังไม่ได้แก้ เพราะเรายังไม่ได้เซฟ
        $id = $request->input('brand_id');
        $name = $request->input('brand_name');
        $updateSuccess = $this->brand->updateBrand($id, $name);
        if (!$updateSuccess) {
            $errors->add('upDupBrand', 'Duplicate Brand Name!!!');
        }

        return redirect()->route('brands')->withErrors($errors);
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
        return redirect()->route('brands')->with('del_brand', 'Delete brand ' . $brand->brand_name . ' success');
    }
}
