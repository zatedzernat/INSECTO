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
                <th>Problem Description</th>
                <th>Type</th>
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
                        {{$problem_desc->problem_des_id}}
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
                        <div class="modal fade text-dark" id="edit-{{ $problem_desc->problem_des_id }}" tabindex="-1" role="dialog"
                            aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                                                <label for="message-text" class="col-form-label">Problem Desciption:</label>
                                                <input type="text" class="form-control" name="problem_description"
                                                    value="{{ $problem_desc->problem_description  }}" required>
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
                                        <a href="problem_desc/del/{{ $problem_desc->problem_des_id }}" class="btn btn-primary">Del</a>
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
</div>
@endsection