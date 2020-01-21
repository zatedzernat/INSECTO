@extends('master')

@section('title')
Actions
@endsection

@section('head')
@endsection
@section('content')
<br>
<div align="center">
    <h3>ALL Actions</h3>
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

    <table id="example" class="table table-striped table-borderedv table-dark" style="width:100%">
        <thead>
            <tr>
                {{-- <th>#</th> --}}
                <th>Action</th>
                <th>Code</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>

            @foreach ($actions as $action)
            <tr>
                {{-- <td>
                    {{ $loop->iteration }}
                </td> --}}
                <td>
                    {{ $action->action_id }}
                </td>
                <td>
                    {{ $action->action_code }}
                </td>
                <td>
                    {{ $action->action_description }}
                </td>
            </tr>
            @endforeach

        </tbody>
    </table>
    <br>

</div>
@endsection