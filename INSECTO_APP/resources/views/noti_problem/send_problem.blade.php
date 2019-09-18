@extends('master')

@section('title')
Send Problem
@endsection

@section('content')
<br>
<div class="container">
    <h3>Send Problem</h3>
    <br>

    @if (count($errors)>0)
            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                    <li>{{$error}}</li>
                    @endforeach
                </ul>
            </div>
    @endif
    <form method="post" action="/send-problem/send">
        @csrf
        <div class="form-row">
            <div class="form-group col-md-2">
                <label for="inputEmail4">Room</label>
                @isset($item)
                    @if (!empty($item))
                    <input type="text" name="room_name" class="form-control"  value="{{$item->room->room_name}}" readonly>
                    <input type="hidden" name="room_id" value="{{$item->room->room_id}}">
                    @endif
                    @else
                    <input type="text" name="room_name" class="form-control" placeholder="room_name">
                    @endisset
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-2">
                    <label for="inputAddress">Item Code</label>
                    @isset($item)
                    @if (!empty($item))
                    <input type="text" name="item_code" class="form-control"  value="{{$item->item_code}}" readonly>
                    <input type="hidden" name="item_id" value="{{$item->item_id}}">
                    @endif
                    @else
                    <input type="text" name="item_id" class="form-control" placeholder="item_code">
                @endisset
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-2">
                <label for="inputAddress2">Item Name</label>
                @isset($item)
                    @if (!empty($item))
                    <input type="text" name="item_name" class="form-control" value="{{$item->item_name}}" readonly>
                    @endif
                    @else
                    <input type="text" name="item_name" class="form-control" placeholder="item_name">
                @endisset
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-3">
                <label for="inputState">Problem</label>
                @isset($item)
                    @if (!empty($item))
                    <select name="problem_des_id" id="selectProblem" class="form-control" onchange="checkEtc()">
                        <option selected>-- select problems --</option>
                        @foreach ($item->item_type->problem_descriptions as $problem_desc)
                        <option value="{{$problem_desc->problem_des_id}}">{{$problem_desc->problem_description}}</option>
                        @endforeach
                        <option value="etc">อื่นๆ</option>
                    </select>
                    @endif
                    @else
                    <input type="text" class="form-control" placeholder="problem" name="problem_description">
                @endisset
            </div>
            <div class="form-group col-md-2" style="display: none" id="problemEtc" >
                <label for="inputZip">Problem Description</label>
                <input type="text" class="form-control" name="problem_description">
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</div>

<script>
    function checkEtc() {
        var selected = document.getElementById('selectProblem').value;
        if(selected == "etc") {
            document.getElementById('problemEtc').style.display ="";
        }else {
            document.getElementById('problemEtc').style.display = "none";
        }
    }
</script>
@endsection