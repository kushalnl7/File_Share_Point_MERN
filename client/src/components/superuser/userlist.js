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

const Allusers = () => {

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
        const rows_fetch = await axios.get(`${process.env.REACT_APP_URL}/auth/getallusers`);
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
    async function delMember(data) {
        const res_msg = await axios.post(`${process.env.REACT_APP_URL}/auth/deleteusers`, data);
        toast.success(res_msg.data); 
        history.push(`/`);
    }

    return (
        <div>
            <CssBaseline />
            <div className={classes.heroContent1}>
                <Container maxWidth="sm">
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Manage users
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Remove all irrelevant users from platform and make it more safe. <b>Enjoy Sharing!</b>
                    </Typography>
                    
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
                                icon: 'delete',
                                tooltip: 'Delete all selected members',
                                onClick: (e, data) => delMember(data)
                            }
                        ]}

                    />
                </MuiThemeProvider>
            </Container>
            </div>
        </div>
    )
}

export default Allusers;