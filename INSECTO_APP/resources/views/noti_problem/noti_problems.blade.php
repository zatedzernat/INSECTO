@extends('master')

@section('title')
Notication Problems
@endsection

@section('content')
<br>
<div align="center">
    <h3>ALL Notification Problems</h3>
</div>
<br>
<div class="container">
    <table id="example" class="table table-striped table-borderedv table-dark" style="width:100%">
        <thead>
            <tr>
                <th>problem ID</th>
                <th>Date</th>
                <th>Item ID</th>
                <th>Item Name</th>
                <th>Room Name</th>
                <th>Floor</th>
                <th>Problem Description</th>
                <th>Problem Status</th>
                <th>Create At</th>
                <th>Update At</th>
                <th>Fixing</th>
                <th>Success</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($problems as $problem)
                <tr>
                    <td>
                        {{$problem->problem_id}}
                    </td>
                    <td>
                        {{$problem->problem_date}}
                    </td>
                    <td>
                        {{$problem->problem_detial->item->item_id}}
                    </td>
                    <td>
                        {{$problem->problem_detial->item->item_name}}
                    </td>
                    <td>
                        {{$problem->problem_detial->item->room->room_name}}
                    </td>
                    <td>
                        {{$problem->problem_detial->item->room->floor}}
                    </td>
                    <td>
                        {{$problem->problem_detial->problem_descriptions->problem_des}}
                    </td>
                    <td>
                        {{$problem->problem_status}}
                    </td>
                    <td>
                        {{$problem->created_at}}
                    </td>
                    <td>
                        {{$problem->updated_at}}
                    </td>
                    <td>
                        <a href="" class="btn btn-warning"> 
                           {{-- href ex: {{action('UserController@edit',$user['id'])}} --}}
                            Fixing
                        </a>
                    </td>
                    <td>
                        <a href="" class="btn btn-success"> 
                            {{-- href ex: {{action('UserController@edit',$user['id'])}} --}}
                            Success
                        </a>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection