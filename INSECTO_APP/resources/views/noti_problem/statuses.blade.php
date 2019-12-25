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

    @if (session('del_status'))
    <div class="alert alert-success" role="alert">
        {{ session('del_status') }}
    </div>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
    @endif
    <table id="example" class="table table-striped table-borderedv table-dark" style="width:100%">
        <thead>
            <tr>
                <th>#</th>
                <th>Name <span style="color: red">*</span></th>
                <th>Description</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($statuses as $status)
            <tr>
                <td>
                    {{ $loop->iteration }}
                </td>
                <td>
                    {{$status->status_name}}
                </td>
                <td>
                    {{$status->status_description}}
                </td>
                <td>
                    {{$status->created_at}}
                </td>
                <td>
                    {{$status->updated_at}}
                </td>
                <td>
                    <!-- Button trigger modal Edit -->
                    <button type="button" class="btn btn-warning" data-toggle="modal"
                        data-target="#edit-{{ $status->status_id }}">
                        Edit
                    </button>
                    <!-- Button trigger modal Del -->
                    {{-- <button type="button" class="btn btn-danger" data-toggle="modal"
                        data-target="#delete-{{ $status->status_id }}">
                        Del
                    </button> --}}
                </td>
            </tr>

            <!-- Modal Edit -->
            <div class="modal fade" id="edit-{{ $status->status_id }}" tabindex="-1" role="dialog"
                aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <form action="/status/edit" method="post">
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
                                        {{ $status->status_id }}</label>
                                    <input type="hidden" class="form-control" name="status_id"
                                        value="{{ $status->status_id }}" readonly>
                                </div>
                                <div class="form-group">
                                    <label for="message-text" class="col-form-label">Name: &nbsp;
                                        {{ $status->status_name }} </label>
                                    <input type="hidden" class="form-control" name="status_name"
                                        value="{{ $status->status_name }}" required>
                                </div>
                                <div class="form-group">
                                    <label for="message-text" class="col-form-label">Description:</label>
                                    <input type="text" class="form-control" name="status_description"
                                        value="{{ $status->status_description }}" required>
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
            <div class="modal fade" id="delete-{{ $status->status_id }}" tabindex="-1" role="dialog"
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
                            <input type="hidden" name="delID" value="{{ $status->status_id }}">
                            Do you confirm to delete "{{ $status->status_name }}"?
                        </div>
                        <div class="modal-footer">
                            <form action="status/del/{{ $status->status_id }}" method="POST">
                                @csrf
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="submit" class="btn btn-primary">Del</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            @endforeach
        </tbody>
    </table>
    <br>
    {{-- <button type="button" class="btn btn-primary">Import CSV</button>
    <button type="button" class="btn btn-primary">Export CSV</button> --}}

    <!-- Button trigger modal Add -->
    {{-- <button type="button" class="btn btn-success" data-toggle="modal" data-target="#AddItem">
        Add Status
    </button> --}}

    <!-- Modal Add -->
    <div class="modal fade" id="AddItem" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <form action="status/create" method="POST">
                    @csrf
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Add Status</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Name:</label>
                            <input type="text" class="form-control" name="status_name" required>
                        </div>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Description:</label>
                            <input type="text" class="form-control" name="status_description" required>
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

    <br>
    <br>
</div>
@endsection