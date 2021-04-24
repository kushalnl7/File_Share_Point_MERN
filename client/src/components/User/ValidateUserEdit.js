function validateUserInfo(values) {
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
    return errors;
  }

export default validateUserInfo;
