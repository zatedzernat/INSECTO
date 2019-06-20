@extends('master')

@section('title')
Problems
@endsection

@section('content')
<br>
<div align="center">
    <h3>ALL Problems</h3>
</div>
<br>
<div class="container">
    <table id="example" class="table table-striped table-borderedv table-dark" style="width:100%">
        <thead>
            <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Problem Description</th>
                <th>Problem Status</th>
                <th>Create At</th>
                <th>Update At</th>
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
                </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection