export default function validate(values) {
    let errors = {};

    if (!values.name) {
        errors.name = 'Name field is required';
    } else if (!/^[a-zA-Z].*[\s\.]*$/g.test(values.name)) {
        errors.name = 'Please enter alphabet character!';
    } else if (values.name.length > 255) {
        errors.name = 'Please enter less than 255 character!';
    } 

    if (!values.email) {
        errors.email = 'Email field is required';
    } else if (values.email.length > 255) {
        errors.email = 'Please enter less than 255 character!';
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
        errors.email = 'Please enter valid Email!';
    }

    if (!values.subject) {
        errors.subject = 'Subject field is required';
    } else if (values.subject.length > 255) {
        errors.subject = 'Please enter less than 255 character!';
    } 

    if (!values.message) {
        errors.message = 'Message field is required';
    }

    return errors;
  };