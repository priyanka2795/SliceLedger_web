@extends('admin.layouts.default')
@section('content')


  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Slice Token Price</h1>
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
             <div class="card-body">
            <div class="card table-responsive">
              <div class="card-header">
              	<form >
	                <div class="row">
	                	<div class="form-group col-sm-6">
          					    <label for="slice_token">Slice Token:</label>
          					    <input type="text" class="form-control"  value="{{($token_price==null)?' ':$token_price->token_quantity}}" readonly>
          					</div>
          					<div class="form-group col-sm-6">
          					    <label for="bnb_amount">INR Amount:</label>
          					    <input type="text" class="form-control" value="{{($token_price==null)?' ':$token_price->bnb_amount}}" readonly>
          					</div>
          					</div>
          	                <div>
          				  	    <button type="button" class="btn btn-info" onclick="div_hide_show(1);">Edit</button>
          				    </div>	
                </form>
                </div>
              </div>
              <!-- /.card-header -->
             

              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      
      <!-- /.container-fluid -->
    </section>

    <section class="content" style="display: none;" id="update_section" >
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card-body">
            <div class="card table-responsive">
              <div class="card-header">
                <form action="{{ route('update_token_price')}}" method="POST" id="token-price-form">
                  @csrf 
                  <input type="hidden" name="id"  value="{{($token_price==null)?'':$token_price->id}}" >
                  <div class="row">
                    <div class="form-group col-sm-6">
                        <label for="slice_token">Slice Token:</label>
                        <input type="text" class="form-control" name="token_quantity" value="{{($token_price==null)?' ':$token_price->token_quantity}}" readonly="">
                    </div>
                    <div class="form-group col-sm-6">
                        <label for="bnb_amount">INR Amount:</label>
                        <input type="text" class="form-control" name="bnb_amount"  value="{{($token_price==null)?null:$token_price->bnb_amount}}" id="demo" required>
                    </div>
                    </div>
                      <div>
                        <button type="submit" class="btn btn-info" onclick="div_hide_show(2);">Update</button>
                      </div>  
                </form>
                </div>
              </div>
              <!-- /.card-header -->
              

              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->

  
@stop
<script>
    function div_hide_show(val){
      let demo = $("#demo").val()
     if(val==1){
     $('#update_section').show();
     $('#edit_section').hide();
    }else {
    if(!demo){
     return
    }
    $('#edit_section').show();
    $('#update_section').hide();
    }
}
</script>