import React from 'react';
import Background from "../img/download.png";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from "axios";

const theme = createMuiTheme({
  spacing: 8,
});

theme.typography.h4 = {
  fontSize: '1.3rem',
  '@media (min-width:600px)': {
    fontSize: '1.2rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.6rem',
  },
};

theme.typography.h6 = {
  fontSize: '0.5rem',
  '@media (min-width:600px)': {
    fontSize: '1.0rem',
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: '0.9rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.3rem',
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    
    // '@media screen and (max-width:600px)': {
    //     width: '40ch',
    //     height: '60vh',
    //     },
  },
  image: {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.8,
    
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
    '& .MuiTextField-root': {
      margin: 'auto',
      width: '30ch',
      paddingRight: '2ch',
      paddingBottom: '2ch',
      '@media (max-width:600px)': {
        width: '15ch',
        paddingBottom: '2ch',
        },
    },
  },
  downloadfile: {
    margin: theme.spacing(3, 0, 2),
  },
  message:{
    padding: '70px',
  },
}));

export default function Download() {
    let ID = useParams();
    const classes = useStyles();
    const [value, setValue] = React.useState('Controlled');
    const [file, setFile] = React.useState({});
    const [expire, setExpire] = React.useState(false);
    const [message, setMessage] = React.useState("");

    const getfile = async () => {
      const file_fetch = await axios.get(`${process.env.REACT_APP_URL}/files/${ID._id}`);
      console.log(file_fetch);
      if(file_fetch.data.uuid){
        setFile(file_fetch.data);
      }
      else{
        setExpire(true);
        setMessage(file_fetch.data);
      }
    }
    useEffect(() => {
      getfile();
    }, []);

  return (

    <center>
        <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={false} md={6} className={classes.image} />
      <Grid item xs={12} sm={12} md={6} component={Paper} elevation={6} square>
          {expire === false && (
          <>
        <div className={classes.paper}>
        <Box mt={9}>
         
         </Box>
          <Avatar className={classes.avatar}>
            <ArrowDownwardIcon />
          </Avatar>
          {/* <Typography component="h1" variant="h7">
            Your file is ready to download!
          </Typography> */}
          <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
          Your file is ready to download!
            </Typography>
          <Box mt={3}>
         
          </Box>
          <Box mt={2}>
         
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            File name - <b>{file.fileName}</b>
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            File size - <b>{file.fileSize} KB!</b>
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Link expires in <b>{file.timeLimit}</b> hours!
            </Typography>

            
            
            <Button
              href={file.downloadLink}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.downloadfile}
            >
              Download File
            </Button>
        
        </Box>
        </div>
        </>
        )}
        {expire === true && (
          <>
          <Box mt={15}>
         
          </Box>
          <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
                We are sorry!..
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph className={classes.message}>
            {message}
          </Typography>
            </>
        )}
      </Grid>
    </Grid>
    </center>

  );
}