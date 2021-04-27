function validateRegisterInfo(values) {
  let errors = {};

  if (!values.firstname.trim()) {
    errors.firstname = 'Firstname required';
  }
  else if(values.firstname.trim().length < 3 || values.firstname.trim().length > 30){
    errors.firstname = 'Firstname should be of 3-30 characters';
  }


  if (!values.lastname.trim()) {
      errors.lastname = 'Lastname required';
  }
  else if(values.lastname.trim().length < 3 || values.lastname.trim().length > 30){
      errors.lastname = 'Lastname should be of 3-30 characters';
  }


  if (!values.dob) {
      errors.dob = 'Date of birth required';
  }


  if (!values.mobile) {
      errors.mobile = 'Mobile number required';
  } 
  else if((values.mobile).length !== 10){
      errors.mobile = 'Mobile number should be of exactly 10 digits';
  }


  if (!values.email) {
    errors.email = 'Email required';
  } 
  else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  else if(values.email.length < 3 || values.email.length > 320){
    errors.email = 'Email should be of 3-320 characters';
  }


  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = 'Password needs to be 8-20 characters';
  }

  if (!values.password2) {
    errors.password2 = 'Password is required';
  } else if (values.password2 !== values.password) {
    errors.password2 = 'Passwords do not match';
  }
  return errors;
}

export default validateRegisterInfo;
