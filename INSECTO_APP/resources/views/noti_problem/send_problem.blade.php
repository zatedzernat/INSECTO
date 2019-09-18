@extends('master')

@section('title')
Send Problem
@endsection

@section('content')
<br>
<div class="container">
    <h3>Send Problem</h3>
    <br>
    @isset($hasItem)
    @if (!$hasItem)
    <div class="alert alert-danger">
        <h3>Item Not Found!!!</h3>
    </div>
    @endif
    @endisset

    @if (count($errors)>0)
            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                    <li>{{$error}}</li>
                    @endforeach
                </ul>
            </div>
    @endif
    <form method="post" action="/problem/send">
        @csrf
        <div class="form-row">
            <div class="form-group col-md-2">
                <label for="inputEmail4">Room Name</label>
                @isset($item)
                    @if (!empty($item))
                    <input type="text" name="room_name" class="form-control" placeholder="room_name" value="{{$item->room->room_name}}" readonly>
                    @endif
                    @else
                    <input type="text" name="room_name" class="form-control" placeholder="room_name">
                @endisset
            </div>
            <div class="form-group col-md-1">
                <label for="inputPassword4">Floor</label>
                @isset($item)
                    @if (!empty($item))
                    <input type="text" name="floor" class="form-control" placeholder="floor" value="{{$item->room->floor}}" readonly>
                    @endif
                    @else
                    <input type="text" name="floor" class="form-control" placeholder="floor">
                @endisset
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-2">
                <label for="inputAddress">Item ID</label>
                @isset($item)
                    @if (!empty($item))
                    <input type="text" name="item_id" class="form-control" placeholder="item_id" value="{{$item->item_id}}" readonly>
                    @endif
                    @else
                    <input type="text" name="item_id" class="form-control" placeholder="item_id">
                @endisset
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-2">
                <label for="inputAddress2">Item Name</label>
                @isset($item)
                    @if (!empty($item))
                    <input type="text" name="item_name" class="form-control" placeholder="item_name" value="{{$item->item_name}}" readonly>
                    @endif
                    @else
                    <input type="text" name="item_name" class="form-control" placeholder="item_name">
                @endisset
            </div>
        </div>
        @isset($item)
                    @if (!empty($item))
                    <div class="form-row">
                            <div class="form-group col-md-2">
                                <label for="inputAddress2">Image</label>
                                <img src="/img/{{$item->picture}}" alt="image not found" width="200px">
                            </div>
                        </div>
                    @endif
        @endisset
        <div class="form-row">
            <div class="form-group col-md-4">
                <label for="inputState">Problem</label>
                @isset($problems_det)
                    @if (!empty($problems_det))
                    <select name="problem_detail_id" id="selectProblem" class="form-control" onchange="checkEtc()">
                        <option selected>-- select problems --</option>
                        @foreach ($problems_det as $problem_detail)
                        <option value="{{$problem_detail->problem_detail_id}}">{{$problem_detail->problem_descriptions->problem_des}}</option>
                        @endforeach
                        <option value="etc">etc</option>
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