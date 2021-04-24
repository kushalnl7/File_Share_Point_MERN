import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import validateLoginInfo from "../auth/ValidateLoginInfo";
import Background from "../img/login.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {'File Share Point '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    // backgroundImage: 'url(https://image.freepik.com/free-vector/photo-sharing-concept-illustration_114360-425.jpg)',
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  formpage: {
    backgroundColor: "whitesmoke",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errors:{
    color: "red",
    marginTop: "-15px",
    marginLeft: "10px",
    marginBottom: "-20px",
  },
}));

export default function Login() {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const values = {email, password};
  const [errors, setErrors] = useState({});
  const { getLoggedIn, getSuperUser } = useContext(AuthContext);
  const history = useHistory();

  async function login(e) {
    e.preventDefault();
    // const errors = validateLoginInfo(values);
    setErrors(validateLoginInfo(values));
    try {
      const loginData = {
        email,
        password,
      };
      // console.log("Running 1");
      // console.log(validateLoginInfo(values));
      if(Object.keys(errors).length === 0 && email!=="" && password!==""){
        setErrors(validateLoginInfo(values))
        console.log("Inside this");
        const log_res = await axios.post(`${process.env.REACT_APP_URL}/auth/login`, loginData);
        await getLoggedIn();
        await getSuperUser();
        console.log(log_res.data);
        if(log_res.data === 'Login Successful!'){
          toast.success("Login Successful!");
          history.push("/");
        }
        else{
          toast.error(log_res.data);
          history.push("/login");
        }
        
      }
      setErrors(validateLoginInfo(values))
    } catch (err) {
      console.error(err);
    }
  }

  // const emailHandler = (e) => {
    
  // }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className={classes.formpage}>
        <div className={classes.paper}>
        {/* <Typography component="h1" variant="h3">
            File Sharing System
          </Typography> */}
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={login} className={classes.form} noValidate>
          <div>
            <TextField
              variant="outlined"
              margin="normal"
              // required
              fullWidth
              id="email"
              type="email"
              label="Email Address"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value)
                // validateLoginInfo(values)
                // if (!values.email) {
                //   errors.email = 'Email required';
                // } else if (!/\S+@\S+\.\S+/.test(values.email)) {
                //   errors.email = 'Email address is invalid';
                // }
                // else{
                //   errors.email = "";
                // }
                
              }}
              value={email}
              autoComplete="email"
              autoFocus
            />
            </div>
            
            {errors.email && <div className={classes.errors}><p>{errors.email}</p></div>}
            
            <div>
            <TextField
              variant="outlined"
              margin="normal"
              // required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => {
                // if (!values.password) {
                //   errors.password = 'Password is required';
                // } else if (values.password.length < 8) {
                //   errors.password = 'Password needs to be 8 characters or more';
                // }
                // else {
                //   errors.password = "";
                // }
                // validateLoginInfo(values)
                setPassword(e.target.value)}
              }
              value={password}
              autoComplete="current-password"
            />
            </div>
            
            {errors.password && <div className={classes.errors}><p>{errors.password}</p></div>}
            
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}