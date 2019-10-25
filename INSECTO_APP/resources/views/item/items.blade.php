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
    {{-- <div class="table-responsive"></div> --}}
    <table id="example" class="table table-striped table-borderedv table-dark" style="width:100%">
        <thead>
            <tr>
                <th>#</th>
                <th>Code</th>
                <th>Name</th>
                {{-- <th>Room Code</th> --}}
                <th>Room Name</th>
                <th>Type</th>
                <th>Brand</th>
                <th>Serial Number</th>
                <th>Model</th>
                {{-- <th>Note</th> --}}
                <th>Created at</th>
                <th>Updated at</th>
                <th>Update by</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($items as $item)
            <tr>
                <td>
                    {{ $loop->iteration }}
                </td>
                <td>
                    {{$item->item_code}}
                </td>
                <td>
                    {{$item->item_name}}
                </td>
                {{-- <td>
                    {{ $item->room->room_code }}
                </td> --}}
                <td>
                    {{$item->room->room_name}}
                </td>
                <td>
                    {{ $item->item_type->type_name }}
                </td>
                <td>
                    {{ $item->brand->brand_name??"-" }}
                </td>
                <td>
                    {{ $item->serial_number??"-" }}
                </td>
                <td>
                    {{ $item->model??"-" }}
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
                <td>

                    <!-- Button trigger modal Edit -->
                    <button type="button" class="btn btn-warning" data-toggle="modal"
                        data-target="#edit-{{ $item->item_id}}">
                        Edit
                    </button>
                    <!-- Button trigger modal Del -->
                    <button type="button" class="btn btn-danger" data-toggle="modal"
                        data-target="#delete-{{ $item->item_id }}">
                        Del
                    </button>
                </td>
            </tr>

            <!-- Modal Edit -->
            <div class="modal fade" id="edit-{{ $item->item_id }}" tabindex="-1" role="dialog"
                aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <form action="/brand/edit" method="post">
                            @csrf
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">Edit</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label for="message-text" class="col-form-label">ID:</label>
                                    <input type="text" class="form-control" name="item_id" value="{{ $item->item_id }}"
                                        readonly>
                                </div>
                                <div class="form-group">
                                    <label for="message-text" class="col-form-label">Item Code:</label>
                                    <input type="text" class="form-control" name="item_code"
                                        value="{{ $item->item_code }}" required>
                                </div>
                                <div class="form-group">
                                    <label for="message-text" class="col-form-label">Item Name:</label>
                                    <input type="text" class="form-control" name="item_name"
                                        value="{{ $item->item_name }}" required>
                                    {{-- <input type="hidden" name="brand_id" value="{{ $brand->brand_id }}"> --}}
                                </div>
                                <div class="form-group">
                                    <label for="message-text" class="col-form-label">Room Name:</label>
                                    @isset($rooms)
                                    @if (!empty($rooms))
                                    <select name="room_id" id="selectRoomName" class="form-control">
                                        <option>-- select room --</option>
                                        @foreach ($rooms as $room)
                                        <option {{ $item->room->room_id == $room->room_id ? "selected" : "" }}
                                            value="{{$room->room_id}}">
                                            {{$room->room_name}}</option>
                                        @endforeach
                                    </select>
                                    @endif
                                    @else
                                    <label for="message-text" class="col-form-label">Please add room first</label>
                                    @endisset
                                </div>
                                <div class="form-group">
                                    <label for="message-text" class="col-form-label">Type Name:</label>
                                    @isset($itemTypes)
                                    @if (!empty($itemTypes))
                                    <select name="item_type_id" id="selectItemType" class="form-control">
                                        <option>-- select type --</option>
                                        @foreach ($itemTypes as $itemType)
                                        <option {{ $item->item_type->type_id == $itemType->type_id ? "selected" : "" }}
                                            value="{{$itemType->type_id}}">
                                            {{$itemType->type_name}}</option>
                                        @endforeach
                                    </select>
                                    @endif
                                    @else
                                    <label for="message-text" class="col-form-label">Please add type first</label>
                                    @endisset
                                </div>
                                <div class="form-group">
                                    <label for="message-text" class="col-form-label">Brand name:</label>
                                    @isset($brands)
                                    @if (!empty($brands))
                                    <select name="brand_id" id="selectBrand" class="form-control">
                                        @if (isset($item->brand->brand_id))
                                        @foreach ($brands as $brand)
                                        <option {{ $item->brand->brand_id == $brand->brand_id }}
                                            value="{{$brand->brand_id}}">
                                            {{$brand->brand_name}}</option>
                                        @endforeach
                                        @else
                                        <option>-- select brand --</option>
                                        <option value="{{$brand->brand_id}}">
                                            {{$brand->brand_name}}</option>
                                        @endif
                                    </select>
                                    @endif
                                    @else
                                    <label for="message-text" class="col-form-label">Please add brand first</label>
                                    @endisset
                                </div>
                                <div class="form-group">
                                    <label for="message-text" class="col-form-label">Serial Number:</label>
                                    <input type="text" class="form-control" name="serial_number"
                                        value="{{ $item->serial_number??"-" }}" required>
                                </div>
                                <div class="form-group">
                                    <label for="message-text" class="col-form-label">Model:</label>
                                    <input type="text" class="form-control" name="item_model"
                                        value="{{ $item->model??"-" }}" required>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <input type="submit" class="btn btn-primary" value="Save change">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {{-- <!-- end Modal Edit --> --}}

            <!-- Modal Delete -->
            <div class="modal fade" id="delete-{{ $item->item_id  }}" tabindex="-1" role="dialog"
                aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Delete</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <input type="hidden" name="delID" value="{{ $item->item_id  }}">
                            Do you confirm to delete "{{ $item->item_name }}"?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <a href="items/del/{{ $item->item_id }}" class="btn btn-primary">Del</a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end Modal Delete -->
            @endforeach
        </tbody>
    </table>
    <br>
    <button type="button" class="btn btn-primary">Download CSV</button>
    <!-- Button trigger modal Add -->
    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#AddItem">
        Add Item
    </button>
    <!-- Modal Add -->
    <div class="modal fade" id="AddItem" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <form action="items/create" method="POST">
                    @csrf
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Add Item</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">

                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Item Code:</label>
                            <input type="text" class="form-control" name="item_code" required>
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Item Name:</label>
                            <input type="text" class="form-control" name="item_name" required>
                        </div>
                        {{-- <div class="form-group">
                                    <label for="message-text" class="col-form-label">Room Code:</label>
                                    <input type="text" class="form-control" name="room_code"
                                         required>
                                </div> --}}
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Room Name:</label>
                            <input type="" class="form-control" name="room_name" required>
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Type Name:</label>
                            <input type="text" class="form-control" name="type_name" required>
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Brand name:</label>
                            <input type="text" class="form-control" name="brand_name" required>
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Serial Number:</label>
                            <input type="text" class="form-control" name="serial_number" required>
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Model:</label>
                            <input type="text" class="form-control" name="item_model" required>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Add</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- end Modal Add -->

</div>
<br>
<br>
</div>
@endsection