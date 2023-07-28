export default function validate(values) {
    let errors = {};

    if (!values.email) {
        errors.email = 'Email field is required';
    } else if (values.email.length > 255) {
        errors.email = 'Please Enter Number Less than 255!';
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
        errors.email = 'Please enter valid Email!';
    }

    if (!values.password) {
        errors.password = 'Password field is required';
    } else if (values.password.length < 8 || values.password.length > 16) {
        errors.password = 'Please Enter Number More than 8 And Less Than 16 digit';
    }

    return errors;
  };