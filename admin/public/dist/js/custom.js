// cart button .........................
$('.emptyCart').on('click', function(){
    toastr.options = {
        "positionClass": "toast-top-left",
    };
    toastr["error"]('Your shopping cart is empty!')
});

// quantity calculation..................
$(".qnty_form").on('input',function(){
    var quantity = $(this).val();
    var price = $(this).parent().find("input[name='price']").val();
    var unitPrice = $(this).parent().find("input[name='unitPrice']").val();
    var subId = $(this).parent().find(".cart_id").val();
    var totalMRP = $("#totalMRP").val();
    var discount = $("#discount").val();
    var subTotalProduct =  quantity * price;
    var subtraictOld = totalMRP - unitPrice;
    var totalMRP = subtraictOld + subTotalProduct;
      $('.product-subtotal-'+ subId).html( moneyFromat(subTotalProduct));
      $(this).parent().find("input[name='unitPrice']").val(moneyFromat(subTotalProduct));
      $("#totalMRP").val( moneyFromat(totalMRP) );
      $('.totalMRP').html( moneyFromat(totalMRP) );
    var discountPrice = ( totalMRP * discount ) / 100;
    var total = (totalMRP - discountPrice);
    $("#subTotal").val(moneyFromat(totalMRP));
    $('.subTotal').html(moneyFromat(totalMRP));
    $("#total").val(moneyFromat(total));
    $('.total').html(moneyFromat(total));

});

// wallet calculation ....................
$('#walletamnt').change(function() {
   var subTotal = moneyFromat($("#get-total-checkOut").val());
   var walletaCount = moneyFromat($("#walletaCount-checkOut").val());

   if(walletaCount <= 0) {
      $('#walletamnt').prop('checked', false);
   }
    if(this.checked) {
      if (parseFloat(subTotal) >= parseFloat(walletaCount)) {
        var total =  subTotal - walletaCount;

        $('.total-checkOut').html(moneyFromat(total));
        $('.walletaCount-checkOut').html(moneyFromat(0));
      } else {
        var total =  walletaCount - subTotal;
        $('.total-checkOut').html(moneyFromat(0));
        $('.walletaCount-checkOut').html(moneyFromat(total));
      }
    } else {
      var total =  subTotal + walletaCount;

      $('.total-checkOut').html(moneyFromat(total));
      $('.walletaCount-checkOut').html(moneyFromat(walletaCount));
    }
});

// monyFormat..................
function moneyFromat(value) {
return data = parseFloat(value).toFixed(2);
}


$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
$(function () {
  $('[data-mdb-toggle="tooltip"]').tooltip()
})

$(document).on('click','.reply-feed', function() {
    var id = $(this).data('id');
    $('#feed_id').val(id);
    $('#replyModel').modal('show');
  });

  $(document).on('click','.reply-contact', function() {
    var id = $(this).data('id');
    $('#contact_id').val(id);
    $('#contactModel').modal('show');
  });




