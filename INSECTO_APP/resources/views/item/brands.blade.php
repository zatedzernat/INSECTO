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

  @if (session('del_brand'))
  <div class="alert alert-success" role="alert">
    {{ session('del_brand') }}
  </div>
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
  @endif
  <table id="example" class="table table-striped table-borderedv table-dark" style="width:100%">
    <thead>
      <tr>
        <th>#</th>
        <th>Name <span style="color: red">*</span></th>
        <th>Created At</th>
        <th>Updated At</th>
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
          <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#edit-{{ $brand->brand_id }}">
            Edit
          </button>
          <!-- Button trigger modal Del -->
          <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#delete-{{ $brand->brand_id }}">
            Del
          </button>
        </td>
      </tr>

      <!-- Modal Edit -->
      <div class="modal fade" id="edit-{{ $brand->brand_id }}" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <form action="/brand/edit" method="post">
              @csrf
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Edit</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label for="message-text" class="col-form-label">ID: &nbsp; {{ $brand->brand_id }}</label>
                  <input type="hidden" class="form-control" name="brand_id" value="{{ $brand->brand_id }}" readonly>
                </div>
                <div class="form-group">
                  <label for="message-text" class="col-form-label">Name:</label>
                  <input type="text" class="form-control" name="brand_name" value="{{ $brand->brand_name }}" required>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <input type="submit" class="btn btn-primary" value="Save change">
              </div>
            </form>
          </div>
        </div>
      </div>
      {{-- <!-- end Modal Edit --> --}}

      <!-- Modal Delete -->
      <div class="modal fade" id="delete-{{ $brand->brand_id }}" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Delete</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <input type="hidden" name="delID" value="{{ $brand->brand_id }}">
              Do you confirm to delete "{{ $brand->brand_name }}"?
            </div>
            <div class="modal-footer">
              <form action="brand/del/{{ $brand->brand_id }}" method="POST">
                @csrf
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-primary">Del</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- end Modal Delete -->
      @endforeach

    </tbody>
  </table>
  <br>
  <button type="button" class="btn btn-primary">Import CSV</button>
  <button type="button" class="btn btn-primary">Export CSV</button>
  <!-- Button trigger modal Add -->
  <button type="button" class="btn btn-success" data-toggle="modal" data-target="#AddItem">
    Add Brand
  </button>

  <!-- Modal Add -->
  <div class="modal fade" id="AddItem" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <form action="brand/create" method="POST">
          @csrf
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Add Brand</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="message-text" class="col-form-label">Name:</label>
              <input type="text" class="form-control" name="brand_name" required>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Add</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- end Modal Add -->

  <br>
  <br>
</div>
@endsection