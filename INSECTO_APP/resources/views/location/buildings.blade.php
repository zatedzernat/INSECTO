@extends('master')

@section('title')
Buildings
@endsection

@section('content')
<br>
<div align="center">
    <h3>ALL Buildings</h3>
</div>
<br>
<div class="container">
    <table id="example" class="table table-striped table-borderedv table-dark" style="width:100%">
        <thead>
            <tr>
                <th>#</th>
                <th>Code</th>
                <th>Name</th>
                <th>Created at</th>
                <th>Updated at</th>
                <th>Update by</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($buildings as $building)
                <tr>
                    <td>
                        {{$building->building_id}}
                    </td>
                    <td>
                        {{$building->building_code}}
                    </td>
                    <td>
                        {{$building->building_name}}
                    </td>
                    <td>
                        {{$building->created_at}}
                    </td>
                    <td>
                        {{$building->updated_at}}
                    </td>
                    <td>
                        {{$building->update_by}}
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection