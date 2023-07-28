export default function validate(values) {
    let errors = {};

    if (!values.oldPassword) {
        errors.oldPassword = 'Old Password field is required';
    } else if (values.password.length < 5 && values.password.length > 100) {
        errors.oldPassword = 'Please Enter Number More than 5 And Less Than 100';
    }

    if (!values.password) {
        errors.password = 'Password field is required';
    } else if (values.password.length < 8 || values.password.length > 16) {
        errors.password = 'Please Enter Number More than 8 And Less Than 16 digit';
    }

    if (!values.cpassword) {
        errors.cpassword = 'Confirm Password field is required';
    }
    if (values.password != values.cpassword) {
        errors.cpassword = "Passwords don't match!";
    } 
    return errors;
  };