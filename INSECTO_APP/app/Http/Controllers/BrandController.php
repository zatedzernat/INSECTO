<?php

namespace App\Http\Controllers;

use App\Http\Models\Brand;
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
    public function store(Request $request)
    {
        $errors = new MessageBag();
        $name = $request->newBrand;
        $addBrand = $this->brand->createNewBrand($name);
        if (!$addBrand->wasRecentlyCreated) {
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
    public function update(Request $request)
    {
        //todo กดปุ่มedit แล้วเข้าไปแก้แต่ไม่ได้กดsave แต่กดปิดไป พอกดeditใหม่ ควรจะต้องขึ้นอันเดิมที่ยังไม่ได้แก้ เพราะเรายังไม่ได้เซฟ
        $id = $request->input('brand_id');
        //todo validated null or spac value
        $newBrand = $request->input('brand_name');
        $brand = $this->brand->findByID($id);
        $brand->setName($newBrand);
        //todo set updateby ตาม LDAP
        // $brand->setUpdateBy('ชื่อ user ตามLDAP');
        $brand->save();
        
        return redirect()->route('brands');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $brand_id)
    {
        // * not real delete but change cancel flag to Y
        $brand = $this->brand->findByID($brand_id);
        $brand->setCancelFlag('Y');
        $brand->save();
        return redirect()->route('brands')->with('del_brand','Delete brand '.$brand->brand_name.' success');
    }
}
