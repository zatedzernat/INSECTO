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
                <th>#</th>
                <th>Problem Description</th>
                <th>Type</th>
                <th>Created at</th>
                <th>Updated at</th>
                <th>Update by</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($problems_descs as $problem_desc)
                <tr>
                    <td>
                        {{$problem_desc->problem_des_id}}
                    </td>
                    <td>
                        {{$problem_desc->problem_description}}
                    </td>
                    <td>
                        {{$problem_desc->item_type->type_name}}
                    </td>
                    <td>
                        {{$problem_desc->created_at}}
                    </td>
                    <td>
                        {{$problem_desc->updated_at}}
                    </td>
                    <td>
                        {{$problem_desc->update_by}}
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection