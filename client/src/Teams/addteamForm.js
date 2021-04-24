import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import { useState } from "react";
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
}));

export default function Addteam() {
    const classes = useStyles();

    const teamtypes = [
        {
            value: 'Professional Team',
            label: 'Professional Team',
        },
        {
            value: 'Business Team',
            label: 'Business Team',
        },
        {
            value: 'College Team',
            label: 'College Team',
        },
        {
            value: 'Project Team',
            label: 'Project Team',
        },
        {
            value: 'Personal Team',
            label: 'Personal Team',
        },
    ];

    const teamvisibilities = [
        {
            value: 'Private Team',
            label: 'Private Team',
        },
        {
            value: 'Public Team',
            label: 'Public Team',
        },
    ];

    const [teamname, setTeamname] = useState("");
    const [description, setDescription] = useState("");
    const [teamtype, setTeamtype] = useState("");
    const [teamvisibility, setTeamvisibility] = useState("");
    const values = { teamname, description, teamtype };
    const [errors, setErrors] = useState({});

    const history = useHistory();

    async function addteam(e) {
        e.preventDefault();
        // setErrors(validateLoginInfo(values));
        try {
            const teamData = {
                teamname,
                description,
                teamtype,
                teamvisibility,
            };
            // console.log("Running 1");
            // if(Object.keys(errors).length === 0){
            // console.log(errors);
            const team_info = await axios.post(`${process.env.REACT_APP_URL}/team/add`, teamData);
            // console.log(team_info);
            toast.success(team_info.data.msg);
            history.push(`/updateteam/${team_info.data.savedTeam._id}`);
            // }
        } catch (err) {
            console.error(err);
        }
    }

    return (

        <form onSubmit={addteam} className={classes.root} noValidate>
            <div>

                <TextField
                    id="outlined-textarea"
                    label="Team Name"
                    required
                    multiline
                    variant="outlined"
                    name="teamname"
                    onChange={(e) => setTeamname(e.target.value)}
                    value={teamname}
                    autoComplete="teamname"
                />
            </div>
            {/* {errors.email && <p>{errors.email}</p>} */}
            <div>
                <TextField
                    id="outlined-textarea"
                    label="Team Description"
                    multiline
                    variant="outlined"
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    autoComplete="description"
                />
                {/* {errors.password && <p>{errors.password}</p>} */}
            </div>
            <div>
                <TextField
                    id="outlined-select-currency"
                    select
                    required
                    label="Select"
                    variant='outlined'
                    value={teamtype}
                    helperText="Select type of your team"
                    onChange={(e) => setTeamtype(e.target.value)}
                >
                    {teamtypes.map((option) => (
                        <MenuItem key={option.value} value={option.value} >
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <div>
                <TextField
                    id="outlined-select-currency"
                    select
                    required
                    label="Select"
                    variant='outlined'
                    value={teamvisibility}
                    helperText="Select visibility of your team"
                    onChange={(e) => setTeamvisibility(e.target.value)}
                >
                    {teamvisibilities.map((option) => (
                        <MenuItem key={option.value} value={option.value} >
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Create
            </Button>

        </form>

    );
}