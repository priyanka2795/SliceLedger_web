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
            <h1>Profile</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
             <a href="{{ route('users.index') }}" class="btn btn-warning text-white"><i class="fa fa-arrow-left"></i> Back</a>
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

                </ul>
              </div>
              <!-- /.card-body -->
            </div>

            <div class="card card-primary">
                <div class="card-header profile-header">
                  <h3 class="card-title">User Info</h3>
                </div>
                <!-- /.card-header -->
                <div class="card-body">
                  <strong><i class="fas fas fa-landmark mr-1"></i> Bank Account</strong><br><br>
                  @if (!empty($user->bankAcount))
                  <b>Account No:</b> {{ $user->bankAcount->acountNumber }}<br>
                  <b>IFSC:</b> {{ $user->bankAcount->ifsc }}<br>
                  <b>Currency:</b> {{ $user->bankAcount->currency }}
                  @else
                  <b>Account No:</b> <br>
                  <b>IFSC:</b> <br>
                  <b>Currency:</b>
                  @endif

                </div>
                <!-- /.card-body -->
              </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
          <div class="col-md-9">
            <div class="card">
              <div class="card-header p-2">
                <ul class="nav nav-pills">
                  <li class="nav-item"><a class="nav-link" id="buy-token-detail" href="#buy-token" data-category="buy-token" data-toggle="tab">Buy</a></li>
                  <li class="nav-item"><a class="nav-link" id="sale-token-detail" href="#sale-token" data-category="sale-token" data-toggle="tab">Sell</a></li>
                  <li class="nav-item"><a class="nav-link" id="add-money-detail" href="#add-money" data-category="add-money" data-toggle="tab">Add Money</a></li>
                  <li class="nav-item"><a class="nav-link" id="withdrawal-money-detail" href="#withdrawal-money" data-category="withdrawal-money" data-toggle="tab">Withdrawal</a></li>
                </ul>
              </div><!-- /.card-header -->
              <div class="loader-container">
                <span id="loader" style="display: none;"></span>
              </div>
              <div class="card-body">
                <div class="tab-content">
                  <div class="active tab-pane" id="buy-token" aria-labelledby="buy-token-detail" >
                    <!-- Post -->

                    <!-- /.post -->
                  </div>
                  <!-- /.tab-pane -->
                  <div class="tab-pane" id="sale-token" aria-labelledby="sale-token-detail">
                    <!-- The timeline -->

                  </div>
                  <!-- /.tab-pane -->

                  <div class="tab-pane" id="add-money" aria-labelledby="add-money-detail">

                  </div>

                  <div class="tab-pane" id="withdrawal-money" aria-labelledby="withdrawal-money-detail">

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
      </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->

@stop
