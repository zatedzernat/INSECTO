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
    @if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
    @endif

    @if (session('del_itemType'))
    <div class="alert alert-success" role="alert">
        {{ session('del_itemType') }}
    </div>
    @endif
    <table id="example" class="table table-striped table-borderedv table-dark" style="width:100%">
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Created at</th>
                <th>Updated at</th>
                <th>Update by</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($item_types as $item_type)
            <tr>
                <td>
                    {{ $loop->iteration }}
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
                <td>

                    <!-- Button trigger modal Edit -->
                    <button type="button" class="btn btn-warning" data-toggle="modal"
                        data-target="#edit-{{ $item_type->type_id }}">
                        Edit
                    </button>

                    <!-- Button trigger modal Del -->
                    <button type="button" class="btn btn-danger" data-toggle="modal"
                        data-target="#delete-{{ $item_type->type_id }}">
                        Del
                    </button>
                </td>
            </tr>

            <!-- Modal Edit -->
            <div class="modal fade" id="edit-{{ $item_type->type_id }}" tabindex="-1" role="dialog"
                aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <form action="/item_type/edit" method="post">
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
                                    <input type="text" class="form-control" name="type_id"
                                        value="{{ $item_type->type_id }}" readonly>
                                </div>
                                <div class="form-group">
                                    <label for="message-text" class="col-form-label">Name:</label>
                                    <input type="text" class="form-control" name="type_name"
                                        value="{{ $item_type->type_name }}" required>
                                    {{-- <input type="hidden" name="brand_id" value="{{ $brand->brand_id }}"> --}}
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
            <!-- end Modal Edit -->

            <!-- Modal Delete -->
            <div class="modal fade" id="delete-{{ $item_type->type_id }}" tabindex="-1" role="dialog"
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
                            <input type="hidden" name="delID" value="{{ $item_type->type_id }}">
                            Do you confirm to delete "{{ $item_type->type_name }}"?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <a href="item_type/del/{{ $item_type->type_id }}" class="btn btn-primary">Del</a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end Modal Delete -->

            @endforeach
        </tbody>
    </table>
    <br>
    <button type="button" class="btn btn-primary">Import CSV</button>
    <button type="button" class="btn btn-primary">Export CSV</button>

    <!-- Button trigger modal Add -->
    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#AddItem">
        Add Item Type
    </button>

    <!-- Modal Add -->
    <div class="modal fade" id="AddItem" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <form action="/item_type/create" method="POST">
                    @csrf
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Add Item Type</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Name:</label>
                            <input type="text" class="form-control" name="type_name" required>
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