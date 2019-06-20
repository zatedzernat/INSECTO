@extends('master')

@section('title')
Problem Descriptions
@endsection

@section('content')
<br>
<div align="center">
    <h3>ALL Problem Descriptions</h3>
</div>
<br>
<div class="container">
    <table id="example" class="table table-striped table-borderedv table-dark" style="width:100%">
        <thead>
            <tr>
                <th>ID</th>
                <th>Problem Description</th>
                <th>Create At</th>
                <th>Update At</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($problems_desc as $problem_desc)
                <tr>
                    <td>
                        {{$problem_desc->problem_des_id}}
                    </td>
                    <td>
                        {{$problem_desc->problem_des}}
                    </td>
                    <td>
                        {{$problem_desc->created_at}}
                    </td>
                    <td>
                        {{$problem_desc->updated_at}}
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection