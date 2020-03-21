@extends('master')

@section('title')
Rooms
@endsection

@section('content')
<br>
<div align="center">
    <h3>ALL Rooms</h3>
</div>
<br>
<div class="container">
    @if ($errors->any())
    <div class="alert alert-danger">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        <ul>
            @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
    @endif
    @if (session('del_room'))
    <div class="alert alert-success" role="alert">
        {{ session('del_room') }}
    </div>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
    @endif
    <table id="example" class="table table-striped table-borderedv table-dark" style="width:100%">
        <thead>
            <tr>
                <th>#</th>
                <th>Code <span style="color: red">*</span></th>
                <th>Name</th>
                <th>Building</th>
                <th>Created at</th>
                <th>Updated at</th>
                <th>Update by</th>
                <th>Action</th>
            </tr>

        </thead>
        <tbody>
            @foreach ($rooms as $room)
            <tr>
                <td>
                    {{$loop->iteration}}
                </td>
                <td>
                    {{$room->room_code}}
                </td>
                <td>
                    {{$room->room_name}}
                </td>
                <td>
                    {{$room->building->building_name}}
                </td>
                <td>
                    {{$room->created_at}}
                </td>
                <td>
                    {{$room->updated_at}}
                </td>
                <td>
                    {{$room->update_by}}
                </td>
                <td>
                    <button type="button" class="btn btn-warning" data-toggle="modal"
                        data-target="#edit-{{ $room->room_id }}">Edit</button>
                    <button type="button" class="btn btn-danger" data-toggle="modal"
                        data-target="#delete-{{ $room->room_id }}">
                        Del
                    </button>
                    <!-- Modal Edit -->
                    <div class="modal fade text-dark" id="edit-{{ $room->room_id }}" tabindex="-1" role="dialog"
                        aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <form action="/room/edit" method="post">
                                    @csrf
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLongTitle">Edit</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="form-group">
                                            <label for="message-text" class="col-form-label">ID: &nbsp;
                                                {{ $room->room_id }}</label>
                                            <input type="hidden" class="form-control" name="room_id"
                                                value="{{ $room->room_id }}" readonly>
                                        </div>
                                        <div class="form-group">
                                            <label for="message-text" class="col-form-label">Code: &nbsp;
                                                {{ $room->room_code  }}</label>
                                            <input type="hidden" class="form-control" name="room_code"
                                                value="{{ $room->room_code  }}" readonly>
                                        </div>
                                        <div class="form-group">
                                            <label for="message-text" class="col-form-label">Name:</label>
                                            <input type="text" class="form-control" name="room_name"
                                                value="{{ $room->room_name }}" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="message-text" class="col-form-label">Building:</label>
                                            @isset($buildings)
                                            @if (!empty($buildings))
                                            <select class="custom-select" name="building_id">
                                                <option selected>Open this select menu</option>
                                                @foreach ($buildings as $building)
                                                <option value="{{ $building->building_id }}" @if ($room->
                                                    building->building_id ==
                                                    $building->building_id ) {{'selected="selected"'}}
                                                    @endif>
                                                    {{ $building->building_name }}</option>
                                                @endforeach
                                            </select>
                                            @endif
                                            @else kk
                                            @endisset
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary"
                                            data-dismiss="modal">Close</button>
                                        <input type="submit" class="btn btn-primary" value="Save change">
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {{-- <!-- end Modal Edit --> --}}
                    <!-- Modal Delete -->
                    <div class="modal fade text-dark" id="delete-{{ $room->room_id }}" tabindex="-1" role="dialog"
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
                                    <input type="hidden" name="delID" value="{{ $room->room_id }}">
                                    Do you confirm to delete "{{ $room->room_code }} -
                                    {{ $room->room_name }}"? <br>
                                    <span style="color: red;">*** All items that relate to
                                        {{ $room->room_code }} will be deleted too ***</span>
                                </div>
                                <div class="modal-footer">
                                    <form action="room/del/{{ $room->room_id }}" method="POST">
                                        @csrf
                                        <button type="button" class="btn btn-secondary"
                                            data-dismiss="modal">Cancel</button>
                                        <button type="submit" class="btn btn-primary">Yes</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
    {{-- <button type="button" class="btn btn-primary">Import CSV</button>
    <button type="button" class="btn btn-primary">Export CSV</button> --}}
    <!-- Button trigger modal Add -->
    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#AddItem">
        Add Room
    </button>
    <!-- Modal Add -->
    <div class="modal fade" id="AddItem" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <form action="room/create" method="POST">
                    @csrf
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Add Room</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Code:</label>
                            <input type="text" class="form-control" name="room_code" required>
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Name:</label>
                            <input type="text" class="form-control" name="room_name" required>
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Building:</label>
                            @isset($buildings)
                            @if (!empty($buildings))
                            <select class="custom-select" name="building_id">
                                <option selected value="">Open this select menu</option>
                                @foreach ($buildings as $building)
                                <option value="{{ $building->building_id }}">{{ $building->building_name }}</option>
                                @endforeach
                            </select>
                            @endif
                            @else kk
                            @endisset
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
@endsection