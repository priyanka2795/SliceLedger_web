<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name='viewport' content='width=device-width, initial-scale=1'>
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>Slice Ledger</title>

  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="{{ asset('public/plugins/fontawesome-free/css/all.min.css') }}">
  {{-- y --}}
  <!-- icheck bootstrap -->
  <link rel="stylesheet" href="{{ asset('public/plugins/icheck-bootstrap/icheck-bootstrap.min.css') }}">
  <!-- Theme style -->
  <link rel="stylesheet" href="{{ asset('public/dist/css/adminlte.min.css') }}">



<style>
body{
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      background: linear-gradient(45deg, #94a1e3, #25f7e485);
    }
.card{
      background: #fff;
    border-radius: 12px;
    box-shadow: 0 0 10px 0 rgb(0 0 0 / 20%);
    color: #555251;
    height: 100%;
    margin: 25px auto;
    padding: 25px;
    text-align: center;
    transition: .6s;
    width: 100%;
    }
.loginBtn {
    background: linear-gradient(45deg, #94a1e3, #25f7e485);
    color: #000000 !important;
    padding: 5px 25px;
    border-radius: 0;
    font-size: 17px;
    margin: auto;
    display: block;
    border-radius: 5px;
}
.invalid-feedback {
    text-align: left !important;
}
.loginBtn:hover{
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 40%);
}

  </style>
</head>
<body class="hold-transition login-page">

    <div class="login-box">

        <!-- /.login-logo -->
        <div class="card">
          <div class="card-body login-card-body">
            <div class="login-logo">
                <img src="{{ url('public/images/logo.png') }}" alt="Slice Ledger" class="img-fluid" style="width: 70px; opacity: .8">
              <!-- <p><b>Admin</b> Login</p> -->
            </div>
            <p class="login-box-msg"><span class="signin" style="color: #3e3d38;"><b style="color: #3e3d38; font-size: 1.2rem;">Sign In:</b> Login to your Sliceledger Account! </span> </p>
            @if (\Session::has('error'))
            <div class="alert alert-danger">
                <ul>
                    <li>{!! \Session::get('error') !!}</li>
                </ul>
            </div>
           @endif
            <form action="{{ route('loginData') }}" method="post" id="login-form">
                @csrf
              <div class="input-group form-group mb-3">
                <input type="email" class="form-control" placeholder="Email" name="email">
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-envelope"></span>
                  </div>
                </div>
              </div>


              <div class="input-group form-group mb-3">
                <input type="password" class="form-control" id="upass"  placeholder="Password" name="password" >
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span id="toggleBtn" onclick="toggePassword()" class="fas fa-lock"></span>
                  </div>
                </div>
              </div>


                <!-- /.col -->
                <div class="col-12">
                  <div class="right d-block mx-auto">
                  <button type="submit" class="btn loginBtn ">Sign In</button>
                  </div>
                </div>
                <!-- /.col -->
              </div>
            </form>
          </div>
          <!-- /.login-card-body -->
        </div>
      </div>
<!-- /.login-box -->

<!-- jQuery -->
<script src="{{ asset('public/plugins/jquery/jquery.min.js') }}"></script>
<!-- Bootstrap 4 -->
<script src="{{ asset('public/plugins/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
<!-- AdminLTE App -->
<script src="{{ asset('public/dist/js/adminlte.min.js') }}"></script>



<script src="{{ asset('public/plugins/jquery-validation/jquery.validate.min.js') }}"></>
<script src="{{ asset('public/plugins/jquery-validation/additional-methods.min.js') }}"></script>
<script src="{{ asset('public/dist/js/validation.js') }}"></script>
<script src="https://cdn.bootcss.com/toastr.js/latest/js/toastr.min.js"></script>

<script>
    $(document).ready(function() {
        toastr.options.timeOut = 5000;
        @if (Session::has('error'))
            toastr.error('{{ Session::get('error') }}');
        @elseif(Session::has('success'))
            toastr.success('{{ Session::get('success') }}');
        @endif
    });

</script>
<script>
  function toggePassword() {
      var upass = document.getElementById('upass');
      var toggleBtn = document.getElementById('toggleBtn');
      $('#toggleBtn').removeClass("fas fa-lock");
      $('#toggleBtn').addClass("fas fa-unlock");
      if (upass.type == "password") {
          upass.type = "text";
          toggleBtn.value = "Hide password";
      } else {
          upass.type = "Password";
          toggleBtn.value = "Show the password";
          $('#toggleBtn').removeClass("fas fa-unlock");
          $('#toggleBtn').addClass("fas fa-lock");
      }
  }

</script>
</body>
</html>
