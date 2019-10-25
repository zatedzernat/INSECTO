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
                <th>#</th>
                <th>Item Code</th>
                <th>Item Name</th>
                <th>Problem Desc ID</th>
                <th>Problem Description</th>
                <th>Status</th>
                <th>Created at</th>
                <th>Updated at</th>
                <th>Update by</th>
                {{-- <th>Fixing</th> --}}
                {{-- <th>Success</th> --}}
            </tr>
        </thead>
        <tbody>
            @foreach ($noti_problems as $noti_problem)
            <tr>
                <td>
                    {{$noti_problem->noti_id}}
                </td>
                <td>
                    {{$noti_problem->item->item_code}}
                </td>
                <td>
                    {{$noti_problem->item->item_name}}
                </td>
                <td>
                    {{$noti_problem->problem_des_id ?? "-"}}
                </td>
                <td>
                    {{$noti_problem->problem_description}}
                </td>
                <td>
                    {{$noti_problem->status->status_name}}
                </td>
                <td>
                    {{$noti_problem->created_at}}
                </td>
                <td>
                    {{$noti_problem->updated_at}}
                </td>
                <td>
                    {{$noti_problem->update_by}}
                </td>
                {{-- <td>
                        <a href="" class="btn btn-warning"> 
                           href ex: {{action('UserController@edit',$user['id'])}}
                Fixing
                </a>
                </td>
                <td>
                    <a href="" class="btn btn-success">
                        href ex: {{action('UserController@edit',$user['id'])}}
                        Success
                    </a>
                </td> --}}
            </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection