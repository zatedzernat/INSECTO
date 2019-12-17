@extends('master')

@section('title')
Problem Descriptions
@endsection

@section('content')
<br>
<div align="center">
    <h3>ALL Problem Descriptions</h3>
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
    @if (session('del_problem_desc'))
    <div class="alert alert-success" role="alert">
        {{ session('del_problem_desc') }}
    </div>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
    @endif
    <table id="example" class="table table-striped table-borderedv table-dark" style="width:100%">
        <thead>
            <tr>
                <th>#</th>
                <th>Problem Description <span style="color: red">*</span></th>
                <th>Type <span style="color: red">*</span></th>
                <th>Created at</th>
                <th>Updated at</th>
                <th>Update by</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($problems_descs as $problem_desc)
            <tr>
                <td>
                    {{$loop->iteration}}
                </td>
                <td>
                    {{$problem_desc->problem_description}}
                </td>
                <td>
                    {{$problem_desc->item_type->type_name}}
                </td>
                <td>
                    {{$problem_desc->created_at}}
                </td>
                <td>
                    {{$problem_desc->updated_at}}
                </td>
                <td>
                    {{$problem_desc->update_by}}
                </td>
                <td>
                    <button type="button" class="btn btn-warning" data-toggle="modal"
                        data-target="#edit-{{ $problem_desc->problem_des_id }}">Edit</button>
                    <button type="button" class="btn btn-danger" data-toggle="modal"
                        data-target="#delete-{{ $problem_desc->problem_des_id }}">
                        Del
                    </button>
                    <!-- Modal Edit -->
                    <div class="modal fade text-dark" id="edit-{{ $problem_desc->problem_des_id }}" tabindex="-1"
                        role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <form action="/problem_desc/edit" method="post">
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
                                            <input type="text" class="form-control" name="problem_des_id"
                                                value="{{ $problem_desc->problem_des_id }}" readonly>
                                        </div>
                                        <div class="form-group">
                                            <label for="message-text" class="col-form-label">Problem
                                                Description:</label>
                                            <input type="text" class="form-control" name="problem_description"
                                                value="{{ $problem_desc->problem_description  }}" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="message-text" class="col-form-label">Type:</label>
                                            @isset($types)
                                            @if (!empty($types))
                                            <select class="custom-select" name="type_id">
                                                <option selected value="">Open this select menu</option>
                                                @foreach ($types as $type)
                                                <option value="{{ $type->type_id }}" @if ($problem_desc->
                                                    item_type->type_id ==
                                                    $type->type_id ) {{'selected="selected"'}}
                                                    @endif>
                                                    {{ $type->type_name }}</option>
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
                    <div class="modal fade text-dark" id="delete-{{ $problem_desc->problem_des_id }}" tabindex="-1"
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
                                    <input type="hidden" name="delID" value="{{ $problem_desc->problem_des_id }}">
                                    Do you confirm to delete "{{ $problem_desc->problem_description }}"?
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                    <a href="problem_desc/del/{{ $problem_desc->problem_des_id }}"
                                        class="btn btn-primary">Del</a>
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
    <form action="problem_desc/create" method="POST">
        @csrf
        <button type="button" class="btn btn-primary">Import CSV</button>
        <button type="button" class="btn btn-primary">Export CSV</button>
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
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Problem Description:</label>
                            <input type="text" class="form-control" name="problem_description" required>
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Type:</label>
                            @isset($types)
                            @if (!empty($types))
                            <select class="custom-select" name="type_id">
                                <option selected value="">Open this select menu</option>
                                @foreach ($types as $type)
                                <option value="{{ $type->type_id }}">{{ $type->type_name }}</option>
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
                </div>
            </div>
        </div>
        <!-- end Modal Add -->

    </form>
    <br><br>
</div>
@endsection