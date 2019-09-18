@extends('master')

@section('title')
Items
@endsection

@section('content')
<br>
<div align="center">
    <h3>ALL Items</h3>
</div>
<br>
<div class="container">
    <table id="example" class="table table-striped table-borderedv table-dark" style="width:100%">
        <thead>
            <tr>
                <th>#</th>
                <th>Code</th>
                <th>Name</th>
                <th>Room Code</th>
                <th>Room Name</th>
                <th>Type</th>
                <th>Brand</th>
                <th>Serial Number</th>
                <th>Model</th>
                {{-- <th>Note</th> --}}
                <th>Created at</th>
                <th>Updated at</th>
                <th>Update by</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($items as $item)
                <tr>
                    <td>
                        {{$item->item_id}}
                    </td>
                    <td>
                        {{$item->item_code}}
                    </td>
                    <td>
                        {{$item->item_name}}
                    </td>
                    <td>
                        {{$item->room->room_code}}
                    </td>
                    <td>
                        {{$item->room->room_name}}
                    </td>
                    <td>
                        {{$item->item_type->type_name}}
                    </td>
                    <td>
                        {{$item->brand->brand_name ?? "-" }}
                    </td>
                    <td>
                        {{$item->serial_number ?? "-"}}
                    </td>
                    <td>
                        {{$item->model ?? "-"}}
                    </td>
                    {{-- <td>
                        {{$item->note ?? "-"}}
                    </td> --}}
                    <td>
                        {{$item->created_at}}
                    </td>
                    <td>
                        {{$item->updated_at}}
                    </td>
                    <td>
                        {{$item->update_by}}
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection