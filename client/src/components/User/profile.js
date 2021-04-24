import React from 'react';
import MaterialTable from 'material-table';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Container, CssBaseline } from '@material-ui/core';
import { createMuiTheme, makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import { Grid } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CustomizedDialogs from "../Modals/editProfileModal"
import Editprofile from "../User/profileedit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from "../../context/AuthContext";


const useStyles = makeStyles((theme) => ({
    root: {
        // display: 'flex',
        marginTop: "25px",
        marginBottom: "25px",
        border: '2px solid blue',
        borderRadius: '20px',
        padding: theme.spacing(2, 2, 2)

    },
    root1: {
        // padding: "20px",
        padding: theme.spacing(0, 2, 2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(5, 0, 6),
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 220,
        // paddingLeft: "40px"
        margin: "12px"
        // justify: "right",
        // paddingTop: '56.25%', // 16:9
    },
    name: {
        paddingBottom: "10px",
    },
    email: {
        paddingBottom: "0px",
    },
    mobile: {
        paddingBottom: "0px",
    },
    dob: {
        // paddingBottom: "10px",
    },
    files: {
        paddingRight: "10px",
        paddingLeft: "10px",
        paddingBottom: "20px",
    },
    teams: {
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingBottom: "20px",
    },
}));

const Profile = () => {

    const { getLoggedIn, getSuperUser } = useContext(AuthContext);
    const classes = useStyles();
    const history = useHistory();
    const [teams, setTeams] = useState([]);
    const [user, setUser] = useState({});
    const [userdob, setUserdob] = useState("");
    const getuser = async () => {
        const user_fetch = await axios.get(`${process.env.REACT_APP_URL}/auth/getuser`);
        // console.log(user_fetch)
        setUser(user_fetch.data);
        if(user_fetch){
            setUserdob(user_fetch.data.dob.slice(0, 10));
        }
    }
    useEffect(() => {
        getuser();
    }, []);
    const userimage = "https://image.freepik.com/free-vector/messages-backup-online-service-concept_81522-3385.jpg"
    const [rows_files, setRowsfiles] = useState([]);
    const [rows_teams, setRowsteams] = useState([]);
    const getrowsfiles = async () => {
        const rowsfiles = await axios.get(`${process.env.REACT_APP_URL}/list/getuserfiles`);
        for(var i = 0; i < rowsfiles.data.length; i++){
            rowsfiles.data[i].createdAt = rowsfiles.data[i].createdAt.slice(0, 10);
        }
        console.log(rowsfiles.data);
        setRowsfiles(rowsfiles.data);
    }
    const getrowsteams = async () => {
        const rowsteams = await axios.get(`${process.env.REACT_APP_URL}/list/getteams`);
        console.log(rowsteams.data);
        setRowsteams(rowsteams.data);
    }

    const columns_files = [
        { field: 'displayname', title: 'File name', width: 100, sort: 'asc' },
        { field: 'size', title: 'File size', width: 30, sort: 'asc' },
        { field: 'createdAt', title: 'Date', width: 50, sort: 'asc' },
    ];
    const columns_teams = [
        { field: 'teamname', title: 'Team name', width: 60, sort: 'asc' },
        { field: 'teamtype', title: 'Team type', width: 60, sort: 'asc' },
        // { field: 'teamvisibility', title: 'Team visibility', width: 130, sort: 'asc' },
    ];

    useEffect(() => {
        getrowsteams();
        getrowsfiles();
    }, []);

    async function clickHandler(data) {
        // console.log(data);
        history.push(`/teamprofileuser/${data._id}`);
    }

    async function deleteHandler() {
        if (window.confirm('Are you sure you wish to delete your account?')){
            console.log("Yes");
            const del_res = await axios.get(`${process.env.REACT_APP_URL}/auth/deleteuser`);
            await getLoggedIn();
            await getSuperUser();
            toast.success(del_res.data);
            history.push(`/login`);
        }
        else{
            console.log("No");
        }
        // const del_msg = await axios.get(`http://localhost:5000/auth/deleteuser`);
        // toast.success(del_res.data);
        // history.push(`/login`);
    }


    return (
        <div>
            <CssBaseline />
            <Container maxWidth="sm" className={classes.conatainer}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="250"
                            image="https://image.freepik.com/free-vector/messages-backup-online-service-concept_81522-3385.jpg"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="h2">
                            <b>{user.firstname} {user.lastname}</b>
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary" className={classes.email}>
                                    Email - <b>{user.email}</b>
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary" className={classes.mobile}>
                                    Mobile - <b>{user.mobile} </b>
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary" className={classes.dob}>
                                    Date of birth - <b>{userdob}</b>
                                </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                                <CustomizedDialogs title="Edit profile">
                                    <Editprofile />
                                </CustomizedDialogs>
                                <Button variant="outlined" color="secondary" onClick={deleteHandler}>
                                    Delete account
                            </Button>
                            </CardActions>
                </Card>
            </Container>
            {/* <div className={classes.heroContent}>
                <Container maxWidth="sm">
                    <Card className={classes.root}>
                        <CardMedia
                            className={classes.cover}
                            image={userimage}
                            title="Live from space album cover"
                        />
                        <div className={classes.details}>
                            <CardContent className={classes.content}>
                                <Typography component="h1" variant="h4" className={classes.name}>
                                    <b>{user.firstname} {user.lastname}</b>
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary" className={classes.email}>
                                    Email - <b>{user.email}</b>
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary" className={classes.mobile}>
                                    Mobile - <b>{user.mobile} </b>
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary" className={classes.dob}>
                                    Date of birth - <b>{userdob}</b>
                                </Typography>
                            </CardContent>

                            <CardActions>
                                <CustomizedDialogs title="Edit profile">
                                    <Editprofile />
                                </CustomizedDialogs>
                                <Button variant="outlined" color="secondary">
                                    Delete account
                            </Button>
                            </CardActions>
                        </div>
                    </Card>
                </Container>
            </div> */}
            <Grid container component="main" className={classes.root1} spacing={0}>
                <Grid item xs={12} sm={12} md={6} className={classes.files}>
                    <MuiThemeProvider>
                        <MaterialTable title="Shared files history"
                            data={rows_files}
                            columns={columns_files}
                            options={{
                                paging: false,
                                search: false,
                                headerStyle: {
                                    backgroundColor: '#039be5',
                                    color: '#FFF'
                                },
                                rowStyle: {
                                    backgroundColor: '#EEE',
                                }
                            }}
                        />
                    </MuiThemeProvider>
                </Grid>
                <Grid item xs={12} sm={12} md={6} className={classes.teams}>
                    <MuiThemeProvider>
                        <MaterialTable title="Your Teams"
                            data={rows_teams}
                            columns={columns_teams}
                            options={{
                                actionsColumnIndex: -1,
                                paging: false,
                                search: false,
                                headerStyle: {
                                    backgroundColor: '#039be5',
                                    color: '#FFF'
                                },
                                rowStyle: {
                                    backgroundColor: '#EEE',
                                }
                            }}
                            actions={[
                                {   
                                    icon: 'chevron_right',
                                    tooltip: 'Go to team profile',
                                    onClick: (event, data) => clickHandler(data)
                                },
                            ]}
                        />
                    </MuiThemeProvider>
                </Grid>
            </Grid>






            {/* <div className={classes.heroContent}>
                <Container>
                    <Listitems />
                </Container>
            </div> */}

        </div>
    )
}

export default Profile;