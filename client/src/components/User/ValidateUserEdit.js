function validateUserInfo(values) {
    let errors = {};
    if (!values.firstname.trim()) {
        errors.firstname = 'Firstname required';
    } else if(values.firstname.trim().length < 3 || values.firstname.trim().length > 30){
        errors.firstname = 'Firstname should be of 3-30 characters';
    }

    if (!values.lastname.trim()) {
        errors.lastname = 'Lastname required';
    } else if(values.lastname.trim().length < 3 || values.lastname.trim().length > 30){
        errors.lastname = 'Lastname should be of 3-30 characters';
    }
    
    if (!values.dob) {
        errors.dob = 'Date of birth required';
    }
    return errors;
  }

export default validateUserInfo;
