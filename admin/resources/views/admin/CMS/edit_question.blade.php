@extends('admin.layouts.default')
@section('content')


  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Edit Question</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
             <a href="{{ route('faqs') }}" class="btn btn-warning"><i class="fa fa-arrow-left"></i> Back</a>

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
            <div class="card">
            <div class="card-body">

            <div class="container">
            <form action="{{ route('update_question') }}" method="post" id="ckEditer-form">
                @csrf
                <input type="hidden" name="id"  value="{{ $faqs->id }}">
              <div class="row">

                <div class="col-sm-12">
                      <!-- textarea -->
                      <div class="form-group">
                        <label>Question</label>
                        <textarea  class="ckeditor required" name='question' id="question">
                       {{ $faqs->questions }}
                        </textarea>

                      </div>
                </div>
                <div class="col-sm-12">
                      <!-- textarea -->
                      <div class="form-group">
                        <label>Answer</label>
                        <textarea  class="ckeditor required" name='answer' id="answer">
                        {{ $faqs->answers }}
                        </textarea>

                      </div>
                </div>
                </div>
                <div>
                  <button type="submit" class="btn btn-warning float-right">Update</button>
              </div>
             </form>


            <!-- /.card -->
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
  </div>
  <!-- /.content-wrapper -->

@stop
