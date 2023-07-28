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
            <h1>KYC Documents</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
             <a href="{{ route('kyc-request') }}" class="btn btn-warning text-white"><i class="fa fa-arrow-left"></i> Back</a>
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
                  @if ($user->profilePic)
                  <img class="profile-user-img img-fluid img-circle"

                       src="{{ url('public/storage/'.$user->profilePic) }}"
                       alt="User profile picture">
                  @else
                      <img class="profile-user-img img-fluid img-circle"

                       src="{{ asset('public/dist/img/user-logo.jpg') }}"
                       alt="User profile picture">
                  @endif
                </div>

                <h3 class="profile-username text-center">{{ $user->first_name }} {{ $user->last_name }}</h3>

                <p class="text-muted text-center">{{ $user->email }}</p>
                <input type="hidden" name="user_id" id="user_id" value="{{ $user->id }}" >
                <ul class="list-group list-group-unbordered mb-3">
                  <li class="list-group-item">
                    <b>Phone Number</b> <a class="float-right text-dark">{{ $user->phoneNumber }}</a>
                  </li>

                  <li class="list-group-item">
                    <b>KYC</b>
                    @if ($user->kyc->status == 'approved')
                        <a class="btn btn-warning float-right" data-toggle="tooltip" data-placement="top" title="KYC Aleady Approved">Approved</a>
                    @else
                        @if ($user->kyc->status == 'pending')
                            <a href="{{ route('kycApprove', $user->id) }}" class="btn btn-warning float-right" data-toggle="tooltip" data-placement="top" title="KYC Aleady Approved">
                                Pending
                            </a>
                        @else
                            <a href="{{ route('kycApprove', $user->id) }}" class="btn btn-warning float-right" data-toggle="tooltip" data-placement="top" title="Click To Approved">
                                Rejected
                            </a>
                        @endif
                    @endif
                    </td>
                  </li>

                </ul>
              </div>
              <!-- /.card-body -->
            </div>

          </div>
          <!-- /.col -->
          <div class="col-md-9">
            <div class="card">
              <div class="card-header p-2">
                <h5>Document</h5>
              </div><!-- /.card-header -->
              <div class="loader-container">
                <span id="loader" style="display: none;"></span>
              </div>
              <div class="card-body">
                <div class="tab-content">
                  <div class="active tab-pane" id="buy-token" aria-labelledby="buy-token-detail" >
                    <!-- Post -->
                    <div class="row" >
                       @foreach ($kycDocumnet as $docs)

                          <div class="col-md-4 document_div">
                         <a href="{{ url('public/storage/'.$docs->document) }}" target="_blank"><img class=""
                             width="220" height="135"
                                src="{{ url('public/storage/'.$docs->document) }}"
                                alt="User Selfie"></a>
                                @if($docs->status == "approved")
                                <span class="btn btn-success approveShow">Approved</span>
                              @elseif ($docs->status == "rejected")
                                <span class="btn btn-danger rejectShow">Rejected</span>
                                <p class="" data-toggle="tooltip" title="{{ $docs->comment }}" data-placement="bottom">comment...</p>
                              @else
                                <a href="javascript:void(0)" class="btn btn-success approvedBtn" data-kycId={{ $docs->id }} data-kycStatus="1">Approve</a>
                                <a href="javascript:void(0)" class="btn btn-danger rejectBtn" data-kycId={{ $docs->id }} data-kycStatus="2">Reject</a>
                              @endif
                          </div>

                       @endforeach
                    </div>

                  </div>
                <!-- /.post -->
              </div>
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
      </div>
    </section>

  </div>

  <div id="approveModel" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Approved KYC</h4>
            </div>
            <form method="POST" data-parsley-validate action="{{ route('kycApproveReject') }}" >
                <div class="modal-body">
                  @csrf
                  <input type="hidden" value="" class="kyc_id" name="kyc_id">
                  <input type="hidden" value="" id="kyc_approve" name="kyc_status">
                </div>

                <div class="modal-body" style="padding: 0rem 1rem">
                  <div class="form-group col-12">
                   <p>Are you sure want to approve this document?</p>
                  </div>

              </div>

                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">No</button>
                  <button type="submit" class="btn btn-primary">Yes</button>
                </div>
            </form>
        </div>
    </div>
</div>

  <div id="rejectModel" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Reject KYC</h4>
            </div>
            <form method="POST" data-parsley-validate action="{{ route('kycApproveReject') }}" >
                <div class="modal-body">
                  @csrf
                      <input type="hidden" value="" class="kyc_id" name="kyc_id">
                      <input type="hidden" value="" id="kyc_reject" name="kyc_status">
                </div>

                <div class="modal-body" style="padding: 0rem 1rem">
                  <div class="form-group col-12">
                   <textarea class="form-control" id="comment" type="text" placeholder="Comment" name="comment" rows="3" required></textarea>

                  </div>

              </div>

                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">No</button>
                  <button type="submit" class="btn btn-primary" onclick="commentSave();">Yes</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
  $(document).on('click','.approvedBtn', function() {
    var kycId = $(this).data('kycid');
    var kycStatus = $(this).data().kycstatus;

    $('.kyc_id').val(kycId);
    $('#kyc_approve').val(kycStatus);
    $('#approveModel').modal('show');
});

$(document).on('click','.rejectBtn', function() {
  var kycId = $(this).data('kycid');
  var kycStatus = $(this).data('kycstatus');

  $('.kyc_id').val(kycId);
  $('#kyc_reject').val(kycStatus);




  $('#rejectModel').modal('show');
});



</script>
@stop
