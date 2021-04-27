function validateloginInfo(values) {
  let errors = {};

  if (!values.email) {
    errors.email = 'Email required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  } else if(values.email.length < 3 || values.email.length > 320){
    errors.email = 'Email should be of 3-320 characters';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = 'Password needs to be 8-20 characters';
  }
  if(values.length === 0){
    console.log("Did this");
    errors.email = 'Email required';
    errors.password = 'Password is required';
  }

  return errors;
}

export default validateloginInfo;
