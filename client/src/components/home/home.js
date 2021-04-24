import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import axios from "axios";
import Container from '@material-ui/core/Container';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { TextField, InputBase } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
// import Progress from '../components/fileuploader/progress';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Progress from '../fileuploader/progress2';
import { green, red } from '@material-ui/core/colors';
import clsx from 'clsx';
import AnimatedNumber from "react-animated-numbers"
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from "../../components/layout/Cards/cardpublic";


const useStyles = makeStyles((theme) => ({
  root: {
    // height: '100vh',
    // paddingTop: '20px',
    // padding: '30px',
    padding: theme.spacing(2, 2, 6),
  },
  rootcard: {
    // minWidth: 205,
  },
  mainheading: {
    paddingTop: '20px',
    textAlign: 'center',
  },
  head2: {
    // paddingTop: '10px',
    textAlign: 'center',
    // marginTop: "10px",
  },
  upfile: {
    // padding: '10px',
    height: '20%',
  },
  teaminfo: {
    padding: '20px',
    // padding: theme.spacing(2, 2, 6),
    // marginRight: '10px',
    borderLeft: '5px solid #5B6AD8',
    borderBottom: '5px solid #5B6AD8',
    borderTop: '5px solid #5B6AD8',
    borderRight: '2.5px solid #5B6AD8',
    borderRadius: '30px',

    // margin: '10px',
  },
  upload: {
    // marginLeft: '10px',
    padding: '20px',
    borderRadius: '20px',
    // borderLeft: '2.5px solid #5B6AD8',
    // borderBottom: '5px solid #5B6AD8',
    // borderTop: '5px solid #5B6AD8',
    // borderRight: '5px solid #5B6AD8',
    border:'5px solid blue',
    marginTop: '20px',
  },
  linkgen: {
    // padding: '20px',
    marginTop: '20px',
    marginBottom: '20px',
    borderColor: 'green',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  // button: {
  //   marginTop: '10px',
  //   marginRight: '10px',
  // },
  buttonsend: {
    width: '140px',
    height: '40px',
    // marginTop: '35px',
    marginRight: '20px',
    // marginLeft: '20px',
  },
  copybtn: {
    width: '115px',
    height: '40px',
    // marginTop: '35px',
    margin: '10px',
  },
  buttonrefresh: {
    marginTop: '-5px',
  },
  progress: {
    // marginTop: '30px',
    // marginRight: '10px',
    justifyContent: "center",
  },
  button1Classname: {
    marginTop: '20px',
  },
  
  button1Success: {
    marginTop: '20px',
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fnumber: {
    paddingTop: "13px",
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
  },
  uploadbtn:{
    // display: 'none',
  },
}));

export default function Home() {

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: red[500],
      },
      secondary: {
        main: red[500],
      },
    },
  });

  const history = useHistory();
  const classes = useStyles();

  const [file, setFile] = useState({});
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [genlink, setGenlink] = useState();
  const [uuid, setUuid] = useState();
  const [copied, setCopied] = useState(false);
  const [mailsent, setMailsent] = useState(false);
  const [timelimit, setTimelimit] = useState(24);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('myfile', file);
    formData.append('displayname', file.name);
    formData.append('timelimit', timelimit);

    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}/api/files/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }, onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        }
      });
      // console.log(res.data.file);
      toast.success("File uploaded successfully!");
      setGenlink(`http://localhost:3000/download/${res.data.uuid}`);
      setUuid(res.data.uuid);
      getval();
      setTimeout(() => setUploadPercentage(0), 10000);
    }
    catch (err) {
      console.log(err);
    }
  }
  const copyHandler = (e) => {
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  }

  const fileremHandler = (e) => {
    window.location.reload();
  }


  const [mailPercentage, setmailPercentage] = useState(0);
  const [progress1, setProgress1] = React.useState(0);
  const [loading1, setLoading1] = React.useState(false);
  const [success1, setSuccess1] = React.useState(false);
  const button1Classname = clsx({
    [classes.button1Success]: success1,
  });
  React.useEffect(() => {
    return () => {
      setProgress1(0);
    };
  }, []);
  React.useEffect(() => {
    setProgress1(mailPercentage);
    // console.log(percentage);
    if (progress1 === 0) {
      setSuccess1(false);
      setLoading1(false);
      setMailsent(false);

    }
    else if (progress1 === 100) {
      setSuccess1(true);
      setLoading1(false);
      setMailsent(true);
    }
    else {
      setSuccess1(false);
      setLoading1(true);
      setMailsent(false);
    }
  });

  const [number, setNumber] = React.useState(0);
  const getval = async () => {
    const get_val = await axios.get(`${process.env.REACT_APP_URL}/auth/getnooffiles`);
    // console.log(get_val);
    setNumber(get_val.data);
  }
  useEffect(() => {
    getval();
  }, []);

  const [emailTo, setEmailto] = React.useState("");
  const sendmailHandler = async (e) => {
    e.preventDefault();
    const data = { uuid: uuid, emailTo: emailTo };
    try {
      if(emailTo){
        const res = await axios.post(`${process.env.REACT_APP_URL}/api/files/send`, data, {
          onUploadProgress: progressEvent => {
            setmailPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
          }
        })
        // setMailsent(true);
        if(res.data === "Mail sent successfully!"){
          toast.success(res.data);
        }
        else{
          toast.error(res.data);
        }
        setTimeout(() => setmailPercentage(0), 5000);
      }
      else{
        toast.error("Enter valid mail-id");
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  const SendButton = () => (
    <IconButton onClick={sendmailHandler}>
      <SendIcon />
    </IconButton>
    )

    const [publicteams, setPublicteams] = useState([]);
    const getpublicteams = async () => {
      const teams_fetch = await axios.get(`${process.env.REACT_APP_URL}/list/getpublicteams`);
      setPublicteams(teams_fetch.data);
    }
    useEffect(() => {
      getpublicteams();
    }, []);
    var cards = [];
    if(publicteams.length === 0){
      cards.push(
        <Typography variant="h5" align="center" paragraph color="textPrimary" gutterBottom className={classes.noteam}>
                No public teams yet... Go to My teams page to create your first public team and enjoy sharing!
        </Typography>
      )
    }
    else{
      for (var i = 0; i < publicteams.length; i++) {
        cards.push(
          <Card
            team={publicteams[i]}
          />
        );
      }
    }

  return (
    <>
    <Container maxWidth="sm">

      <Grid container component={Paper} elevation={6} square className={classes.upload} justify="center">
        <CssBaseline />



        <Grid container spacing={2} justify="center">
          <Grid item>
            <AnimatedNumber
              fontStyle={{ fontFamily: "Nunito", fontSize: 40 }}
              animateToNumber={number}
              config={{ tension: 89, friction: 40 }}
              animationType={"calm"}
            />
          </Grid>
          <Grid item>
            <Typography variant="h5" component="h2" className={classes.fnumber}>
              Files shared
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="h5" component="h2" className={classes.head2}>
          <b>Share more files here!</b>
        </Typography>
        <form onSubmit={submitHandler} noValidate>


          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            type="file"
            name="file"
            fullWidth
            className={classes.uploadbtn}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <TextField
            id="outlined-basic" 
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            name="timelimit"
            label="Enter time limit in hours"
            fullWidth
            value={timelimit}
            onChange={(e) => setTimelimit(e.target.value)}
          />
          <Progress percentage={uploadPercentage} className={classes.progress} />
        </form>

        {genlink && (
          <>
            <TextField
              InputProps={{ style: { fontSize: 20, color: 'black' } }}
              InputLabelProps={{ style: { fontSize: 20, color: 'green' } }}
              className={classes.linkgen}
              disabled
              id="outlined-disabled"
              fullWidth
              label="Link to download file"
              defaultValue={genlink}
              value={genlink}
              variant="outlined"
            />
              <TextField
                id="standard-name"
                // fullWidth
                variant="outlined"
                label="Enter mail-id"
                value={emailTo}
                onChange={(e) => setEmailto(e.target.value)}
                InputProps={{endAdornment: <SendButton />}}
              />
            <CopyToClipboard text={genlink}>
              <Button variant="contained" color="primary" onClick={copyHandler} className={classes.copybtn}>
                {copied === true && (<>Copied!</>)}{copied === false && (<>Copy Link </>)}
              </Button>
            </CopyToClipboard>
            <IconButton component="span" onClick={fileremHandler} className={classes.buttonrefresh}>
              <RefreshIcon fontSize="large" color="primary"/>
            </IconButton>
          </>
        )}
            {/* <Button
              variant="contained"
              color="primary"
              className={classes.buttonsend}
              onClick={sendmailHandler}
              endIcon={<Icon>send</Icon>}>
              {mailsent === true && (<>Sent mail</>)}{mailsent === false && (<>Send mail</>)}
            </Button> */}

      </Grid>


    </Container>
    <Container className={classes.cardGrid} maxWidth="md">
    <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
          Public Teams
        </Typography>
      <Grid container spacing={4}>
          {cards}
      </Grid>
    </Container>
    </>
  );
}