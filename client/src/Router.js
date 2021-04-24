import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
// import Navbar from "./components/layout/Navbar";
import AuthContext from "./context/AuthContext";
// import Navbar from "./components/layout/newNavbar";
import Navbar from "./components/layout/Navbar/Navbar";
import UpdateTeam from "./Teams/updateTeam";
import Requestaccess from "./Teams/grantaccess";
import Myteams from "./Teams/myteams";
import Teamprofile from "./Teams/teamprofile";
import Home from "./components/home/home";
// import Home from "./components/home/Home";
import Profile from "./components/User/profile";
import Teamsuser from "./Teams/teamprofileuser";
import Dashboard from "./components/dashboard/Dashboard";
import Download from "./components/Download/Download";
import Footer from "./components/Footer/footer";
import Grantaccess from "./components/superuser/useraccess";

function Router() {
  const { loggedIn, superuser } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
      <Route exact path="/download/:_id">
              <Download />
            </Route>
        {loggedIn === false && (
          <>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
          </>
        )}
        {loggedIn === true && (
          <>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/updateteam/:_id">
              <UpdateTeam />
            </Route>
            <Route exact path="/grantaccess/:_id">
              <Requestaccess />
            </Route>
            <Route exact path="/teamprofileuser/:_id">
              <Teamsuser />
            </Route>
            <Route exact path="/myteams">
              <Myteams />
            </Route>
            <Route exact path="/teamprofile/:_id">
              <Teamprofile />
            </Route>
            {superuser === true && (
            <Route exact path="/useraccess">
              <Grantaccess />
            </Route>
            )}
            <Footer />
          </>
        )}
      </Switch>
      
    </BrowserRouter>
  );
}

export default Router;
