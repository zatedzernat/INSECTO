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
    @if (session('del_building'))
    <div class="alert alert-success" role="alert">
        {{ session('del_building') }}
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
                    {{$loop->iteration}}
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
                                            <label for="message-text" class="col-form-label">ID: &nbsp; {{ $building->building_id }}</label>
                                            <input type="hidden" class="form-control" name="building_id"
                                                value="{{ $building->building_id }}" readonly>
                                        </div>
                                        <div class="form-group">
                                            <label for="message-text" class="col-form-label">Code: &nbsp; {{ $building->building_code  }}</label>
                                            <input type="hidden" class="form-control" name="building_code"
                                                value="{{ $building->building_code  }}" readonly>
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
                    <div class="modal fade text-dark" id="delete-{{ $building->building_id }}" tabindex="-1"
                        role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                                    {{ $building->building_name }}"? <br>
                                    <span style="color: red;">*** All rooms and items that relate to
                                        {{ $building->building_code }} will be deleted too ***</span>
                                </div>
                                <div class="modal-footer">
                                    <form action="building/del/{{ $building->building_id }}" method="POST">
                                        @csrf
                                        <button type="button" class="btn btn-secondary"
                                            data-dismiss="modal">Cancel</button>
                                        <button type="submit" class="btn btn-primary">Yes</button>
                                    </form>
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

    <form action="building/create" method="POST" id="frmProduct">
        @csrf
        <button type="button" class="btn btn-primary">Import CSV</button>
        <button type="button" class="btn btn-primary">Export CSV</button>
        <!-- Button trigger modal Add -->
        <button type="button" class="btn btn-success" data-toggle="modal" data-target="#AddItem">
            Add Building
        </button>
        <!-- Modal Add -->
        <div class="modal fade" id="AddItem" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Add Building</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Code:</label>
                            <input type="text" class="form-control" name="building_code" required>
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Name:</label>
                            <input type="text" class="form-control" name="building_name" required>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal"
                            id="close-btn">Close</button>
                        <button type="submit" class="btn btn-primary">Add</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- end Modal Add -->

    </form>
</div>
<script>
    document.getElementById("close-btn").addEventListener("click", function(){ 
   document.getElementById("frmProduct").reset();
});
</script>

@endsection