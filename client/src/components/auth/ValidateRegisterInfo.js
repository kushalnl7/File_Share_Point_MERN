function validateRegisterInfo(values) {
    let errors = {};
  
    if (!values.firstname.trim()) {
      errors.firstname = 'Firstname required';
    }
    if (!values.lastname.trim()) {
        errors.lastname = 'Lastname required';
    }
    if (!values.dob) {
        errors.dob = 'Date of birth required';
    }
    if (!values.mobile) {
        errors.mobile = 'Mobile number required';
    } else if((values.mobile).length !== 10){
        errors.mobile = 'Mobile number should be of exactly 10 digits';
    }

    if (!values.email) {
      errors.email = 'Email required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 8) {
      errors.password = 'Password needs to be 8 characters or more';
    }
  
    if (!values.password2) {
      errors.password2 = 'Password is required';
    } else if (values.password2 !== values.password) {
      errors.password2 = 'Passwords do not match';
    }
    return errors;
  }

export default validateRegisterInfo;
