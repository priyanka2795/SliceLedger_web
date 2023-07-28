@extends('admin.layouts.default')
@section('content')


  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>KYC Management</h1>
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
                <h3 class="card-title">User KYC Details</h3>
                <div id="userExport" style="float:right">

                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body">

                <table id="kyc-table" class="table table-bordered table-hover ">
                  <thead>
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>KYC Status</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                    @php
                    $i = 1;
                    @endphp
                    @forelse ($kyc as $k)
                    @if ($k->user)
                    <tr>
                        <td>{{ $i++}}</td>
                        <td>{{ $k->user->first_name." ".$k->user->last_name }}</td>
                        <td>{{ $k->user->email }}</td>
                        <td>
                            @if ($k->status == 'pending')
                                <b class="badge-danger">Pending</b>
                            @else
                                <b class="badge-success ">Approved</b>
                            @endif
                        </td>
                        <td>
                            <a href="{{ route('kycDetail',$k->user_id) }}" class="btn btn-warning" data-toggle="tooltip" title="Check KYC Document" data-placement="top">
                                <i class="fa fa-eye"></i>
                            </a>
                        </td>
                    </tr>
                    @endif

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
