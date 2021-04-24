import React, { useState, useContext, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useHistory } from 'react-router-dom';
import axios from "axios";
import AuthContext from "../../../context/AuthContext";

function Navbar() {
  const history = useHistory();
  const [click, setClick] = useState(false);
  const { loggedIn, superuser } = useContext(AuthContext);
  const { getLoggedIn, getSuperUser } = useContext(AuthContext);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const logoutHandler = async (e) => {
    try {
      const res = await axios.get(`http://localhost:5000/auth/logout`);
      toast.success(res.data);
      await getLoggedIn();
      await getSuperUser();
      closeMobileMenu();
      history.push(`/login`);
    }
    catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <nav className='navbar'>
        <Link to='/login' className='navbar-logo' onClick={closeMobileMenu}>
          File Share Point
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>

        {loggedIn === false && (

                    <>
                    <li className='nav-item'>
                    <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                    Home
                    </Link>
                    </li>

                    <li className='nav-item'>
                    <Link
                    to='/login'
                    className='nav-links'
                    onClick={closeMobileMenu}>
                    Login
                    </Link>
                    </li>

                    <li className='nav-item'>
                    <Link
                    to='/register'
                    className='nav-links'
                    onClick={closeMobileMenu}>
                    Register
                    </Link>
                    </li>
                    
                    </>

                    )}


            {loggedIn === true && (

                  <>
                  <li className='nav-item'>
                    <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                      Home
                    </Link>
                  </li>

                  <li className='nav-item'>
                    <Link
                      to='/myteams'
                      className='nav-links'
                      onClick={closeMobileMenu}>
                      My-Teams
                    </Link>
                  </li>

                  <li className='nav-item'>
                    <Link
                      to='/profile'
                      className='nav-links'
                      onClick={closeMobileMenu}>
                      Profile
                    </Link>
                  </li>

                {superuser === true && (
                  <li className='nav-item'>
                    <Link
                      to='/useraccess'
                      className='nav-links'
                      onClick={closeMobileMenu}>
                      Grant Access
                    </Link>
                  </li>
                )}

                  <li className='nav-item'>
                  <Link
                    // to='/register'
                    className='nav-links'
                    onClick={logoutHandler}>
                    Logout
                    </Link>
                  </li>
                  </>

              )}
          
           
              {/* <li>
            {loggedIn === true && (
            <Link
              to='register'
              className='nav-links-mobile'
              onClick={logoutHandler}
            >
              Logout
            </Link>
             )}
          </li> */}
        </ul>
        {/* <Button /> */}
      </nav>
    </>
  );
}

export default Navbar;
