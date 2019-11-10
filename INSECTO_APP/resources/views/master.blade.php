<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>@yield('title')</title>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    {{-- Data table --}}
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.css">
    <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap4.min.js"></script>
    <script>
        $(document).ready(function() {
            $('#example').DataTable( {
            "lengthMenu": [ [15, 25, 50, -1], [15, 25, 50, "All"] ]
                } );
            });
            
            
    </script>

    {{-- bootstrap4 --}}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous">
    </script>

    @yield('head')

</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <img src="/img/bug.png" alt="bug" width="45px">
            <a class="navbar-brand" href="{{url('/')}}">INSECTO</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="{{url('/')}}">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{'/send-problem'}}">Send Problem</a>
                    </li>
                    {{-- <li class="nav-item">
                        <a class="nav-link" href="#">Admin</a>
                    </li> --}}
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            Admin
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a class="dropdown-item" href="/noti_problems">Notification Problems</a>
                            <a class="dropdown-item" href="/problem_descs">Problem Descriptions</a>
                            <a class="dropdown-item" href="/buildings">Building</a>
                            <a class="dropdown-item" href="/rooms">Rooms</a>
                            <a class="dropdown-item" href="/items">Items</a>
                            <a class="dropdown-item" href="/item_types">Item Types</a>
                            <a class="dropdown-item" href="/brands">Brands</a>
                            <a class="dropdown-item" href="/statuses">Statuses</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <br>

    @yield('content')
    {{-- @isset($status)
    <div class="alert alert-success">
        <p>{{$status}}</p>
    </div>
    @endisset --}}
    @if (session('status'))
    <div class="alert alert-success">
        <p>{{session('status')}}</p>
    </div>
    @endif
</body>

</html>