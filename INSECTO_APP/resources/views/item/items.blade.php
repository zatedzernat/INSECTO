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
                <th>ID</th>
                <th>Name</th>
                <th>Room Name</th>
                <th>Image</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($items as $item)
                <tr>
                    <td>
                        {{$item->item_id}}
                    </td>
                    <td>
                        {{$item->item_name}}
                    </td>
                    <td>
                        {{$item->room->room_name}}
                    </td>
                    <td>
                        <img src="/img/{{$item->picture}}" alt="item's image" width="100px">
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection