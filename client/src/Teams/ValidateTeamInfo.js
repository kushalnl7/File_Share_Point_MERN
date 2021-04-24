function validateTeamInfo(values) {
    let errors = {};
    console.log(values);
    if (!values.teamname.trim()) {
      console.log(values.teamname);
      errors.teamname = 'Teamname required';
    }
    if (!values.description.trim()) {
        console.log(values.description);
        errors.description = 'Lastname required';
    }
    if (!values.teamtype) {
        console.log(values.teamtype);
        errors.teamtype = 'Team type required';
    }
    if (!values.teamvisibility) {
        console.log(values.teamvisibility);
        errors.teamvisibility = 'Team visibility required';
    }
    
    return errors;
  }

export default validateTeamInfo;
