@extends('admin.layouts.default')
@section('content')


  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
             
            <h1>{{($cms==null)?" ":$cms->title}}</h1>
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
            <div class="">
               
              <!-- /.card-header -->
             <div class="card card-warning">

              <!-- /.card-header -->
               <div class="card-body">
                <form action="{{ route('updatecms') }}" role="form" method="POST" name="ckEditer-form" id="ckEditer-form">
                  @csrf
                <input type="hidden" class="form-control" name="id" value="{{($cms==null)?" ":$cms->id}}">
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="form-group">
                        <label>Title</label>
                        <input type="text" class="form-control" name="title" placeholder="Enter ..." value="{{($cms==null)?" ":$cms->title}}" readonly>
                      </div>
                    </div>
                   <div class="col-sm-12">
                      <!-- textarea -->
                      <div class="form-group">
                        <label>Description</label>
                        <textarea  class="ckeditor required form-control" name='description' id="description">
                          {{($cms==null)?" ":$cms->description}}
                        </textarea>
                        <script type="text/javascript">
                          CKEDITOR.replace( 'description')
                        </script>
                         
                     </div>
                   </div>
                   <div>
                       <button type="submit" class="btn btn-warning  ">Update</button>
                   </div>
                 </div>
                </form>
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
