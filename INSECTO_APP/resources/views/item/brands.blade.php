@extends('master')

@section('title')
Brands
@endsection

@section('content')
<br>
<div align="center">
  <h3>ALL Brands</h3>
</div>
<br>
<div class="container">
  @if ($errors->any())
  <div class="alert alert-danger">
    <ul>
      @foreach ($errors->all() as $error)
      <li>{{ $error }}</li>
      @endforeach
    </ul>
  </div>
  @endif
  <form action="/brand/edit" method="post">
    @csrf
    <table id="example" class="table table-striped table-borderedv table-dark" style="width:100%">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Create At</th>
          <th>Update At</th>
          <th>Update By</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>

        @foreach ($brands as $brand)
        <tr>
          <td>
            {{-- {{$brand->brand_id}} --}}
            {{ $loop->iteration }}
          </td>
          <td>
            {{ $brand->brand_name }}
          </td>
          <td>
            {{$brand->created_at}}
          </td>
          <td>
            {{$brand->updated_at}}
          </td>
          <td>
            {{$brand->update_by}}
          </td>
          <td>
            <!-- Button trigger modal Edit -->
            <button type="button" class="btn btn-warning" data-toggle="modal"
              data-target="#exampleModalCenter-{{ $brand->brand_id }}">
              Edit
            </button>
            <button type="button" class="btn btn-danger">Del</button>
          </td>
        </tr>
        <!-- Modal Edit -->
        <div class="modal fade" id="exampleModalCenter-{{ $brand->brand_id }}" tabindex="-1" role="dialog"
          aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Edit</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <input type="hidden" name="hong" value="{{ $brand->brand_id }}">
                <input type="hidden" name="hong2" value="{{ $brand->brand_id }}">
                ID: {{ $brand->brand_id }} <br>
                Name: <input type="text" name="brand_name" value="{{ $brand->brand_name }}">
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Save change</button>
              </div>
            </div>
          </div>
        </div>
        @endforeach
        <!-- end Modal Edit -->

      </tbody>
    </table>
  </form>
  <br>
  <form action="brand/create" method="POST">
    @csrf
    <button type="button" class="btn btn-primary">Download CSV</button>
    <!-- Button trigger modal Add -->
    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#AddItem">
      Add Item
    </button>
    <!-- Modal Add -->
    <div class="modal fade" id="AddItem" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Add Item</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Name: <input type="text" name="newBrand" required>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Save change</button>
          </div>
        </div>
      </div>
    </div>
    <!-- end Modal Add -->

  </form>
  <br>
  <br>
</div>
@endsection