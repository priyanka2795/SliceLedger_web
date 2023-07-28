@extends('admin.layouts.default')
@section('content')
<style>
    .loader-container {
    position: relative;
    width: 100%;
    height: 100%;
}

#loader {
    height: 0;
    width: 0;
    padding: 15px;
    border: 6px solid #ccc;
    border-right-color: #888;
    border-radius: 22px;
    -webkit-animation: rotate 1s infinite linear;
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 999;
}
@-webkit-keyframes rotate {

/* 100% keyframe for  clockwise.
 use 0% instead for anticlockwise */
100% {
    -webkit-transform: rotate(360deg);
}
}
    </style>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Withdrawal Details</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
             <a href="{{ route('withdrawal') }}" class="btn btn-warning text-white"><i class="fa fa-arrow-left"></i> Back</a>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-3">
            <div class="card card-primary card-outline">
              <div class="card-body box-profile">
                <div class="text-center profile-user-div">
                  @if ($withdrawal->user->profilePic)
                  <img class="profile-user-img img-fluid img-circle"
                       src="{{ url('public/storage/'.$withdrawal->user->profilePic) }}"
                       alt="User profile picture">
                  @else
                      <img class="profile-user-img img-fluid img-circle"

                       src="{{ asset('public/dist/img/user-logo.jpg') }}"
                       alt="User profile picture">
                  @endif
                </div>

                <h3 class="profile-username text-center">{{ $withdrawal->user->first_name }} {{ $withdrawal->user->last_name }}</h3>

                <p class="text-muted text-center">{{ $withdrawal->user->email }}</p>
                <input type="hidden" name="user_id" id="user_id" value="{{ $withdrawal->user->id }}" >
                <ul class="list-group list-group-unbordered mb-3">
                  <li class="list-group-item">
                    <b>Phone Number</b> <a class="float-right text-dark">{{ $withdrawal->user->phoneNumber }}</a>
                  </li>

                </ul>
                <ul class="list-group list-group-unbordered mb-3">
                    <li class="list-group-item">
                      <b>Withdraw Status</b>
                        @if ($withdrawal->status == 'pending')
                            <b class="float-right badge-info">Pending</b>
                        @elseif($withdrawal->status == 'cancelled')
                            <b class="float-right badge-danger">Cancelled</b>
                        @elseif($withdrawal->status == 'failed')
                            <b class="float-right badge-danger">Failed</b>
                        @else
                            <b class="float-right badge-success ">Approved</b>
                        @endif
                    </li>
                </ul>
              </div>
              <!-- /.card-body -->
            </div>
          </div>
          <!-- /.col -->
          <div class="col-md-9">
            <div class="card">
              <div class="card-header p-2 profile-header">
                  <b>Withdrawal Details</b>
              </div><!-- /.card-header -->
              <div class="loader-container">
                <span id="loader" style="display: none;"></span>
              </div>
              <div class="card-body">
                <div class="tab-content">
                    <strong><i class="fas fas fa-landmark mr-1"></i> Bank Acount</strong><br><br>
                    <div class="row invoice-info">
                        <div class="col-sm-6 invoice-col">
                            <b>Holder Name:</b> {{ $withdrawal->user->bankAcount->name }}<br>
                            <b>Acount No:</b> {{ $withdrawal->user->bankAcount->acountNumber }}<br>
                            <b>IFSC:</b> {{ $withdrawal->user->bankAcount->ifsc }}
                        </div>
                        <div class="col-sm-6 invoice-col">
                            <b>Bank Name:</b> {{ $withdrawal->user->bankAcount->bankName ?? "N/A" }}<br>
                            <b>Acount Type:</b> {{ $withdrawal->user->bankAcount->acountType ?? "N/A" }}<br>
                            <b>Currency:</b> {{ $withdrawal->user->bankAcount->currency ?? "N/A" }}
                        </div>
                    </div>

                    <ul class="list-group list-group-unbordered mt-3">
                        <table class="table table-bordered table-hover ">
                            <thead>
                            <tr>
                                <th>Amount</th>
                                <th>Transaction ID</th>
                                <th>Payment Method</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>{{ $withdrawal->amount ?? 'N/A' }}</td>
                                <td>{{ $withdrawal->payment_id ?? 'N/A' }}</td>
                                <td>{{ $withdrawal->payment_type ?? 'N/A' }}</td>
                                <td>{{ $withdrawal->date ?? 'N/A' }}</td>
                                <td>{{ $withdrawal->time ?? 'N/A' }}</td>
                                <td>
                                  @if($withdrawal->status=="completed")
                                  <b class="float-right badge-success ">Approved</b>
                                  @elseif($withdrawal->status=="cancelled")
                                  <b class="float-right badge-danger">Cancelled</b>
                                  @else
                                  <button type="button" data-id="{{ $withdrawal->id }}" class="btn btn-warning withdrawFundCencelled" data-toggle="modal" title="Click to Cancelled" data-placement="top"  data-target="#withdrawFundCencel">
                                    <i class="fa fa-times"></i>
                                  </button>
                                  <button type="button" data-id="{{ $withdrawal->id }}" class="btn btn-warning withdrawFundApproved" data-toggle="modal" title="Click to Approved" data-placement="top"  data-target="#withdrawFundApprove">
                                    <i class="fa fa-check"></i>
                                  </button>
                                  @endif

                                </td>

                                </tr>
                            </tbody>
                        </table>
                    </ul>
                  <!-- /.tab-pane -->
                </div>
                <!-- /.tab-content -->
              </div><!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
              <!-- /.card -->

          <!-- /.card -->
         </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
  <div class="modal fade" id="withdrawFundCencel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Withdrawal Fund Cencelled</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          Are You sure want to cancel withdrawal fund.
        </div>
        <form action="{{ route('cancel-withdraw') }}" method="POST">
          @csrf
          <input type="hidden" name="trasaction_id" id="trasactionId1">
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
          <button type="submit" class="btn btn-primary">Yes</button>
        </div>
      </form>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="withdrawFundApprove" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Withdrawal Fund Approved</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          Are You sure want to approve withdrawal fund.
        </div>
        <form action="{{ route('approved-withdraw') }}" method="POST">
          @csrf
          <input type="hidden" name="trasaction_id" id="trasactionId2">
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
          <button type="submit" class="btn btn-primary">Yes</button>
        </div>
      </form>
      </div>
    </div>
  </div>
  <script>
    $(document).on('click','.withdrawFundCencelled', function() {
      var trasactionId = $(this).data('id');
       $('#trasactionId1').val(trasactionId);
    });
    $(document).on('click','.withdrawFundApproved', function() {
      var trasactionId = $(this).data('id');
      $('#trasactionId2').val(trasactionId);
    });
  </script>
@stop
