@extends('master')

@section('title')
Brands
@endsection

@section('content')
<br>
<div align="center">
    <h3>ALL Brands</h3>
</div>
<br>
<div class="container">
    <table id="example" class="table table-striped table-borderedv table-dark" style="width:100%">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Cancel Flag</th>
                <th>Create At</th>
                <th>Update At</th>
                <th>Update By</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($brands as $brand)
                <tr>
                    <td>
                        {{$brand->brand_id}}
                    </td>
                    <td>
                        {{$brand->brand_name}}
                    </td>
                    <td>
                        {{$brand->cancel_flag}}
                    </td>
                    <td>
                        {{$brand->created_at}}
                    </td>
                    <td>
                        {{$brand->updated_at}}
                    </td>
                    <td>
                        {{$brand->update_by}}
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection