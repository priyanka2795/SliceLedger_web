@extends('admin.layouts.default')
@section('content')


  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Feedback Management</h1>
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
            <div class="card table-responsive">
              <div class="card-header">
                <h3 class="card-title">User Feedback List</h3>
                <div id="feedbackExport" style="float:right">

                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body">

                <table id="feedback-table" class="table table-bordered table-hover ">
                  <thead>
                  <tr>
                    <th>Reply</th>
                    <th>No.</th>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Comment</th>
                </tr>
                  </thead>
                  <tbody>
                    @php
                    $i = 1;
                    @endphp
                    @forelse ($feedbacks as $feedback)
                    <tr>
                        <td>
                            @if ($feedback->status != 'completed')
                                <a class="btn btn-warning reply-feed" data-id={{ $feedback->id }} data-toggle="tooltip" data-placement="top" title="Click to reply">
                                    <i class="fa fa-reply"></i>
                                </a>
                            @else
                                <a class="btn btn-warning " data-toggle="tooltip" data-placement="top" title="Already give reply">
                                    <i class="fa fa-check"></i>
                                </a>
                            @endif
                        </td>
                        <td>{{ $i++}}</td>
                        <td>{{ $feedback->user['first_name'].' '.$feedback->user['last_name'] }}</td>
                        <td>{{ $feedback->user['email'] }}</td>
                        <td>{{ $feedback->user['phoneNumber'] }}</td>
                        <td>{{ date('d-m-Y', strtotime($feedback->created_at)) }}</td>
                        <td>{{ date('H:i A', strtotime($feedback->created_at)) }}</td>
                        <td>{{ $feedback->description }}</td>
                    </tr>
                    @empty
                        <tr class="no-data-row">
                            <td colspan="9" rowspan="2" align="center">
                                <div class="message"><p>No Data found!</p></div>

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

    <div id="replyModel" class="modal fade" role="dialog">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">Reply To User</h4>
                </div>
                <form method="POST" data-parsley-validate action="{{ route('feedback.store') }}" >
                    <div class="modal-body">
                      @csrf
                          <input type="hidden" value="" id="feed_id" class="feed_id" name="feed_id">
                    </div>

                    <div class="modal-body" style="padding: 0rem 1rem">
                      <div class="form-group col-12">
                       <textarea class="form-control" id="comment" type="text" placeholder="Comment" name="comment" rows="3" required></textarea>

                      </div>

                  </div>

                    <div class="modal-footer">
                      <button type="button" class="btn btn-default" data-dismiss="modal">No</button>
                      <button type="submit" class="btn btn-warning" onclick="commentSave();">Send</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
@stop
