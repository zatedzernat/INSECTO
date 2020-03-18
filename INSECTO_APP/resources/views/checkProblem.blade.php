@extends('master')

@section('title')
Check Same Problem
@endsection

@section('content')
<br>
<div class="container">
    {{-- <h3 style="text-align: center">Check Same Problem</h3> --}}
    <br>

    @if (count($errors)>0)
    <div class="alert alert-danger">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        <ul>
            @foreach ($errors->all() as $error)
            <li>{{$error}}</li>
            @endforeach
        </ul>
    </div>
    @endif
    @isset($noti_prob)

    <form method="post" action="/send-problem/create">
        @csrf
        <!-- Modal -->
        <div class="modal fade" id="checkprob" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        @if (empty($problem_description))
                        <h5 class="modal-title" id="exampleModalLongTitle">ปัญหานี้ถูกแจ้งเข้ามาแล้ว</h5>
                        {{-- @else
                        <h5 class="modal-title" id="exampleModalLongTitle">ยืนยันแจ้งปัญหาเพิ่มเติม</h5> --}}
                        @endif
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            @if (empty($problem_description))
                            <label for="message-text" class="col-form-label">Room:
                                {{ $noti_prob->item->room->room_name }}</label> <br>
                            <label for="message-text" class="col-form-label">Item Code:
                                {{ $noti_prob->item->item_code }}</label> <br>
                            <label for="message-text" class="col-form-label">Item Name:
                                {{ $noti_prob->item->item_name }}</label> <br>
                            <label for="message-text" class="col-form-label">Problem Description:
                                {{ $noti_prob->problem_description }}</label> <br>
                            <label for="message-text" class="col-form-label">Status:
                                {{ $noti_prob->status->status_name }}</label> <br>
                            <label for="message-text" class="col-form-label">Date:
                                {{ $noti_prob->updated_at->day }}/{{ $noti_prob->updated_at->month  }}/{{ $noti_prob->updated_at->year  }}</label>
                            <br>
                            <label for="message-text" class="col-form-label">Time:
                                {{ $noti_prob->updated_at->format('H:i:s') }}
                                ({{ $noti_prob->updated_at->diffForHumans() }})</label> <br>
                            {{-- @else
                            <label for="message-text" class="col-form-label">Problem Description:
                                {{ $problem_description }}</label> <br> --}}
                            @endif
                        </div>
                    </div>
                    <div class="modal-footer">
                        {{-- @if (!empty($problem_description))
                        <button type="submit" class="btn btn-primary">ใช่</button>
                        <input type="hidden" name="problem_description" value="{{ $problem_description }}">
                        <input type="hidden" name="item_id" value="{{ $item_id }}">
                        <input type="hidden" name="problem_des_id" value="etc">
                        @endif --}}
                        <a href="/" class="btn btn-primary">หน้าแรก</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- end Modal -->
    </form>
    @endisset
</div>
<script>
    $(document).ready(function() {
        $('#checkprob').modal('show');
    });
</script>
@endsection