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
import { useHistory} from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import validateRegisterInfo from "../auth/ValidateRegisterInfo";
import Background from "../img/login.jpg";
import {toast} from 'react-toastify';
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
  textField: {

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

export default function Register() {
  const classes = useStyles();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [dob, setDob] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState({});
  const { getLoggedIn, getSuperUser } = useContext(AuthContext);
  const history = useHistory();
  const values = {firstname, lastname, dob, mobile, email, password, password2};

  async function register(e) {
    e.preventDefault();
    setErrors(validateRegisterInfo(values));
    try {
      const registerData = {
        firstname,
        lastname,
        dob,
        mobile,
        email,
        password,
        password2,
      };
      if(Object.keys(errors).length === 0 && firstname!= "" && firstname!= "" && lastname!= "" && dob!= "" && mobile!= "" && password!= "" && password2!= "" && password===password2){
        const reg_res = await axios.post(`${process.env.REACT_APP_URL}/auth/register`, registerData);
        await getLoggedIn();
        await getSuperUser();
        if(reg_res.data === 'Registration Successful!'){
          toast.success("Registration Successful!");
          history.push("/");
        }
        else{
          toast.error(reg_res.data);
          history.push("/");
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

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
            Sign up
          </Typography>
          <form onSubmit={register} className={classes.form} noValidate>
            <div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstname"
              type="text"
              label="First Name"
              name="firstname"
              onChange={(e) => setFirstname(e.target.value)}
              value={firstname}
              autoComplete="firstname"
              autoFocus
            />
            {errors.firstname && <div className={classes.errors}><p>{errors.firstname}</p></div>}
            </div>
            <div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastname"
              type="text"
              label="Last Name"
              name="lastname"
              onChange={(e) => setLastname(e.target.value)}
              value={lastname}
              autoComplete="lastname"
            />
            {errors.lastname && <div className={classes.errors}><p>{errors.lastname}</p></div>}
            </div>
            <div>
            <FormControl fullWidth variant="outlined" margin="normal">
              {/* <InputLabel htmlFor="outlined-adornment-amount" margin="normal">Date of birth</InputLabel> */}
              <OutlinedInput
                id="outlined-adornment-amount"
                type="date"
                name="dob"
                margin="normal"
                required
                onChange={(e) => setDob(e.target.value)}
                value={dob}
                startAdornment={<InputAdornment position="start">Date of Birth * :</InputAdornment>}
                // labelWidth={90}
                autoComplete="dob"
              />
            </FormControl>
            {errors.dob && <div className={classes.errors}><p>{errors.dob}</p></div>}
            </div>
            <div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="mobile"
              type="number"
              label="Mobile Number"
              name="mobile"
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
              autoComplete="mobile"
            />
            {errors.mobile && <div className={classes.errors}><p>{errors.mobile}</p></div>}
            </div>
            <div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              type="email"
              label="Email Address"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoComplete="email"
            />
            {errors.email && <div className={classes.errors}><p>{errors.email}</p></div>}
            </div>
            <div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autoComplete="password"
            />
            {errors.password && <div className={classes.errors}><p>{errors.password}</p></div>}
            </div>
            <div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Confirm Password"
              type="password"
              id="password2"
              onChange={(e) => setPassword2(e.target.value)}
              value={password2}
              autoComplete="password2"
            />
            {errors.password2 && <div className={classes.errors}><p>{errors.password2}</p></div>}
            </div>
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
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Sign In"}
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