@extends('master')

@section('title')
Buildings
@endsection

@section('content')
<br>
<div align="center">
    <h3>ALL Buildings</h3>
</div>
<br>
<div class="container">
    @if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
    @endif
    <table id="example" class="table table-striped table-borderedv table-dark" style="width:100%">
        <thead>
            <tr>
                <th>#</th>
                <th>Code</th>
                <th>Name</th>
                <th>Created at</th>
                <th>Updated at</th>
                <th>Update by</th>
                <th>Action</th>

            </tr>
        </thead>
        <tbody>
            @foreach ($buildings as $building)
            <tr>
                <td>
                    {{$building->building_id}}
                </td>
                <td>
                    {{$building->building_code}}
                </td>
                <td>
                    {{$building->building_name}}
                </td>
                <td>
                    {{$building->created_at}}
                </td>
                <td>
                    {{$building->updated_at}}
                </td>
                <td>
                    {{$building->update_by}}
                </td>
                <td>
                    <button type="button" class="btn btn-warning" data-toggle="modal"
                        data-target="#edit-{{ $building->building_id }}">Edit</button>
                    <button type="button" class="btn btn-danger" data-toggle="modal"
                        data-target="#delete-{{ $building->building_id }}">
                        Del
                    </button>
                    <!-- Modal Edit -->
                    <div class="modal fade text-dark" id="edit-{{ $building->building_id }}" tabindex="-1" role="dialog"
                        aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <form action="/building/edit" method="post">
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
                                            <input type="text" class="form-control" name="building_id"
                                                value="{{ $building->building_id }}" readonly>
                                        </div>
                                        <div class="form-group">
                                            <label for="message-text" class="col-form-label">Name:</label>
                                            <input type="text" class="form-control" name="building_code"
                                                value="{{ $building->building_code  }}" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="message-text" class="col-form-label">Name:</label>
                                            <input type="text" class="form-control" name="building_name"
                                                value="{{ $building->building_name }}" required>
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
                    <div class="modal fade text-dark" id="delete-{{ $building->building_id }}" tabindex="-1" role="dialog"
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
                                    <input type="hidden" name="delID" value="{{ $building->building_id }}">
                                    Do you confirm to delete "{{ $building->building_code }} -
                                    {{ $building->building_name }}"?
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                    <a href="building/del/{{ $building->building_id }}" class="btn btn-primary">Del</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- end Modal Delete -->
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <form action="building/create" method="POST">
        @csrf
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
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Add Item</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Code: <input type="text" name="building_code" required>
                        Name: <input type="text" name="building_name" required>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Save change</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- end Modal Add -->

    </form>
</div>


@endsection