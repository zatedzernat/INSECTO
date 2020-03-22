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
    @if (count($errors)>0)
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <ul>
            @foreach ($errors->all() as $error)
            <li><strong>System: </strong>{{$error}}</li>
            @endforeach
        </ul>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    @endif
    @if (session('changeComplete'))
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>System: </strong> {{ session('changeComplete') }}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    @endif
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
                    {{ $loop->iteration }}
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

            <!-- detail Modal -->
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
                                <label for="message-text" class="col-form-label">Status:
                                    {{ $noti_problem->status->status_name }}</label>
                            </div>
                            @isset($noti_problem->help_desk_code)
                            <div class="form-group">
                                <label for="message-text" class="col-form-label">HDC:
                                    {{ $noti_problem->help_desk_code }}</label>
                            </div>
                            @endisset
                            @isset($noti_problem->note)
                            <div class="form-group">
                                <label for="message-text" class="col-form-label">Note:
                                    {{ $noti_problem->note }}</label>
                            </div>
                            @endisset
                        </div>
                        <div class="modal-footer">
                            <form action="noti_problem/edit/{{ $noti_problem->noti_id }}" method="POST">
                                @csrf
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                @if ( $noti_problem->status->status_name == 'waiting')
                                <!-- Button hdc modal -->
                                <button type="button" class="btn btn-info" data-toggle="modal"
                                    data-target="#hdc-{{ $noti_problem->noti_id }}">
                                    Open
                                </button>
                                @elseif ( $noti_problem->status->status_name == 'open' ||
                                $noti_problem->status->status_name == 'reopen')
                                <button type="submit" class="btn btn-primary" name="next_status" value="on hold">On
                                    Hold</button>
                                <button type="submit" class="btn btn-primary" name="next_status"
                                    value="queue">Queue</button>

                                <button type="submit" class="btn btn-primary" name="next_status" value="in progress">In
                                    Progress</button>
                                @elseif ( $noti_problem->status->status_name == 'on hold')
                                <button type="submit" class="btn btn-primary" name="next_status"
                                    value="queue">Queue</button>
                                <button type="submit" class="btn btn-primary" name="next_status" value="in progress">In
                                    Progress</button>
                                <button type="button" class="btn btn-success" data-toggle="modal"
                                    data-target="#res-{{ $noti_problem->noti_id }}">
                                    Resolved
                                </button>
                                @elseif ($noti_problem->status->status_name == 'queue')
                                <button type="submit" class="btn btn-primary" name="next_status" value="on hold">On
                                    Hold</button>
                                <button type="submit" class="btn btn-primary" name="next_status" value="in progress">In
                                    Progress</button>
                                @elseif ( $noti_problem->status->status_name == 'in progress')
                                <button type="submit" class="btn btn-primary" name="next_status" value="on hold">On
                                    Hold</button>
                                <!-- Button res modal -->
                                <button type="button" class="btn btn-success" data-toggle="modal"
                                    data-target="#res-{{ $noti_problem->noti_id }}">
                                    Resolved
                                </button>
                                @elseif ( $noti_problem->status->status_name == 'resolved')
                                <!-- Button hdc modal -->
                                <button type="button" class="btn btn-warning" data-toggle="modal"
                                    data-target="#hdc-{{ $noti_problem->noti_id }}">
                                    Re-open
                                </button>
                                @endif
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End detail Modal -->

            <!-- hdc Modal -->
            <div class="modal fade" id="hdc-{{ $noti_problem->noti_id }}" tabindex="-1" role="dialog"
                aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <form action="noti_problem/edit/{{ $noti_problem->noti_id }}" method="POST">
                            @csrf
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">Help Desk Code</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label for="message-text" class="col-form-label">Help Desk Code<span
                                            style="color: red">*</span>:</label>
                                    <input type="text" id="HDC" class="form-control" name="help_desk_code"
                                        value="{{ $noti_problem->help_desk_code }}" required>
                                    <input type="hidden" name="next_status" value="open">
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <!-- End hdc Modal -->
            <!-- res Modal -->
            <div class="modal fade" id="res-{{ $noti_problem->noti_id }}" tabindex="-1" role="dialog"
                aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <form action="noti_problem/edit/{{ $noti_problem->noti_id }}" method="POST">
                            @csrf
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">Task Resolved</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label for="message-text" class="col-form-label">Note<span
                                            style="color: red">*</span>:</label>
                                    <input type="text" id="NOTE" class="form-control" name="note"
                                        value="{{ $noti_problem->note }}" required>
                                    <input type="hidden" name="next_status" value="resolved">
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <!-- End cls Modal -->
            @endforeach
        </tbody>
    </table>


    <br>
    {{-- <button type="button" class="btn btn-primary">Import CSV</button>
    <button type="button" class="btn btn-primary">Export CSV</button> --}}
</div>
@endsection