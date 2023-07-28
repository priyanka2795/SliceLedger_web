$('#resendOtp').on('click', function() {
  var phoneNumber = $('#phoneNumber-otp').val();
  $.ajax({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  },
    url: SITE_URL + "/sendOtp",
    type: "POST",
    data: { phoneNumber : phoneNumber } ,

    success:function(response){
      console.log(response);
      if (response.id != '' && response.status == 200) {
        toastr["success"]("Resend OTP send successfully.")
      }
    },
   });
});

// delete address ..........................................
$('.address-delete').on('click', function() {
  var address = $(this).parent().find("input[name='delete_address_id']").val();

  $.ajax({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  },
    url: SITE_URL + "/deleteAddress",
    type: "POST",
    data: { id : address } ,

    success:function(response){
      console.log(response.result);
      if (response.status == 200) {
        $('.delete-div-'+response.result).remove();
        toastr["success"](response.message);
        location.reload();
      }
    },
   });
});



// update address .....................
$('.check-address').change (function() {
    var id = $(this).val();
    $.ajax({
            url: SITE_URL + "/get-address",
            type: "POST",
            data: { id },
            headers: {
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: "html",
            success: function(newRowContent) {
              $(".address-card").remove();
              $("#collapseEdit-"+id).append(newRowContent);
            },
        });
  });

  // add new address................
  $('#add-new-address').on('click', function() {
    $.ajax({
            url: SITE_URL + "/get-address",
            type: "POST",
            data: { id : null },
            headers: {
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: "html",
            success: function(newRowContent) {
              $(".address-card").remove();

              $("input[name='address_all']").prop('checked', false)
              $("#add-address").append(newRowContent);
            },
        });
  });
