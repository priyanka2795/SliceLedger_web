export default function validate(values) {
    let errors = {};
    if (!values.first_name || !/^[a-zA-Z].*[\s\.]*$/g.test(values.first_name)) {
      errors.first_name = 'First Name field is required';
    } else if (values.first_name.length > 255) {
        errors.first_name = 'Please Enter Number Less than 255!';
    }

    if (!values.last_name || !/^[a-zA-Z].*[\s\.]*$/g.test(values.last_name)) {
        errors.last_name = 'Last Name field is required';
    } else if (values.last_name.length > 255) {
        errors.last_name = 'Please Enter Number Less than 255!';
    }

    if (!values.email) {
        errors.email = 'Email field is required';
    } else if (values.email.length > 255) {
        errors.email = 'Please Enter Number Less than 255!';
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
        errors.email = 'Please enter valid Email!';
    }

    if (!values.phoneNumber) {
        errors.phoneNumber = 'Phone Number field is required';
    } else if (!/^-?\d*$/.test(values.phoneNumber)) {
        errors.phoneNumber = 'Please enter only digits';
    } else if (values.phoneNumber.length < 8 || values.phoneNumber.length > 15) {
        errors.phoneNumber = 'Please enter no more than 8 and less than 15 digits.';
    }

    if (!values.password) {
        errors.password = 'Password field is required';
    } else if (values.password.length < 8 || values.password.length > 16) {
        errors.password = 'Please Enter Number More than 8 And Less Than 16 digit';
    }

    if (!values.cpassword) {
        errors.cpassword = 'Confirm Password field is required';
    }else if (values.password != values.cpassword) {
        errors.cpassword = "The password and confirmation password don't match!";
    }
    if (!values.country) {
        errors.country = 'Country field is required';
    } 

 
    return errors;
  };