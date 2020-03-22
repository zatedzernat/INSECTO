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
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        <ul>
            @foreach ($errors->all() as $error)
            <li><strong>System: </strong>{{$error}}</li>
            @endforeach
        </ul>
    </div>
    @endif
    <form method="post" action="/send-problem/check" onsubmit="return addValue()">
        @csrf
        <div class="form-row">
            <div class="form-group col-md-2">
                <label for="inputEmail4">Room</label>
                @isset($item)
                @if (!empty($item))
                <input type="text" name="room_name" class="form-control" value="{{$item->room->room_name}}" readonly>
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
                <input type="text" name="item_code" class="form-control" value="{{$item->item_code}}" readonly>
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
            <div class="form-group col-md-2">
                <label for="inputState">Problem</label> <span style="color: red;">*</span>
                @isset($item)
                @if (!empty($item))
                <select name="problem_des_id" id="selectProblem" class="form-control" onchange="checkEtc()">
                    <option selected value="">- select problem - </option>
                    @foreach ($item->item_type->problem_descriptions as $problem_desc)
                    @if ($problem_desc->cancel_flag == 'N')
                    <option value="{{ $problem_desc->problem_des_id }}">{{ $problem_desc->problem_description }}</option>
                    @endif
                    @endforeach
                    <option value="etc">อื่นๆ</option>
                </select>
                @endif
                @else
                <input type="text" class="form-control" placeholder="problem" name="problem_description">
                @endisset
            </div>
            <div class="form-group col-md-2" style="display: none" id="problemEtc">
                <label for="inputZip">Problem Description</label><span style="color: red;">*</span>
                <input type="text" class="form-control" name="problem_description" id="probETC">
            </div>
        </div>
        <button type="submit" style="float: right" class="btn btn-primary">Submit</button>
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
    function addValue() {
        if (document.getElementById('selectProblem').value == "") {
            alert("Please Enter Problem");
            return false;
        }else if (document.getElementById('selectProblem').value == "etc") {
            if (document.getElementById('probETC').value == "") {
                alert("Please Enter Problem Description");
                return false;
            }
        }
        return true;
    }
</script>
@endsection