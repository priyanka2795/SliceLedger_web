@extends('admin.layouts.default')
@section('content')


  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Sell Token</h1>
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
                <h3 class="card-title">Sell Token Details</h3>
                <div id="sellTokenExport" style="float:right">

                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body">

                <table id="sell-token-table" class="table table-bordered table-hover ">
                  <thead>
                  <tr>
                    <th>No.</th>
                    <th>User Name</th>
                    <th>Token Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Currency</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Time</th>
                </tr>
                  </thead>
                  <tbody>
                    @php
                    $i = 1;
                    @endphp
                    @forelse ($saleTokens as $saleToken)
                    <tr>
                    <td>{{ $i++}}</td>
                    <td>{{ $saleToken->user['first_name'].' '.$saleToken->user['last_name'] }}</td>
                    <td>{{ $saleToken->token_name }}</td>
                    <td>{{ $saleToken->price }}</td>
                    <td>{{ $saleToken->quantity }}</td>
                    <td>{{ $saleToken->currency }}</td>
                    @if ($saleToken->status == "failed")
                        <td style="color: #f10707;">{{ $saleToken->status }}</td>
                    @else
                    <td style="color: #18ae3a;">{{ $saleToken->status }}</td>
                    @endif
                     <td>{{ $saleToken->date }}</td>
                     <td>{{ date('h:i A', strtotime($saleToken->time)) }}</td>

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
