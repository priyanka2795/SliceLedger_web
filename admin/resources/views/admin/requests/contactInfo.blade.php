@extends('admin.layouts.default')
@section('content')


  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Contact Management</h1>
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
                <h3 class="card-title">User Contact List</h3>
                <div id="userExport" style="float:right">

                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body">

                <table id="kyc-table" class="table table-bordered table-hover ">
                  <thead>
                  <tr>
                    <th>Reply</th>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Message</th>
                  </tr>
                  </thead>
                  <tbody>
                    @php
                    $i = 1;
                    @endphp
                    @forelse ($contactinfos as $contact)
                    <tr>

                        <td>
                            @if ($contact->status != 1)
                                <a class="btn btn-warning reply-contact" data-id={{ $contact->id }} data-toggle="tooltip" data-placement="top" title="Click to reply">
                                    <i class="fa fa-reply"></i>
                                </a>
                            @else
                                <a class="btn btn-warning " data-toggle="tooltip" data-placement="top" title="Already give reply">
                                    <i class="fa fa-check"></i>
                                </a>
                            @endif
                        </td>
                        <td>{{ $i++}}</td>
                        <td>{{ $contact->name }}</td>
                        <td>{{ $contact->email }}</td>
                        <td>{{ $contact->subject }}</td>
                        <td>{{ $contact->message }}</td>
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

      <div id="contactModel" class="modal fade" role="dialog">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">Reply To User</h4>
                </div>
                <form method="POST" data-parsley-validate action="{{ route('contact-reply') }}" >
                    <div class="modal-body">
                      @csrf
                          <input type="hidden" value="" id="contact_id" class="contact_id" name="id">
                    </div>

                    <div class="modal-body" style="padding: 0rem 1rem">
                      <div class="form-group col-12">
                       <textarea class="form-control" id="comment" type="text" placeholder="Comment" name="comment" rows="3" required></textarea>

                      </div>

                  </div>

                    <div class="modal-footer">
                      <button type="button" class="btn btn-default" data-dismiss="modal">No</button>
                      <button type="submit" class="btn btn-warning" >Send</button>
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
