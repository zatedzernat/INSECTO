@extends('master')

@section('title')
History Logs
@endsection

@section('content')
<br>
<div align="center">
    <h3>ALL History Logs</h3>
</div>
<br>
<div class="container">
    @if ($errors->any())
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        <ul>
            @foreach ($errors->all() as $error)
            <li><strong>System: </strong>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
    @endif

    <table id="example" class="table table-striped table-borderedv table-dark" style="width:100%">
        <thead>
            <tr>
                <th>#</th>
                <th>Model</th>
                <th>Event</th>
                <th>old values</th>
                <th>new values</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>User</th>
                <th>IP</th>
            </tr>
        </thead>
        <tbody>

            @foreach ($logs as $log)
            <tr>
                <td>
                    {{ $loop->iteration }}
                </td>
                <td>
                    {{ last(explode('\\',$log->auditable_type)) }}
                </td>
                <td>
                    {{ $log->event }}
                </td>
                <td>
                    @if (empty($log->old_values))
                    -
                    @else
                    @foreach ($log->old_values as $key => $value)
                    {{ $key }}: {{ $value }}
                    @endforeach
                    @endif
                </td>
                <td>
                    @foreach ($log->new_values as $key => $value)
                    {{ $key }}: {{ $value }} <br>
                    @endforeach
                </td>
                <td>
                    {{ $log->created_at }}
                </td>
                <td>
                    {{ $log->updated_at }}
                </td>
                <td>
                    {{ $log->user->name }}
                </td>
                <td>
                    {{ $log->ip_address }}
                </td>
            </tr>
            @endforeach

        </tbody>
    </table>

    <br>
</div>
@endsection