function validateTeamInfo(values) {
  let errors = {};
  console.log(values);
  if (!values.teamname.trim()) {
    errors.teamname = 'Teamname required';
  } else if(values.teamname.trim().length < 3 || values.teamname.trim().length > 30){
    errors.teamname = 'It should be of 3-30 characters';
  }


  if (!values.description.trim()) {
      errors.description = 'Team description required';
  } else if(values.description.trim().length < 3 || values.description.trim().length > 500){
    errors.description = 'It should be of 3-500 characters';
  }


  if (!values.teamtype) {
      errors.teamtype = 'Team type required';
  }
  if (!values.teamvisibility) {
      errors.teamvisibility = 'Team visibility required';
  }
  
  return errors;
}

export default validateTeamInfo;
