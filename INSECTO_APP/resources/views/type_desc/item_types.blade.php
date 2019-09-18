@extends('master')

@section('title')
Item Types
@endsection

@section('content')
<br>
<div align="center">
    <h3>ALL Item Types</h3>
</div>
<br>
<div class="container">
    <table id="example" class="table table-striped table-borderedv table-dark" style="width:100%">
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Created at</th>
                <th>Updated at</th>
                <th>Update by</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($item_types as $item_type)
                <tr>
                    <td>
                        {{$item_type->type_id}}
                    </td>
                    <td>
                        {{$item_type->type_name}}
                    </td>
                    <td>
                        {{$item_type->created_at}}
                    </td>
                    <td>
                        {{$item_type->updated_at}}
                    </td>
                    <td>
                        {{$item_type->update_by}}
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection