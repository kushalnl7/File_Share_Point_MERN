import React from 'react';
import MaterialTable from 'material-table';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Container, CssBaseline } from '@material-ui/core';
import { createMuiTheme, makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import { Grid } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const useStyles = makeStyles((theme) => ({
    heroContent1: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(5, 0, 6),
    },
    heroContent2: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(0, 0, 6),
      },
    heroButtons: {
      marginTop: theme.spacing(2, 0, 0),
    },
  }));

const UpdateTeam = () => {

    const classes = useStyles();
    const theme = createMuiTheme({
        palette: {
            primary: {
                main: green[500],
            },
            secondary: {
                main: green[500],
            },
        },
    });

    const [rows, setRows] = useState([]);
    let ID = useParams()
    console.log(ID._id);
    const getrows = async () => {
        const rows_fetch = await axios.get(`${process.env.REACT_APP_URL}/team/addmembers/${ID._id}`);
        setRows(rows_fetch.data);
    }
    useEffect(() => {
        getrows();
    }, []);
    const columns = [
        { field: 'firstname', title: 'First name', width: 130, sort: 'asc' },
        { field: 'lastname', title: 'Last name', width: 130, sort: 'asc' },
        { field: 'mobile', title: 'Mobile', width: 130, sort: 'asc' },
        { field: 'email', title: 'Email', width: 200, sort: 'asc' },
        //   { field: ' ', title: 'Add/Delete Members', width: 200, sort: 'asc' },
    ];
    const history = useHistory();
    async function addMember(data) {
        const res_msg = await axios.post(`${process.env.REACT_APP_URL}/team/updateteam/${ID._id}`, data);
        toast.success(res_msg.data); 
        history.push(`/teamprofile/${ID._id}`);
    }

    return (
        <div>
            <CssBaseline />
            <div className={classes.heroContent1}>
                <Container maxWidth="sm">
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Expand your team!
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Add teammembers to your team. Share all files with them in just one click. <b>Enjoy Sharing!</b>
                    </Typography>
                    <div className={classes.heroButtons}>
                        <Grid container spacing={2} justify="center">
                            <Grid item>
                                <Button variant="contained" color="primary" size="large" href={`/teamprofile/${ID._id}`}>
                                    Team Profile
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </div>
            <div className={classes.heroContent2}>
            <Container>
                <MuiThemeProvider theme={theme}>
                    <MaterialTable title="Add members"
                        data={rows}
                        columns={columns}
                        options={{
                            paging: false,
                            // sorting: false,
                            selection: true,
                            // filtering: true,
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
                                icon: 'add',
                                tooltip: 'Add all selected members',
                                onClick: (e, data) => addMember(data)
                            }
                        ]}

                    />
                </MuiThemeProvider>
            </Container>
            </div>
        </div>
    )
}

export default UpdateTeam;