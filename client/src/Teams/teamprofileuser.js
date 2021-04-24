import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { Grid } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const useStyles = makeStyles((theme) => ({
    root:{
        // padding: "20px",
        padding: theme.spacing(0, 2, 2),
    },
    files:{
      paddingRight: "10px",
      paddingLeft: "10px",
      paddingBottom: "20px",
    },
    users:{
      paddingRight: "10px",
      paddingLeft: "10px",
      paddingBottom: "20px",
    },
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
  },
  noteam: {
    marginTop: theme.spacing(4),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(5, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(0),
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function Teamsuser() {

    // const theme = createMuiTheme({
    //     palette: {
    //       primary: {
    //         main: red[500],
    //       },
    //       secondary: {
    //         main: red[500],
    //       },
    //     },
    // });

    const classes = useStyles();
    const history = useHistory();
    let ID = useParams();
    const [team, setTeam] = useState({});
    const [owner, setOwner] = useState("");
    const [team_time, setTeam_time] = useState();
    const getteam = async () => {
        const team_fetch = await axios.get(`${process.env.REACT_APP_URL}/team/getteam/${ID._id}`);
        setTeam(team_fetch.data);
        setTeam_time(team_fetch.data.createdAt.slice(0, 10));
    }
    const Leavehandler = async () => {
      if (window.confirm('Are you sure you wish to leave this team?')){
        const leave = await axios.get(`${process.env.REACT_APP_URL}/auth/leaveteam/${ID._id}`);
        toast.success(leave.data);
        history.push('/myteams');
      }
    }
    const getowner = async () => {
        const owner_fetch = await axios.get(`${process.env.REACT_APP_URL}/team/getowner/${ID._id}`);
        setOwner(owner_fetch.data);
    }

    const [rows_files, setRowsfiles] = useState([]);
    const [rows_users, setRowsusers] = useState([]);
    const getrowsfiles = async () => {
        const rows_files = await axios.get(`${process.env.REACT_APP_URL}/list/getteamfiles/${ID._id}`);
        for(var i = 0; i < rows_files.data.length; i++){
          rows_files.data[i].createdAt = rows_files.data[i].createdAt.slice(0, 10);
        }
        setRowsfiles(rows_files.data);
    }
    const getrowsusers = async () => {
        const rows_users = await axios.get(`${process.env.REACT_APP_URL}/team/getmembers/${ID._id}`);
        setRowsusers(rows_users.data);
    }

    const columns_files = [
        { field: 'displayname', title: 'File name', width: 100, sort: 'asc' },
        { field: 'size', title: 'File size', width: 30, sort: 'asc' },
        { field: 'createdAt', title: 'Date', width: 50, sort: 'asc' },
    ];
    const columns_users = [
        { field: 'firstname', title: 'First name', width: 60, sort: 'asc' },
        { field: 'lastname', title: 'Last name', width: 60, sort: 'asc' },
        { field: 'email', title: 'Email', width: 130, sort: 'asc' },
    ];

    useEffect(() => {
        getteam();
        getrowsfiles();
        getrowsusers();
        getowner();
    }, []);
  
  return (
    <>
      <CssBaseline />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="md">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              {team.teamname}
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              {team.description}
            </Typography>
            <Grid container spacing={1} justify="center">
                <Grid item>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Team owner :
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        <b> {owner.firstname} {owner.lastname}</b>
                    </Typography>
                </Grid>
              </Grid>
            <Grid container spacing={1} justify="center">
                <Grid item>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Created at :
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        <b> {team_time}</b>
                    </Typography>
                </Grid>
              </Grid>
            <div className={classes.heroButtons}>
              <Grid container spacing={0} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" onClick={Leavehandler}>
                    Leave Team
                  </Button>
                </Grid>
              </Grid>
            </div>
            </Container>
            </div>
            {/* <Container maxWidth="lg"> */}
            <Grid container component="main" className={classes.root} spacing={0}>
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
            <Grid item xs={12} sm={12} md={6} className={classes.users}>
            <MuiThemeProvider>
                <MaterialTable title="Team Members"
                    data={rows_users}
                    columns={columns_users}
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
            </Grid>
          {/* </Container> */}
        
        {/* <Container className={classes.cardGrid} maxWidth="md">
        <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
              Your Teams
            </Typography>
          <Grid container spacing={4}>
              {cards}
          </Grid>
        </Container> */}
      </main>
      {/* <Grid
        container
        spacing={4}
        className={classes.gridContainer}
        justify="center"
      >
        {cards}
      </Grid> */}

    </>
  );
}
