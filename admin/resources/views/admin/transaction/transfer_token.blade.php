@extends('admin.layouts.default')
@section('content')


  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Transfer Token</h1>
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
                <h3 class="card-title">Transfer Token Details</h3>
                <div id="transferExport" style="float:right">

                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body">

                <table id="transfer-token-table" class="table table-bordered table-hover ">
                  <thead>
                  <tr>
                    <th>No.</th>
                    <th>User Name</th>
                    <th>Token Name</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>From</th>
                    <th>To</th>
                </tr>
                  </thead>
                  <tbody>
                    @php
                    $i = 1;
                    @endphp
                    @forelse ($transferTokens as $transferToken)
                    <tr>
                    <td>{{ $i++}}</td>
                    <td>{{ $transferToken->user['first_name'].' '.$transferToken->user['last_name'] }}</td>
                    <td>{{ $transferToken->token_name }}</td>
                    <td>{{ $transferToken->quantity }}</td>
                    @if ($transferToken->status == "failed")
                        <td style="color: #f10707;">{{ $transferToken->status }}</td>
                    @else
                    <td style="color: #18ae3a;">{{ $transferToken->status }}</td>
                    @endif
                     <td>{{ $transferToken->date }}</td>
                     <td>{{ date('h:i A', strtotime($transferToken->time)) }}</td>
                     <td>{{ $transferToken->from }}</td>
                     <td>{{ $transferToken->to }}</td>
                    </tr>
                    @empty
                        <tr class="no-data-row">
                            <td colspan="9" rowspan="2" align="center">
                                <div class="message"><p>No Data found!</p></div>

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
