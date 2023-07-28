@extends('admin.layouts.default')
@section('content')


  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Buy Token</h1>
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
                <h3 class="card-title">Buy Token Details</h3>
                <div id="buyTokenExport" style="float:right">

                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body">

                <table id="buy-token-table" class="table table-bordered table-hover ">
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
                    @forelse ($buyTokens as $buyToken)
                    <tr>
                    <td>{{ $i++}}</td>
                    <td>{{ $buyToken->user['first_name'].' '.$buyToken->user['last_name'] }}</td>
                    <td>{{ $buyToken->token_name }}</td>
                    <td>{{ $buyToken->price }}</td>
                    <td>{{ $buyToken->quantity }}</td>
                    <td>{{ $buyToken->currency }}</td>

                      @if ($buyToken->status == "failed")
                          <td style="color: #f10707;">{{ $buyToken->status }}</td>
                      @else
                         <td style="color: #18ae3a;">{{ $buyToken->status }}</td>
                      @endif

                     <td>{{ $buyToken->date }}</td>
                     <td>{{ date('h:i A', strtotime($buyToken->time)) }}</td>

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
