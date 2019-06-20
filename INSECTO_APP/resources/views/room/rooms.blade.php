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
                <th>ID</th>
                <th>Name</th>
                <th>Floor</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($rooms as $room)
                <tr>
                    <td>
                        {{$room->room_id}}
                    </td>
                    <td>
                        {{$room->room_name}}
                    </td>
                    <td>
                        {{$room->floor}}
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection