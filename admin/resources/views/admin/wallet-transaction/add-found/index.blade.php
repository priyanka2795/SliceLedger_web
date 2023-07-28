@extends('admin.layouts.default')
@section('content')


  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Add Funds</h1>
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
                <h3 class="card-title">Add Funds Details</h3>
                <div id="withdrawExport" style="float:right">

                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body">

                <table id="withdraw-found-table" class="table table-bordered table-hover ">
                  <thead>
                  <tr>
                    <th>No.</th>
                    <th>User Name</th>
                    <th>Amount</th>
                    <th>Transaction ID</th>
                    <th>Payment Method</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                    @php
                    $i = 1;
                    @endphp
                    @forelse ($addFounds as $add)
                    <tr>
                    <td>{{ $i++}}</td>
                    <td>{{ $add->user->first_name. " ".$add->user->last_name ?? 'N/A' }} </td>
                    <td>{{ $add->amount ?? 'N/A' }} </td>
                    <td>{{ $add->payment_id ?? 'N/A' }} </td>
                    <td>{{ ($add->payment_type == "bank") ? "Bank": 'Rezorpay' }} </td>
                    <td>{{ $add->date ?? 'N/A' }}</td>
                    <td>{{ date('h:i A', strtotime($add->time)) ?? 'N/A' }}</td>
                    <td>
                        @if ($add->status == 'pending')
                            <b class="badge-info">Pending</b>
                        @elseif($add->status == 'cancelled')
                            <b class="badge-danger">Cancelled</b>
                        @elseif($add->status == 'failed')
                            <b class="badge-danger">Failed</b>
                        @else
                            <b class="badge-success ">Approved</b>
                        @endif
                    </td>
                    <td><a href="{{ route('show-add', $add->id ) }}" class="btn btn-warning" data-toggle="tooltip" title="Check Transaction Detail" data-placement="top">
                        <i class="fa fa-eye"></i>
                    </a></td>
                    </tr>
                    @empty
                        <tr class="no-data-row">
                            <td colspan="9" rowspan="2" align="center">
                                <div class="message"><p>No data found!</p></div>

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
