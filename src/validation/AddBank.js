export default function validate(values) {
    var reg = /^[A-Za-z]{4}[0-9]{6,7}$/;
    let errors = {};
    if(!values.bankName  || !/^[a-zA-Z].*[\s\.]*$/g.test(values.bankName)){
      errors.bankName = 'Bank Name field is required'
    }
    
    if (!values.acountNumber) {
      errors.acountNumber = 'Account Number field is required';
    }else if (!/^-?\d*$/.test(values.acountNumber)) {
      errors.acountNumber = 'Please enter only digits!';
    }else if (values.acountNumber.length < 9 || values.acountNumber.length > 18) {
      errors.acountNumber = 'Please Enter Account Number More than 9 and Less than 18!';
    }

    if (!values.re_acountNumber) {
        errors.re_acountNumber = 'Re-Enter Account Number field is required';
      }else if (!/^-?\d*$/.test(values.re_acountNumber)) {
        errors.re_acountNumber = 'Please enter only digits!';
      }else if (values.re_acountNumber.length < 9 || values.re_acountNumber.length > 18) {
        errors.re_acountNumber = 'Please Re-Enter Account Number More than 9 and Less than 18!!';
      }else if(values.re_acountNumber != values.acountNumber){
        errors.re_acountNumber = 'Account Number and Re-Enter Account Number not matched!';
      }

    if (!values.ifsc) {
        errors.ifsc = 'IFSC Code field is required';
    } else if (!/^[A-Za-z]{4}[0-9]{6,7}$/.test(values.ifsc)) {
        errors.ifsc = 'Please specify a valid IFSC Code!';
    }

    if (!values.acountType || values.acountType==="") {
      errors.acountType = 'Please Select Account Type!';
     } 

     return errors;
  };