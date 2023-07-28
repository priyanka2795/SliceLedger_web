@extends('admin.layouts.default')
@section('content')

<style>
.btn-success1{
  background: #ebebeb;
    border: none;
    color: grey;
    margin-right: 4px;
}
.btn-danger1{
  background: #ff4444;
    border: none;

    color:#fff;
}
.btn-danger1:hover{
  color:#fff;
}
.table-hover tbody tr:hover {
    color: #212529;
    background-color: rgb(191 190 190 / 8%);
}

.demo-1 {
   white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
   -webkit-line-clamp: 3;
  max-width: 500px;
}
</style>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>FAQ's</h1>
          </div>
          <div class="col-sm-6">
          <a href="{{ route('add_question') }}" class="btn btn-warning float-right" >Add Question</a>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 ">
            <div class="card">
            <div class="card-body">

              <!-- /.card-header -->

                <table id="faqs-table" class="table table-bordered table-hover table-responsive">
                  <thead>
                  <tr>
                    <th>No.</th>
                    <th>Question</th>
                    <th>Answer</th>
                    <th>Status</th>
                    <th>Action</th>

                  </tr>
                  </thead>
                  <tbody>
                  @php
                    $i = 1;
                    @endphp
                    @forelse ($faqs as $faq)
                    <tr>
                    <td>{{ $i++}}</td>
                    <td >{{ strip_tags(html_entity_decode($faq->questions)) }}</td>
                    <td class="demo-1">{{ strip_tags(html_entity_decode($faq->answers)) }}</td>
                   <td>
                      @if($faq->status == 0)
                      <a href="{{ route('question_status', $faq->id) }}" class="btn btn-success" >Active</a>
                      @else
                      <a href="{{ route('question_status', $faq->id) }}" class="btn btn-danger" >Deactive</a>
                      @endif
                    </td>
                    <td>
                    <div class="d-flex">
                    <a href="{{ route('edit_question',  encrypt($faq->id))}}" class="btn btn-success1 btn-flat float-left" style="border-radius:5px !important;"><i class="fa fa-edit"></i></a>
                    <form action="{{ route('delete_question',encrypt($faq->id)) }}" method="POST">
                           @csrf
                          <button type="submit" class="btn btn-danger1 ml-2"  onclick="return myFunction()"><i class="fa fa-trash"></i></button>
                         </form>
                    </div>
                    </td>
                    </tr>
                    @empty
                        <tr class="no-data-row">
                            <td colspan="9" rowspan="2" align="center">
                                <div class="message"><p>No user found!</p></div>

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
