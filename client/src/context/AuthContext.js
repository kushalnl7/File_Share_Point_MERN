import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [superuser, setSuperUser] = useState(undefined);

  async function getLoggedIn() {
    const loggedInRes = await axios.get(`${process.env.REACT_APP_URL}/auth/loggedIn`);
    
    setLoggedIn(loggedInRes.data);
  }

  async function getSuperUser() {
    const superuserRes = await axios.get(`${process.env.REACT_APP_URL}/auth/superuser`);
    // console.log(superuserRes.data);
    setSuperUser(superuserRes.data);
  }

  useEffect(() => {
    getLoggedIn();
    getSuperUser();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn, superuser, getSuperUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
