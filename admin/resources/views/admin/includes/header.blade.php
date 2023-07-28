<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>Slice Ledger</title>

  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="{{ asset('public/plugins/fontawesome-free/css/all.min.css') }}">
  <!-- Ionicons -->
  <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
  <!-- Tempusdominus Bootstrap 4 -->
  <link rel="stylesheet" href="{{ asset('public/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css') }}">
  <!-- iCheck -->
  <link rel="stylesheet" href="{{ asset('public/plugins/icheck-bootstrap/icheck-bootstrap.min.css') }}">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.8.0/css/bootstrap-datepicker.min.css" />
  <!-- JQVMap -->
  <!-- {{-- <link rel="stylesheet" href="{{ asset('public/plugins/jqvmap/jqvmap.min.css') }}"> --}} -->
  <!-- Theme style -->
  <link rel="stylesheet" href="{{ asset('public/dist/css/adminlte.min.css') }}">
  <!-- overlayScrollbars -->
  <link rel="stylesheet" href="{{ asset('public/plugins/overlayScrollbars/css/OverlayScrollbars.min.css') }}">
  <!-- DataTables -->
  <link rel="stylesheet" href="{{ asset('public/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css') }}">
  <link rel="stylesheet" href="{{ asset('public/plugins/datatables-responsive/css/responsive.bootstrap4.min.css') }}">
  <link rel="stylesheet" href="{{ asset('public/plugins/datatables-buttons/css/buttons.bootstrap4.min.css') }}">
  <!-- Daterange picker -->
  <!-- <link rel="stylesheet" href="{{ asset('public/plugins/daterangepicker/daterangepicker.css') }}"> -->
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />
  <!-- summernote -->
  <!-- <link rel="stylesheet" href="{{ asset('public/plugins/summernote/summernote-bs4.min.css') }}"> -->
  <!-- CodeMirror -->
  <link rel="stylesheet" href="{{ asset('public/plugins/codemirror/codemirror.css') }}">
  <link rel="stylesheet" href="{{ asset('public/plugins/codemirror/theme/monokai.css') }}">
  <!-- SimpleMDE -->
  <!-- <link rel="stylesheet" href="{{ asset('public/plugins/simplemde/simplemde.min.css') }}"> -->

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <script src="{{ asset('public/plugins/jquery/jquery.min.js') }}"></script>
  <script type="text/javascript">
    const SITE_URL = "{{ URL::to('/') }}";
</script>

<style>

.table-hover tbody tr:hover {
    color: #212529;
    background-color: rgb(191 190 190 / 8%);
}

.error{
    color: red;
    text-align: left;
}



.page-item.active .page-link {
    z-index: 3;
    color: #fff;
    background:linear-gradient( 87deg , rgb(82 128 177) 0%, rgb(100 112 197) 100%) !important;
    border-color: #05366b;
}
.slice-body .brand-link{
    background-color: revert;
    display: block;
    font-size: 1.25rem;
    line-height: 1.5;
    padding: 0.76rem 0.5rem;
    transition: width .3s ease-in-out;
    white-space: nowrap;
}

.slice-body ul ul a {
    font-size: 1em !important;
    padding-left: 30px !important;
    /*background: #6d7fcc;*/
    }
    [class*=sidebar-dark-] .nav-treeview>.nav-item>.nav-link.active, [class*=sidebar-dark-] .nav-treeview>.nav-item>.nav-link.active:focus, [class*=sidebar-dark-] .nav-treeview>.nav-item>.nav-link.active:hover {
    background-color: rgba(255,255,255,.9);
    color: #eef2f5;
}
.slice-body .content-wrapper {
    background-color: #edf8ff;
    padding: 10px;
}
.slice-body .nav-pills .nav-link {
    color: #000000;
    font-size: 17px;
}
.slice-body .nav-pills .nav-link.active, .nav-pills .show>.nav-link {
    color: #fff;
    background: linear-gradient( 87deg , rgb(82 128 177) 0%, rgb(100 112 197) 100%);
    border-color: #2b385f;
}
.slice-body .nav-pills .nav-link:not(.active):hover {
    color: #fff;
    background: linear-gradient( 87deg , rgb(82 128 177) 0%, rgb(100 112 197) 100%);
}
.slice-body .btn-warning:not(:disabled):not(.disabled).active, .btn-warning:not(:disabled):not(.disabled):active, .show>.btn-warning.dropdown-toggle {
    color: #fff;
    background: linear-gradient( 87deg , rgb(104 155 209) 0%, rgb(129 140 219) 100%);
    border-color: #43599b;
}
.slice-body .btn-warning:focus {
    color: #fff;
    background: linear-gradient( 87deg , rgb(104 155 209) 0%, rgb(129 140 219) 100%);
    border-color: #43599b;
    box-shadow: 0 0 0 0 rgb(221 171 15 / 50%);
}
.slice-body .btn-warning:hover {
    color: #fff;
    background: linear-gradient( 87deg , rgb(104 155 209) 0%, rgb(129 140 219) 100%);
    border-color: #43599b;
    box-shadow: 0 0 0 0 rgb(221 171 15 / 50%);
}
.slice-body .btn-warning {
    color: #fff;
    background: linear-gradient( 87deg , rgb(82 128 177) 0%, rgb(100 112 197) 100%);
    border-color: #fefaf0;
    box-shadow: none;
}
.slice-body .page-item .active .page-link {
    z-index: 3;
    color: #fff;
    background: linear-gradient( 87deg , rgb(82 128 177) 0%, rgb(100 112 197) 100%);
    border-color: #2b385f;
}


/* user profile */
.slice-body .profile_img_logo{
    background: #f3eeee;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid gray;
    position:relative;
}
.slice-body .profile-div{
    text-align:center;
    margin-top: 2px;
    right: 1%;
    position: absolute;
    background: #ffff;
    padding-top: 10px;
    width:150px;
    box-shadow: 0 0 10px 0 rgb(0 0 0 / 8%);
    border-radius: 3px;
    display:none;
}
.slice-body .profile-div a{
    color:#333;
}
.slice-body .profile-div a i{
    color:gray;
}
.slice-body .profile-div .logout{
    border-top:1px solid gray;
    padding-top:8px;
}
.slice-body .card-primary .card-outline {
    border-top: 3px solid linear-gradient( 87deg , rgb(82 128 177) 0%, rgb(100 112 197) 100%) !important;

}
.slice-body .profile-user-div{
    border-radius: 50%;
    display: block;
    width: 100px;
    height: 100px;
    background: gray;
    margin: auto;
    position: relative;
}

.slice-body .uploadImg{
    position: absolute;
    bottom: 0%;
    right: 0%;
    border-radius: 50%;
    padding: 5px;
    width: 40px;
    height: 40px;
    border: 2px solid #fff;
}
.slice-body .profile-user-img {
    object-fit: cover;
    border: none;
    margin: 0 ;
    padding:0;
    width: 100px;
    height: 100px;
}

/* Dashboard */
.slice-body .bg-warning {
   color:#fff !important;
}
.slice-body .bg-warning a {
   color:#fff !important;
}

.slice-body .profile-header{
    color: #fff;
    background: linear-gradient( 87deg , rgb(82 128 177) 0%, rgb(100 112 197) 100%);
    border-color: #2b385f;
}

p.comment_box {
  width: 100%;
  height: 120px;
  padding: 12px;
  background-color: #d0e2bc;
}
.document_div {
  margin: 0px;
  padding: 0px;
}
.approveShow {
  margin: 15px;
  padding: 4px;
}
.rejectShow {
  margin: 15px;
  padding: 4px;
}
.approvedBtn {
  margin: 15px;
  padding: 4px;
}
.rejectBtn {
  margin: 15px;
  padding: 4px;
}
.slice-body  .main-sidebar, .main-sidebar::before {
    transition: margin-left .3s ease-in-out,width .3s ease-in-out;
    width: 267px;
}

</style>

</head>
<body class="slice-body hold-transition sidebar-mini layout-fixed">
<div class="wrapper">

  <!-- Preloader -->
  <!-- <div class="preloader flex-column justify-content-center align-items-center">
    <img class="animation__shake" src="dist/img/AdminLTELogo.png" alt="Admin Logo" height="60" width="60">
  </div> -->

  <!-- Navbar -->
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown">
            <a class="nav-link" data-toggle="dropdown" href="#">
              <i class="far fa-bell"></i>
              <span class="badge badge-danger navbar-badge">{{ ($kyc->count()+ $addFound->count()+$withdraw->count() +$feedback->count() + $userContact->count()) }}</span>
            </a>
            <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <span class="dropdown-item dropdown-header"><b>{{ ($kyc->count()+ $addFound->count()+$withdraw->count() +$feedback->count() + $userContact->count()) }} Notifications </b></span>
              <div class="dropdown-divider"></div>
              <a href="{{ route('kyc-request') }}" class="dropdown-item">
                <i class="fas fa-file mr-2"></i> {{ $kyc->count() }} New KYC requests
              </a>
              <div class="dropdown-divider"></div>
              <a href="{{ route('add-fund') }}" class="dropdown-item">
                <i class="fas fa-file mr-2"></i> {{ $addFound->count() }} New Add Fund requests
              </a>
              <div class="dropdown-divider"></div>
              <a href="{{ route('withdrawal') }}" class="dropdown-item">
                <i class="fas fa-file mr-2"></i> {{ $withdraw->count() }} New Withdraw Fund requests
              </a>
              <div class="dropdown-divider"></div>
              <a href="{{ route('feedback.index') }}" class="dropdown-item">
                <i class="fas fa-file mr-2"></i> {{ $feedback->count() }} New Feedback requests
              </a>
              <div class="dropdown-divider"></div>
              <a href="{{ route('contact-list') }}" class="dropdown-item">
                <i class="fas fa-file mr-2"></i> {{ $userContact->count() }} New Contact requests
              </a>
              {{-- <div class="dropdown-divider"></div>
              <a href="#" class="dropdown-item dropdown-footer">See All Notifications</a> --}}
            </div>
          </li>
    <li class="nav-item">
    <!-- <a href="{{ route('logout') }}" class="btn btn-info" >
    <span class="glyphicon glyphicon-log-out"></span> Log out
    </a> -->

    <div class="profile_img_logo" id="toggle-slow">
      @if(empty(Auth::guard('admin')->user()->profilePic))
     <img  src="{{ url('public/dist/img/user-logo.jpg') }}" width="35px" style="border-radius:50%; object-fit: cover; padding:1px;" class="img-fluid d-block m-auto" alt="img"  />
     @else
     <img  src="{{ url('public/storage/'.Auth::guard('admin')->user()->profilePic) }}" width="35px" style="border-radius:50%; object-fit: cover; padding:1px;" class="img-fluid d-block m-auto" alt="img"  />
    @endif


    </div>
    <div class="profile-div" id="profile-box">

        <p><a href="{{ route('adminProfile') }}"> <i class="fa fa-user mr-2" aria-hidden="true"></i>Profile</a></p>
        <p class="logout"><a href="javascript:void(0)" data-toggle="modal"  data-target="#adminLogout"><i class="fa fa-sign-out mr-2" aria-hidden="true" ></i>Logout</a></p>

    </div>

    </li>
      <!-- {{--  <li class="nav-item">
        <a class="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
          <i class="fas fa-th-large"></i>
        </a>
      </li>  --}} -->
    </ul>

  </nav>

  <!-- /.navbar -->
   <!-- Modal -->
  <div class="modal fade" id="adminLogout" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Admin Logout</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          Are you sure want to logout.
        </div>
        <form action="{{ route('approved-fund') }}" method="POST">
          @csrf
          <input type="hidden" name="trasaction_id" id="trasactionId2">
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>

          <a href="{{ route('logout') }}"  class="btn btn-primary" >Yes</a>
        </div>
      </form>
      </div>
    </div>
  </div>
