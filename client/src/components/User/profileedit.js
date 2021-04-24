import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import { useState, useEffect } from "react";
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from "react-router-dom";
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validateUserInfo from "./ValidateUserEdit";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '30ch',
        },
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    errors:{
        color: "red",
        marginTop: "-20px",
        marginLeft: "22px",
        // marginBottom: "0px",
    },
}));

export default function Editprofile() {
    const classes = useStyles();

    
    const [errors, setErrors] = useState({});
    const history = useHistory();
    const [user, setUser] = useState({});
    const [userdob, setUserdob] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [dob, setDob] = useState("");
    const getuser = async () => {
        const user_fetch = await axios.get(`${process.env.REACT_APP_URL}/auth/getuser`);
        setUser(user_fetch.data);
        setUserdob(user_fetch.data.dob.slice(0, 10));
        setFirstname(user_fetch.data.firstname)
        setLastname(user_fetch.data.lastname)
        setDob(user_fetch.data.dob.slice(0, 10))
        console.log(firstname, lastname, dob);
    }
    useEffect(() => {
        getuser();
    }, []);
    
    const values = {firstname, lastname, dob};
    
    async function editprofile(e) {
        e.preventDefault();
        setErrors(validateUserInfo(values));
        try {
            const formData = {
                firstname, 
                lastname,
                dob,
            };
            console.log(formData);
            console.log("Running 1");
            if(Object.keys(errors).length === 0 && firstname!=="" && lastname!=="" && dob!==""){
                const edit_profile = await axios.post(`${process.env.REACT_APP_URL}/auth/editprofile`, formData);
                toast.success(edit_profile.data);
                history.push(`/`);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (

        <form onSubmit={editprofile} className={classes.root} noValidate>
            <div>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="firstname"
              type="text"
              label="First Name"
              name="firstname"
              defaultValue={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              value={firstname}
              autoComplete="firstname"
            //   autoFocus
            />
            {errors.firstname && <div className={classes.errors}><p>{errors.firstname}</p></div>}
            </div>
            <div>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="lastname"
              type="text"
              label="Last Name"
              name="lastname"
              defaultValue={lastname}
              onChange={(e) => setLastname(e.target.value)}
              value={lastname}
              autoComplete="lastname"
            />
            {errors.lastname && <div className={classes.errors}><p>{errors.lastname}</p></div>}
            </div>
            <div>
            {/* <FormControl fullWidth variant="outlined" margin="normal"> */}
              {/* <InputLabel htmlFor="outlined-adornment-amount" margin="normal">Date of birth</InputLabel> */}
              {/* <OutlinedInput */}
              <TextField
                id="outlined-adornment-amount"
                variant="outlined"
                type="date"
                name="dob"
                label="Date of birth"
                margin="normal"
                defaultValue={user.dob}
                onChange={(e) => setDob(e.target.value)}
                value={dob}
                startAdornment={<InputAdornment position="start">Date of Birth * :</InputAdornment>}
                // labelWidth={90}
                autoComplete="dob"
              />
            {/* </FormControl> */}
            {errors.dob && <div className={classes.errors}><p>{errors.dob}</p></div>}
            </div>
            
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Edit details
            </Button>

        </form>

    );
}