@extends('master')

@section('title')
Problem Details
@endsection

@section('content')
<br>
<div align="center">
    <h3>ALL Problem Details</h3>
</div>
<br>
<div class="container">
    <table id="example" class="table table-striped table-borderedv table-dark" style="width:100%">
        <thead>
            <tr>
                <th>ID</th>
                <th>Item Name</th>
                <th>Problem Des</th>
                <th>Cancel Flag</th>
                <th>Create At</th>
                <th>Update At</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($problems_det as $problem_det)
                <tr>
                    <td>
                        {{$problem_det->problem_detail_id}}
                    </td>
                    <td>
                        {{$problem_det->item->item_name}}
                    </td>
                    <td>
                        {{$problem_det->problem_descriptions->problem_des}}
                    </td>
                    <td>
                        {{$problem_det->cancel_flag}}
                    </td>
                    <td>
                        {{$problem_det->created_at}}
                    </td>
                    <td>
                        {{$problem_det->updated_at}}
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection