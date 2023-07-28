jQuery.validator.addMethod("noSpace", function(value, element) { 
  return value.indexOf(" ") < 0 && value != ""; 
}, "No space please and don't leave it empty");

$('#token-price-form').validate({
  rules: {
    bnb_amount: {
    required: true,
    digits:true,
    pattern : /^-?\d*$/,
     },
  
  },
  messages: {
  bnb_amount: {
    required: "The INR amount field is required.",
    pattern:  "The INR amount must be a number",
    digits:   "The INR amount must be a number",
  },

  },
  errorElement: 'span',
  errorPlacement: function (error, element) {
    error.addClass('invalid-feedback');
    element.closest('.form-group').append(error);
  },
  highlight: function (element, errorClass, validClass) {
    $(element).addClass('is-invalid');
  },
  unhighlight: function (element, errorClass, validClass) {
    $(element).removeClass('is-invalid');
  },

});

  
 $("#ckEditer-form").validate({
        ignore: [],
        debug: false,
          rules: { 
             description:{
                   required: function() 
                  {
                   CKEDITOR.instances.description.updateElement();
                  },
                  minlength:10
              }
            },
          messages:
              {
               description:{
                  required:"Please Enter Text",
                  minlength:"Please enter 10 characters"
             }
      }
    });

 $("#faqs-form").validate({
  ignore: [],
  debug: false,
    rules: { 
       question:{
             required: function() 
            {
             CKEDITOR.instances.question.updateElement();
            },
           },
        answer:{
          required: function() 
         {
          CKEDITOR.instances.answer.updateElement();
         },
         }
      },
    messages: {
        question:{
            required:"Please Enter Question",
            },
         answer:{
            required:"Please Enter Answer",
        }
    },
    
}); 

$('#contact-us-form').validate({
    rules: {
        name: {
            required: true,
           },
        company: {
          required: true,
        },
        email: {
          required: true,
          email: true,
          pattern: /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i,
        },
        contactNumber: {
          required: true,
          digits:true,
          pattern : /^-?\d*$/,
          minlength: 10,
          maxlength: 10,
         },
         message: {
          required: true,
         },
      },
    messages: {
        name: {
            required: "The name field is required.",
          },
          company: {
          required: "The company field is required.",
        },
        email: {
          required: "The email field is required.",
          pattern: "Please enter a valid email address.",
        },
        contactNumber: {
          required: "The phone number field is required.",
          pattern:  "The phone number must be a number",
        },
        message: {
          required: "The message field is required.",
        },
    },
    errorElement: 'span',
    errorPlacement: function (error, element) {
      error.addClass('invalid-feedback');
      element.closest('.form-group').append(error);
    },
    highlight: function (element, errorClass, validClass) {
      $(element).addClass('is-invalid');
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).removeClass('is-invalid');
    },

});




$('#enquiry-form').validate({
    rules: {
    name: {
        required: true,
       },
    country: {
      required: true,
    },
    email: {
      required: true,
      email: true,
      pattern: /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i,
    },
    phone_no: {
      required: true,
      digits:true,
      pattern : /^-?\d*$/,
      minlength: 10,
      maxlength: 10,
     },
     requirement: {
      required: true,
     },
     file: {
        required: true,
       },
    },
    messages: {
      name: {
        required: "The name field is required.",
      },
      country: {
      required: "The country field is required.",
    },
    email: {
      required: "The email field is required.",
      pattern: "Please enter a valid email address.",
    },
    phone_no: {
      required: "The phone number field is required.",
      pattern:  "The phone number must be a number",
    },
    requirement: {
      required: "The requirement field is required.",
    },
    file: {
        required: "The file field is required.",
      },
    },
    errorElement: 'span',
    errorPlacement: function (error, element) {
      error.addClass('invalid-feedback');
      element.closest('.form-group').append(error);
    },
    highlight: function (element, errorClass, validClass) {
      $(element).addClass('is-invalid');
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).removeClass('is-invalid');
    },

  });

  $('#change-password-form').validate({
    rules: {
    currentpassword: {
      noSpace: true,
      required: true,
      minlength: 6,
      maxlength:16,
    },
    newpassword: {
      noSpace: true,
      required: true,
      minlength: 6,
      maxlength:16,

     },
    confirmpassword: {
      noSpace: true,
      required: true,
      minlength: 6,
      maxlength:16,
      equalTo : "#newpassword"

     },

      },
    messages: {

    currentpassword: {
      required: "The current password field is required.",
      minlength: "Your password must be at least 6 characters long",
    },
    newpassword: {
        required: "The new password field is required.",
        minlength: "Your password must be at least 6 characters long",
      },
    confirmpassword: {
        required: "The confirm password field is required.",
        minlength: "Your password must be at least 6 characters long",
        equalTo: "Please enter the same password as above"
      },
    },
    errorElement: 'span',
    errorPlacement: function (error, element) {
      error.addClass('invalid-feedback');
      element.closest('.form-group').append(error);
    },
    highlight: function (element, errorClass, validClass) {
      $(element).addClass('is-invalid');
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).removeClass('is-invalid');
    },

  });

  $('#login-form').validate({
    rules: {
    email: {
      required: true,
      email: true,
      pattern: /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i,
    },
    password: {
      noSpace: true,
      required: true,
      minlength: 3,
      maxlength:16,

     },

      },
    messages: {

    email: {
      required: "The email field is required.",
      pattern: "Please enter a valid email address.",
    },
    password: {
        required: "The password field is required.",
      },
    },
    errorElement: 'span',
    errorPlacement: function (error, element) {
      error.addClass('invalid-feedback');
      element.closest('.form-group').append(error);
    },
    highlight: function (element, errorClass, validClass) {
      $(element).addClass('is-invalid');
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).removeClass('is-invalid');
    },

  });


  $('#admin-profile-form').validate({
    rules: {
   first_name: {
      required: true,
       noSpace: true,
    },
    last_name: {
        required: true,
        noSpace: true,
      },
    phoneNumber: {
        required: true,
        digits:true,
        pattern : /^-?\d*$/,
        minlength: 10,
        maxlength: 10,
        noSpace: true,
     },

      },
    messages: {

    first_name: {
      required: "The first name field is required.",

    },
    last_name: {
        required: "The last name field is required.",

      },
    phoneNumber: {
        required: "The password field is required.",
        pattern:  "The phone number must be a number",
      },
    },
    errorElement: 'span',
    errorPlacement: function (error, element) {
      error.addClass('invalid-feedback');
      element.closest('.form-group').append(error);
    },
    highlight: function (element, errorClass, validClass) {
      $(element).addClass('is-invalid');
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).removeClass('is-invalid');
    },

  });

  $('#bank-detail-form').validate({
    rules: {
    acountHolderName: {
      required: true,

    },
    acountNumber: {
      required: true,
      minlength: 3,
      pattern : /^-?\d*$/,
    },
    ifsc: {
        required: true,
        minlength: 3,

       },
    acountAdress: {
        required: true,
        minlength: 3,

       },
    bankName: {
        required: true,
        minlength: 3,

       },

      },
    messages: {

    acountHolderName: {
      required: "The acount holder name field is required.",

    },
    acountNumber: {
        required: "The account number field is required.",
        pattern: "Please enter only digits.",
      },
    ifsc: {
    required: "The ifsc field is required.",
    },
    acountAdress: {
    required: "The account address field is required.",
    },
    bankName: {
    required: "The bank name field is required.",
    },
    },
    errorElement: 'span',
    errorPlacement: function (error, element) {
      error.addClass('invalid-feedback');
      element.closest('.form-group').append(error);
    },
    highlight: function (element, errorClass, validClass) {
      $(element).addClass('is-invalid');
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).removeClass('is-invalid');
    },

  });

 