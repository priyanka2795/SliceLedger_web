@extends('admin.layouts.default')
@section('content')
<style type="text/css">
    #change-password-form .eyeIcon{
            position: absolute;
            right: 16px;
            top: 42px;
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

            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-4">
            <div class="card card-primary card-outline">
              <div class="card-body box-profile">
                <div class="text-center profile-user-div">
                  @if ($admin->profilePic)
                  <img class="file-upload-image profile-user-img img-fluid img-circle"

                       src="{{ url('public/storage/'.$admin->profilePic) }}"
                       alt="User profile picture">
                  @else
                      <img class="file-upload-image profile-user-img img-fluid img-circle"

                       src="{{ asset('public/dist/img/user-logo.jpg') }}"
                       alt="User profile picture">
                  @endif
                  <button class="btn-warning uploadImg" type="button" onclick="$('.file-upload-input').trigger( 'click' )" id="add_image">
                    <i class="fas fa-camera"></i>
                    {{-- <img class="profile-user-img img-fluid img-circle" src="{{ url('public/storage/images/add-image.png') }}" alt="User profile picture"> --}}
                    </button>

                </div>

                <h3 class="profile-username text-center">{{ $admin->first_name }} {{ $admin->last_name }}</h3>

                <p class="text-muted text-center">{{ $admin->email }}</p>

                <ul class="list-group list-group-unbordered mb-3">
                  <li class="list-group-item">
                    <b>Phone Number</b> <a class="float-right text-dark">{{ $admin->phoneNumber }}</a>
                  </li>

                </ul>
              </div>

            </div>


                  <div class="row">
                    <div class="col-12">
                      <div class="card table-responsive">
                        <div class="card-header">
                          <h3 class="card-title">Change Password</h3>
                         </div>
                        <!-- /.card-header -->
                        <div class="card-body">
                           <div class="row">
                              <div class="col-md-12">
                                  <div class="tile">
                                      <form class="row" action="{{ route('changePassword') }}"  method="post" id="change-password-form">
                                         @csrf

                                         <!-- @foreach ($errors->all() as $error)
                                            <p class="text-danger">{{ $error }}</p>
                                         @endforeach  -->
                                       <div class="col-lg-12">
                                          <div class="row" >
                                             <div class="form-group col-md-12 col-sm-12">
                                                <label>Current Password</label>
                                                 <i class="fa fa-eye-slash eyeIcon" onclick="currentPassword()" id="currentPassShow"></i>
                                                <input class="form-control" type="password" placeholder="Enter Current Password"  name="currentpassword" id="currentpassword">

                                                @if ($errors->has('currentpassword'))
                                                  <span class="error">{{ $errors->first('currentpassword') }}</span>
                                                @endif
                                             </div>
                                             <div class="form-group col-md-12 col-sm-12">
                                                <label>New Password</label>
                                                <i class="fa fa-eye-slash eyeIcon" onclick="newPassword()" id="newPassShow"></i>
                                                <input class="form-control" type="password" placeholder="Enter New Password"  name="newpassword" id="newpassword">

                                                 @if ($errors->has('newpassword'))
                                                  <span class="error">{{ $errors->first('newpassword') }}</span>
                                                @endif
                                             </div>
                                             <div class="form-group col-md-12 col-sm-12">
                                                <label>Confirm Password</label>
                                                <i class="fa fa-eye-slash eyeIcon" onclick="confirmPassword()" id="confirmPassShow"></i>
                                                <input class="form-control" type="password" placeholder="Enter Confirm Password"  name="confirmpassword" id="confirmpassword">

                                                 @if ($errors->has('confirmpassword'))
                                                  <span class="error">{{ $errors->first('confirmpassword') }}</span>
                                                @endif
                                            </div>


                                          </div>
                                       </div>
                                   <div class="col-lg-12">
                                      <button class="btn btn-primary btn-warning" type="submit" >Change Password</button>
                                  </div>
                              </form>
                           </div>
                        </div>
                     </div>

                        </div>
                        <!-- /.card-body -->
                      </div>
                      <!-- /.card -->
                    </div>
                    <!-- /.col -->
                  </div>
                  <!-- /.row -->


          </div>

          <div class="col-md-8">
            <section class="content">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-12">
                      <div class="card table-responsive">
                        <div class="card-header">
                          <h3 class="card-title">Admin Profile Update</h3>
                         </div>
                        <!-- /.card-header -->
                            <div class="card-body">
                               <div class="row">
                                  <div class="col-md-12">
                                      <div class="tile">
                                          <form class="row" action="{{ route('profileUpdate') }}"  method="POST" enctype="multipart/form-data" id="admin-profile-form">
                                            @csrf
                                           <div class="col-lg-6">

                                                 <div class="form-group col-md-12 col-sm-12">
                                                    <label>First Name</label>
                                                    <input class="form-control" type="text" placeholder="Enter First Name" value="{{ $admin->first_name }}" name="first_name">

                                                 </div>
                                                 <div class="form-group col-md-12 col-sm-12">
                                                    <label>Last Name</label>
                                                    <input class="form-control" type="text" placeholder="Enter Last Name" value="{{ $admin->last_name }}" name="last_name">

                                                 </div>
                                                 <div class="form-group col-md-12 col-sm-12">
                                                    <label>Email Id</label>
                                                    <input class="form-control" type="text" placeholder="Enter Email Id" value="{{ $admin->email }}" name="email" disabled>

                                                 </div>
                                           </div>
                                           <div class="col-lg-6">
                                                 <div class="form-group col-md-12 col-sm-12">
                                                    <label>Mobile Number</label>
                                                    <input class="form-control phoneno" type="text" placeholder="Mobile Number" value="{{ $admin->phoneNumber }}" name="phoneNumber" >

                                                 </div>
                                                 <div class="form-group col-md-12 col-sm-12">
                                                    <label>Country</label>
                                                    <select class="form-control" name="country_id">
                                                        <option value="0">Select Country</option>
                                                        @foreach ($countries as $country)
                                                        <option value="{{ $country->id  }}" {{$admin->country_id == $country->id  ? 'selected' : ''}}>{{ $country->name }}</option>
                                                        @endforeach


                                                    </select>

                                                 </div>

                                           </div>
                                           <div class="col-lg-6">
                                              <div class="row" >
                                                <div class="form-group col-md-8 col-sm-12 m-auto ">
                                                    <div class="profile_img_run">
                                                       <div class="file-upload">
                                                           <div class="image-upload-wrap">
                                                               <input class="file-upload-input form-control" id="image" type='file' onchange="readURL(this);" accept="image/*" aria-describedby="fileHelp" name="image" style="display: none;" />
                                                           </div>
                                                        </div>
                                                    </div>
                                                  </div>
                                                </div>
                                           </div>

                                       <div class="col-lg-12">
                                          <button class="btn btn-primary btn-warning" type="submit" >Update Profile</button>
                                      </div>
                                  </form>
                               </div>
                              </div>
                            </div>
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

              <section class="content">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-12">
                      <div class="card table-responsive">
                        <div class="card-header">
                          <h3 class="card-title">Account Details Update</h3>
                         </div>
                        <!-- /.card-header -->
                        <div class="card-body">
                           <div class="row">
                              <div class="col-md-12">
                                  <div class="tile">
                                      <form class="row" action="{{ route('updateBankDetails') }}"  method="post" id="bank-detail-form">
                                         @csrf

                                         <!-- @foreach ($errors->all() as $error)
                                            <p class="text-danger">{{ $error }}</p>
                                         @endforeach  -->
                                       <div class="col-lg-12">
                                          <div class="row" >
                                             <div class="form-group col-md-6 col-sm-6">
                                                <label>Account Holder Name</label>
                                                <input class="form-control" type="text" placeholder="Enter Account Holder Name"  name="acountHolderName" value="{{ $admin->acountHolderName }}">
                                                @if ($errors->has('acountHolderName'))
                                                  <span class="error">{{ $errors->first('acountHolderName') }}</span>
                                                @endif
                                             </div>
                                             <div class="form-group col-md-6 col-sm-6">
                                                <label>Account Number</label>
                                                <input class="form-control" type="text" placeholder="Enter Acount Number"  name="acountNumber" value="{{ $admin->acountNumber }}">
                                                 @if ($errors->has('acountNumber'))
                                                  <span class="error">{{ $errors->first('acountNumber') }}</span>
                                                @endif
                                             </div>
                                             <div class="form-group col-md-6 col-sm-6">
                                                <label>IFSC</label>
                                                <input class="form-control" type="text" placeholder="Enter IFSC"  name="ifsc" value="{{ $admin->ifsc }}">
                                                 @if ($errors->has('ifsc'))
                                                  <span class="error">{{ $errors->first('ifsc') }}</span>
                                                @endif
                                            </div>
                                            <div class="form-group col-md-6 col-sm-6">
                                                <label>Account Address</label>
                                                <input class="form-control" type="text" placeholder="Enter Acount Address"  name="acountAdress" value="{{ $admin->acountAdress }}">
                                                 @if ($errors->has('acountAdress'))
                                                  <span class="error">{{ $errors->first('acountAdress') }}</span>
                                                @endif
                                            </div>
                                            <div class="form-group col-md-6 col-sm-6">
                                                <label>Bank Name</label>
                                                <input class="form-control" type="text" placeholder="Enter Bank Name"  name="bankName" value="{{ $admin->bankName }}">
                                                 @if ($errors->has('bankName'))
                                                  <span class="error">{{ $errors->first('bankName') }}</span>
                                                @endif
                                            </div>


                                          </div>
                                       </div>
                                   <div class="col-lg-12">
                                      <button class="btn btn-primary btn-warning" type="submit" >Update Bank Detail</button>
                                  </div>
                              </form>
                           </div>
                        </div>
                     </div>

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

            </div>

        </div>

      </div>
    </section>

  </div>
  <script type="text/javascript">


    function readURL(input) {
    if (input.files && input.files[0]) {

      var reader = new FileReader();

      reader.onload = function(e) {
         $('#admin_img').attr('src', e.target.result);
        $('.image-upload-wrap').hide();

        $('.file-upload-image').attr('src', e.target.result);
        $('.file-upload-content').show();

        $('.image-title').html(input.files[0].name);
      };

      reader.readAsDataURL(input.files[0]);

    } else {
      removeUpload();
    }
    $("#imgInp").change(function(){
      readURL(this);
  });
  }

  // function removeUpload() {
  //   $('.file-upload-input').replaceWith($('.file-upload-input').clone());
  //   $('.file-upload-content').hide();
  //   $('.image-upload-wrap').show();
  // }
  $('.image-upload-wrap').bind('dragover', function () {
      $('.image-upload-wrap').addClass('image-dropping');
    });
    $('.image-upload-wrap').bind('dragleave', function () {
      $('.image-upload-wrap').removeClass('image-dropping');
  });

  function currentPassword() {
      var upass = document.getElementById('currentpassword');
      var currentPassShow = document.getElementById('currentPassShow');
      $('#currentPassShow').removeClass("fa fa-eye-slash");
      $('#currentPassShow').addClass("fa fa-eye");
      if (upass.type == "password") {
          upass.type = "text";

      } else {
          upass.type = "Password";
           $('#currentPassShow').removeClass("fa fa-eye");
          $('#currentPassShow').addClass("fa fa-eye-slash");
      }
  }

  function newPassword() {
      var upass = document.getElementById('newpassword');
      var newPassShow = document.getElementById('newPassShow');
      $('#newPassShow').removeClass("fa fa-eye-slash");
      $('#newPassShow').addClass("fa fa-eye");
      if (upass.type == "password") {
          upass.type = "text";

      } else {
          upass.type = "Password";

          $('#newPassShow').removeClass("fa fa-eye");
          $('#newPassShow').addClass("fa fa-eye-slash");
      }
  }

  function confirmPassword() {
      var upass = document.getElementById('confirmpassword');
      var confirmPassShow = document.getElementById('confirmPassShow');
      $('#confirmPassShow').removeClass("fa fa-eye-slash");
      $('#confirmPassShow').addClass("fa fa-eye");
      if (upass.type == "password") {
          upass.type = "text";

      } else {
          upass.type = "Password";

          $('#confirmPassShow').removeClass("fa fa-eye");
          $('#confirmPassShow').addClass("fa fa-eye-slash");
      }
  }

</script>
@stop
