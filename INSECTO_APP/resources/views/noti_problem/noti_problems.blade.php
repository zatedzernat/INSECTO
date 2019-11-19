@extends('master')

@section('title')
Notication Problems
@endsection

@section('content')
<br>
<div align="center">
    <h3>ALL Notification Problems</h3>
</div>
<br>
<div class="container">
    <table id="example" class="table table-striped table-borderedv table-dark" style="width:100%">
        <thead>
            <tr>
                <th>#</th>
                <th>Item Code</th>
                <th>Item Name</th>
                <th>Problem Description</th>
                <th>Room Code</th>
                <th>Status</th>
                <th>Updated at</th>
                <th>Update by</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($noti_problems as $noti_problem)
            <tr>
                <td>
                    {{$noti_problem->noti_id}}
                </td>
                <td>
                    {{$noti_problem->item->item_code}}
                </td>
                <td>
                    {{$noti_problem->item->item_name}}
                </td>
                <td>
                    {{$noti_problem->problem_description}}
                </td>
                <td>
                    {{$noti_problem->item->room->room_code}}
                </td>
                <td>
                    {{$noti_problem->status->status_name}}
                </td>
                <td>
                    {{$noti_problem->updated_at}}
                </td>
                <td>
                    {{$noti_problem->update_by}}
                </td>
                <td>
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary" data-toggle="modal"
                        data-target="#edit-{{ $noti_problem->noti_id }}">
                        Detail
                    </button>
                </td>
            </tr>

            <!-- Edit Modal -->
            <div class="modal fade" id="edit-{{ $noti_problem->noti_id }}" tabindex="-1" role="dialog"
                aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Detail</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="message-text" class="col-form-label">Created at:
                                    {{ $noti_problem->created_at }}</label>
                            </div>
                            <div class="form-group">
                                <label for="message-text" class="col-form-label">Problem Description ID:
                                    {{ $noti_problem->problem_des_id ?? "-" }}</label>
                            </div>
                            <div class="form-group">
                                <label for="message-text" class="col-form-label">Room Name:
                                    {{ $noti_problem->item->room->room_name }}</label>
                            </div>
                            <div class="form-group">
                                <label for="message-text" class="col-form-label">Sender IP:
                                    {{ $noti_problem->sender_ip }}</label>
                            </div>
                            <div class="form-group">
                                <label for="message-text" class="col-form-label">Status:</label>
                                <select name="status_id" class="form-control">
                                    @foreach ($statuses as $status)
                                    <option
                                        {{ $noti_problem->status->status_id == $status->status_id ? 'seledted' : '' }}
                                        value="{{ $status->status_id }}">{{ $status->status_name }}</option>
                                    @endforeach
                                </select>
                            </div>
                            @isset($noti_problem->help_desk_code)
                            <div class="form-group">
                                <label for="message-text" class="col-form-label">HDC: {{ $noti_problem->help_desk_code }}</label>
                            </div>
                            @endisset
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Edit</button>
                            <button type="button" class="btn btn-success">Resolved</button>
                            <button type="button" class="btn btn-warning">Re-open</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End Edit Modal -->
            @endforeach
        </tbody>
    </table>


    <br>
    <butto`n type="button" class="btn btn-primary">Import CSV</butto`n>
    <button type="button" class="btn btn-primary">Export CSV</button>
</div>
@endsection