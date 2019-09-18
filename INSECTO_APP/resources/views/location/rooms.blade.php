@extends('master')

@section('title')
Rooms
@endsection

@section('content')
<br>
<div align="center">
    <h3>ALL Rooms</h3>
</div>
<br>
<div class="container">
    <table id="example" class="table table-striped table-borderedv table-dark" style="width:100%">
        <thead>
            <tr>
                <th>#</th>
                <th>Code</th>
                <th>Name</th>
                <th>Building</th>
                <th>Created at</th>
                <th>Updated at</th>
                <th>Update by</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($rooms as $room)
                <tr>
                    <td>
                        {{$room->room_id}}
                    </td>
                    <td>
                        {{$room->room_code}}
                    </td>
                    <td>
                        {{$room->room_name}}
                    </td>
                    <td>
                        {{$room->buildings->building_name}}
                    </td>
                    <td>
                        {{$room->created_at}}
                    </td>
                    <td>
                        {{$room->updated_at}}
                    </td>
                    <td>
                        {{$room->update_by}}
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection