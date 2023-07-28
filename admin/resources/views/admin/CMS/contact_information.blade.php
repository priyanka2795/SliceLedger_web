@extends('admin.layouts.default')
@section('content')


  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Contact Information</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">

            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content" id="edit_section">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">

              <!-- /.card-header -->
            <div class="card-body">
              <div class="card card-info">
              <form class="form-horizontal">
                <div class="card-body">
                  <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                      <input type="email" class="form-control" id="inputEmail3" placeholder="Email" value="{{($contact_info==null)?" ":$contact_info->email}}" readonly>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 col-form-label">Call us</label>
                    <div class="col-sm-10">
                      <input  class="form-control"  placeholder="Call us" value="{{($contact_info==null)? ' ' :$contact_info->contact_no}}" readonly>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 col-form-label">Address</label>
                    <div class="col-sm-10">
                      <input  class="form-control"  placeholder="Address" value="{{($contact_info==null)?'':$contact_info->address}}" readonly>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 col-form-label">Android Link</label>
                    <div class="col-sm-10">
                      <input class="form-control"  placeholder="Android Link" value="{{($contact_info==null)?'':$contact_info->android_link}}" readonly>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 col-form-label">IOS Link</label>
                    <div class="col-sm-10">
                      <input  class="form-control"  placeholder="IOS Link" value="{{($contact_info==null)?'':$contact_info->ios_link}}" readonly>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 col-form-label">Facebook Link</label>
                    <div class="col-sm-10">
                      <input  class="form-control"  placeholder="Facebook Link" value="{{($contact_info==null)?'':$contact_info->facebook_link}}" readonly>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 col-form-label">Twitter Link</label>
                    <div class="col-sm-10">
                      <input  class="form-control"  placeholder="Twitter Link" value="{{($contact_info==null)?'':$contact_info->twitter_link}}" readonly>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 col-form-label">Instagram Link</label>
                    <div class="col-sm-10">
                      <input  class="form-control"  placeholder="Instagram Link" value="{{($contact_info==null)?'':$contact_info->instagram_link}}" readonly>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 col-form-label">Discord Link</label>
                    <div class="col-sm-10">
                      <input  class="form-control"  placeholder="Discord Link" value="{{($contact_info==null)?'':$contact_info->discord_link}}" readonly>
                    </div>
                  </div>
                </div>
                <!-- /.card-body -->
                <div class="">
                  <button type="button" id="editbtn" class="btn btn-warning float-right mr-3" onclick="div_hide_show(1);" >Edit</button>

                </div>
                <!-- /.card-footer -->
              </form>
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
    <!-- /.content -->
    <section class="content" style="display: none;" id="update_section">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">

              <!-- /.card-header -->
            <div class="card-body" >
              <div class="card card-info">
              <form action="{{ route('update_contact_info') }}" method="post">
                @csrf
              <input type="hidden" name="id"  value="{{($contact_info==null)?'':$contact_info->id}}" >
                <div class="card-body">
                  <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                      <input type="email" class="form-control" name="email" placeholder="Email" value="{{($contact_info==null)?'':$contact_info->email}}" >
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 col-form-label">Call us</label>
                    <div class="col-sm-10">
                      <input type="text"  class="form-control" name="contact_no"  placeholder="Contact Number" value="{{($contact_info==null)?'':$contact_info->contact_no}}" >
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 col-form-label">Address</label>
                    <div class="col-sm-10">
                      <input type="text"  class="form-control" name="address"  placeholder="Address" value="{{($contact_info==null)?'':$contact_info->address}}" >
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 col-form-label">Android Link</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" name="android_link"  placeholder="Android Link" value="{{($contact_info==null)?'':$contact_info->android_link}}">
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 col-form-label">IOS Link</label>
                    <div class="col-sm-10">
                      <input type="text"  class="form-control" name="ios_link" placeholder="IOS Link" value="{{($contact_info==null)?'':$contact_info->ios_link}}" >
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 col-form-label">Facebook Link</label>
                    <div class="col-sm-10">
                      <input  type="text" class="form-control" name="facebook_link" placeholder="Facebook Link" value="{{($contact_info==null)?'':$contact_info->facebook_link}}">
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 col-form-label">Twitter Link</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" name="twitter_link" placeholder="Twitter Link" value="{{($contact_info==null)?'':$contact_info->twitter_link}}" >
                    </div>
                  </div>
                   <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 col-form-label">Instagram</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" name="instagram_link" placeholder="Instagram Link" value="{{($contact_info==null)?'':$contact_info->instagram_link}}" >
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 col-form-label">Discord Link</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" name="discord_link" placeholder="Discord Link" value="{{($contact_info==null)?'':$contact_info->discord_link}}" >
                    </div>
                  </div>
                </div>
                <!-- /.card-body -->
                <div class="card-footer">
                  <button type="submit" id="updatebtn" class="btn btn-warning float-right"  onclick="div_hide_show(2);">Update</button>

                </div>
                <!-- /.card-footer -->
              </form>
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
  <!-- /.content-wrapper -->

@stop

<script>
    function div_hide_show(val){
     if(val==1){
     $('#update_section').show();
     $('#edit_section').hide();
    }else {
    $('#edit_section').show();
    $('#update_section').hide();
    }
}
</script>
