@extends('master')

@section('title')
Problem Report on this Item
@endsection

@section('content')
<br>
<div class="container">
    {{-- <h4>Problem Report on {{ $item->item_code }}</h4> --}}
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
    <!-- Modal -->
    <div class="modal fade" id="checkprob" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">ปัญหาของ {{ $item->item_code }} ที่ถูกแจ้ง</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    @foreach ($problemsNotResolved as $problemNotResolved)
                    <div class="card">
                        <div class="card-header">
                            <label for="message-text" class="col-form-label">
                                {{ $problemNotResolved->problem_description }}</label>
                        </div>
                        <div class="card-body">
                            <div class="form-group">
                                <label for="message-text" class="col-form-label">Status:
                                    {{ $problemNotResolved->status->status_name }}</label> <br>
                                <label for="message-text" class="col-form-label">Date:
                                    {{ $problemNotResolved->updated_at->day }}/{{ $problemNotResolved->updated_at->month  }}/{{ $problemNotResolved->updated_at->year  }}</label>
                                <br>
                                <label for="message-text" class="col-form-label">Time:
                                    {{ $problemNotResolved->updated_at->format('H:i:s') }}
                                    ({{ $problemNotResolved->updated_at->diffForHumans() }})</label>
                            </div>
                        </div>
                    </div>
                    @endforeach
                </div>
                <div class="modal-footer">
                    <a onclick="document.getElementById('show-form').submit();">
                        <button type="submit" style="float: right; margin-bottom: 20px"
                            class="btn btn-primary">แจ้งปัญหาเพิ่มเติม</button>
                    </a>
                    <form id="show-form" action="/send-problem/showForm/{{ $item->item_code }}" method="POST"
                        style="display: none;">
                        @csrf
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- end Modal -->
    <br>
</div>
<script>
    $(document).ready(function() {
        $('#checkprob').modal('show');
    });
</script>
@endsection