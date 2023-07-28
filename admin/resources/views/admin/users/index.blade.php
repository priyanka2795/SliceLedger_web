@extends('admin.layouts.default')
@section('content')


  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Users</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">

            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card table-responsive">
              <div class="card-header">
                <h3 class="card-title">User Details</h3>
                <div id="userExport" style="float:right">

                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body">

                <table id="user-table" class="table table-bordered table-hover ">
                  <thead>
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Kyc Approved</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                    @php
                    $i = 1;
                    @endphp
                    @forelse ($users as $user)
                    <tr>
                    <td>{{ $i++}}</td>
                    <td>
                        {{ (!empty($user->first_name)) ? $user->first_name.' '.$user->last_name : 'N/A' }}

                    </td>
                    <td>
                        {{ (!empty($user->email)) ? $user->email : 'N/A' }}

                    </td>
                    <td>
                        {{ (!empty($user->phoneNumber)) ? $user->phoneNumber : 'N/A' }}

                    </td>

                     <td>
                        @if (!empty($user->kyc))
                            <a href="{{ route('kycDetail',$user->id) }}" class="btn btn-warning" data-toggle="tooltip" title="Check KYC Document" data-placement="top">
                                {{ ($user->kyc->status == 'pending'? "Pending" : "Approved")  }}
                            </a>
                        @else
                            <a class="btn btn-warning" data-toggle="tooltip" data-placement="top" title="User Not Submit Detail">
                                 Not Submit
                            </a>
                        @endif
                    </td>
                     <td>
                        @if (!empty($user->status) == '0')
                        <a href="{{ route('status_change',$user->id) }}" class="btn btn-warning" data-toggle="tooltip" data-placement="top">Active</a></td>
                        @else
                        <a href="{{ route('status_change',$user->id) }}" class="btn btn-warning" data-toggle="tooltip" data-placement="top">Deactive</a>
                        @endif
                    </td>
                    <td>
                      @if (!$user->deleted_at)
                         <form action="{{ route('users.destroy',$user->id) }}" method="POST">
                          <a href="{{ route('users.show', $user) }}" class="btn  btn-warning" data-toggle="tooltip" data-placement="top"  title="View User"><i class="fa fa-eye"></i></a>
                          @csrf
                          @method('DELETE')

                          <button type="submit" class="btn btn-warning" data-toggle="tooltip" data-placement="top"  title="Delete User" onclick="return confirm('Are you sure want to delete this User!')" ><i class="fa fa-trash"></i></button>
                        </form>

                      @else
                          <a href="{{ route('users.restore', $user->id) }}" class="btn-warning btn " data-toggle="tooltip" data-placement="top"  title="Restore User"><i class="fas fa-trash-restore"></i></a>
                          <a href="{{ route('users.delete', $user->id) }}" class="btn-warning btn " data-toggle="tooltip" data-placement="top"  title="Parmanent Delete User" onclick="return confirm('Are you sure want to delete this User!')"><i class="fa fa-trash"></i></a>
                      @endif

                    </td>
                    </tr>
                    @empty
                        <tr class="no-data-row">
                            <td colspan="9" rowspan="2" align="center">
                                <div class="message"><p>No user found!</p></div>

                            </td>
                        </tr>
                    @endforelse
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
@stop
