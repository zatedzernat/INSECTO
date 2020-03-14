@extends('master')

@section('title')
Problem Report on this Item
@endsection

@section('content')
<br>
<div class="container">
    <h4>Problem Report on {{ $item->item_code }}</h4>
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
    @foreach ($problemsNotResolved as $problemNotResolved)
    <div class="form-group">
        <label for="message-text" class="col-form-label">{{ $loop->iteration }}:
            {{ $problemNotResolved->problem_description }}</label> <br>
        <label for="message-text" class="col-form-label">Status:
            {{ $problemNotResolved->status->status_name }}</label> <br>
        <label for="message-text" class="col-form-label">Time:
            {{ $problemNotResolved->updated_at->format('H:i:s') }}
            ({{ $problemNotResolved->updated_at->diffForHumans() }})</label>
    </div>
    @endforeach
    <a onclick="document.getElementById('show-form').submit();">
        <button type="submit" style="float: right" class="btn btn-primary">ส่งปัญหาเพิ่มเติม</button>
    </a>
    <form id="show-form" action="/send-problem/{{$item->$item_code}}" method="POST" style="display: none;">
        @csrf
    </form>
</div>

@endsection