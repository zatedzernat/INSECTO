@extends('master')

@section('title')
Statuses
@endsection

@section('content')
<br>
<div align="center">
    <h3>ALL Statuses</h3>
</div>
<br>
<div class="container">
    <table id="example" class="table table-striped table-borderedv table-dark" style="width:100%">
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Created At</th>
                <th>Updated At</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($statuses as $status)
                <tr>
                    <td>
                        {{$status->status_id}}
                    </td>
                    <td>
                        {{$status->status_name}}
                    </td>
                    <td>
                        {{$status->created_at}}
                    </td>
                    <td>
                        {{$status->updated_at}}
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection