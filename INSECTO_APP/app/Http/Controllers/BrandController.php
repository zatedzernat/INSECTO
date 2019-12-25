<?php

namespace App\Http\Controllers;

use App\Http\Models\Brand;
use App\Http\Requests\BrandFormRequest;
use Illuminate\Http\Request;
use Illuminate\Support\MessageBag;

class BrandController extends Controller
{

    private $brand;

    public function __construct()
    {
        $this->brand = new Brand();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $brands = $this->brand->findByCancelFlag('N');
        return view('item.brands')
            ->with(compact('brands'));
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
    public function store(BrandFormRequest $request)
    {
        $errors = new MessageBag();
        $name = $request->brand_name;
        $boolean = $this->brand->createNewBrand($name);
        if ($boolean) {
            $errors->add('dupBrand','Already have this Brand!!!');
        }
        return redirect()->route('brands')->withErrors($errors);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function show(Brand $brand)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {

    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Brand  $brand
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
            $errors->add('upDupBrand','Duplicate Brand Name!!!');
        }
        
        return redirect()->route('brands')->withErrors($errors);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $brand_id)
    {
        $brand = $this->brand->deleteBrandAndSetNullInItem($brand_id);
        return redirect()->route('brands')->with('del_brand','Delete brand '.$brand->brand_name.' success');
    }
}
