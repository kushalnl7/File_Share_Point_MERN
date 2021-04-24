import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import { useState, useEffect } from "react";
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory, useParams } from "react-router-dom";
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

export default function Editteam() {
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

    const [teamname, setTeamname] = useState("");
    const [description, setDescription] = useState("");
    const [teamtype, setTeamtype] = useState("");
    const values = { teamname, description, teamtype };
    const [errors, setErrors] = useState({});

    const history = useHistory();

    const [team, setTeam] = useState({});
    let ID = useParams();
    const getteam = async () => {
        const team_fetch = await axios.get(`${process.env.REACT_APP_URL}/team/getteam/${ID._id}`);
        setTeam(team_fetch.data);
        setTeamname(team_fetch.data.teamname);
        setDescription(team_fetch.data.description);
    }
    useEffect(() => {
        getteam();
    }, []);

    async function editteam(e) {
        e.preventDefault();
        // setErrors(validateLoginInfo(values));
        try {
            const teamData = {
                teamname,
                description,
            };
            // console.log("Running 1");
            // if(Object.keys(errors).length === 0){
            // console.log(errors);
            const team_info = await axios.post(`${process.env.REACT_APP_URL}/team/editteamprofile/${ID._id}`, teamData);
            toast.success(team_info.data);
            history.push(`/myteams`);
            // }
        } catch (err) {
            console.error(err);
        }
    }

    return (

        <form onSubmit={editteam} className={classes.root} noValidate>
            <div>

                <TextField
                    id="outlined-textarea"
                    label="Team Name"
                    required
                    multiline
                    variant="outlined"
                    name="teamname"
                    defaultValue={teamname}
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
                    defaultValue={description}
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    autoComplete="description"
                />
                {/* {errors.password && <p>{errors.password}</p>} */}
            </div>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Edit team
            </Button>

        </form>

    );
}