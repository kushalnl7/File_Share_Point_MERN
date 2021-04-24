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
import useScript from '../components/hooks/useScript'
import { TextField, InputBase } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Progress from '../components/fileuploader/progress2';
import { green, red } from '@material-ui/core/colors';
import clsx from 'clsx';
import AnimatedNumber from "react-animated-numbers"
import Editteam from './editteamform';
import CustomizedDialogs from "../components/Modals/editProfileModal"
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@material-ui/core/Box';


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
        borderLeft:'5px solid #5B6AD8',
        borderBottom:'5px solid #5B6AD8',
        borderTop:'5px solid #5B6AD8',
        borderRight:'2.5px solid #5B6AD8',
        borderRadius: '30px',
        
        // margin: '10px',
    },
    upload: {
        // marginLeft: '10px',
        padding: '20px',
        borderRadius: '30px',
        borderLeft:'2.5px solid #5B6AD8',
        borderBottom:'5px solid #5B6AD8',
        borderTop:'5px solid #5B6AD8',
        borderRight:'5px solid #5B6AD8',
        // border:'5px solid #5B6AD8',
        // margin: '10px',
    },
    linkgen: {
        // padding: '20px',
        marginTop: '20px',
        borderColor: 'green',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    pos: {
        paddingTop: '10px',
    },
    time: {
        paddingTop: '10px',
    },
    button: {
        marginTop: '10px',
        marginRight: '10px',
    },
    linkgencl:{
        // justifyContent: 'center',
        textAlignLast: 'center'
    },
    buttonsend: {
        marginTop: '20px',
        marginRight: '10px',
        marginLeft: '10px',
        // margin: '20px',
        justify: 'center',
    },
    buttonrefresh:{
        marginTop: '15px',
    },
    progress: {
        // marginTop: '30px',
        // marginRight: '10px',
    },
    copybtn: {
        marginTop: '20px',
        marginRight: '10px',
        marginLeft: '10px',
        // margin: '20px',
        justify: 'center',
    },
    button1Classname: {
        marginTop: '20px',
    },
    addbtns: {
        marginBottom: '20px',
    },
    button1Success: {
        marginTop: '20px',
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    fnumber:{
        paddingTop: "13px",
    },
}));

export default function Teamprofile() {

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

    useScript('https://code.jquery.com/jquery-3.3.1.slim.min.js', 'sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo', 'anonymous');
    useScript('https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js', 'sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1', 'anonymous');
    useScript('https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js', 'sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM', 'anonymous');


    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const [team, setTeam] = useState({});
    const [time, setTime] = useState();
    const [team_time, setTeam_time] = useState();
    const [teamvisibility, setTeamvisibility] = useState(false);
    let ID = useParams();
    const getrows = async () => {
        const rows_fetch = await axios.get(`${process.env.REACT_APP_URL}/team/getmembers/${ID._id}`);
        setRows(rows_fetch.data);
    }
    const getteam = async () => {
        const team_fetch = await axios.get(`${process.env.REACT_APP_URL}/team/getteam/${ID._id}`);
        setTeam(team_fetch.data);
        if(team_fetch.data.teamvisibility === "Public Team"){
            setTeamvisibility(true);
        }
        setTeam_time(team_fetch.data.createdAt.slice(0, 10));
    }
    const columns = [
        { field: 'firstname', title: 'First name', width: 130, sort: 'asc' },
        { field: 'lastname', title: 'Last name', width: 130, sort: 'asc' },
        { field: 'mobile', title: 'Mobile', width: 130, sort: 'asc' },
        { field: 'email', title: 'Email', width: 200, sort: 'asc' },
        //   { field: ' ', title: 'Add/Delete Members', width: 200, sort: 'asc' },
    ];

    const history = useHistory();
    async function deleteMember(data) {
        console.log(data);
        const del_res = await axios.post(`${process.env.REACT_APP_URL}/team/deletemember/${ID._id}`, data);
        toast.success(del_res.data);
        history.push(`/myteams`);

    }

    const [file, setFile] = useState({});
    // const [progress, setProgress] = useState();
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [genlink, setGenlink] = useState();
    const [uuid, setUuid] = useState();
    const [copied, setCopied] = useState(false);
    const [mailsent, setMailsent] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myfile', file);
        formData.append('displayname', file.name);

        try {
            const res = await axios.post(`${process.env.REACT_APP_URL}/api/files/team/${ID._id}`, formData, {
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

    const deleteHandler = async (e) => {
        try {
            if (window.confirm('Are you sure you wish to delete this team?')){
                const res = await axios.get(`${process.env.REACT_APP_URL}/team/delete/${ID._id}`);
                toast.success(res.data);
                history.push(`/myteams`);
            }
        }
        catch (err) {
            console.log(err);
        }
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
        const get_val = await axios.get(`${process.env.REACT_APP_URL}/team/getnooffiles/${ID._id}`);
        // console.log(get_val);
        setNumber(get_val.data);
    }
    useEffect(() => {
        getrows();
        getteam();
        getval();
    }, []);

    const sendmailHandler = async (e) => {
        e.preventDefault();
        const data = { uuid: uuid };
        try {
            const res = await axios.post(`${process.env.REACT_APP_URL}/api/files/send/team/${ID._id}`, data, {
                onUploadProgress: progressEvent => {
                    setmailPercentage(
                        parseInt(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                    );
                }
            })
            // setMailsent(true);
            setTimeout(() => setmailPercentage(0), 5000);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <Container>
            <Typography variant="h4" className={classes.mainheading}>
                Team Profile
          </Typography>
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} className={classes.teaminfo}>

                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Team Name:
                    </Typography>
                    <Typography variant="h5" component="h2">
                        <b>{team.teamname}</b>
                    </Typography>
                    {/* <Divider /> */}
                    <Typography className={classes.pos} color="textSecondary">
                        Description:
                    </Typography>
                    <Typography variant="h6" component="h3">
                        {team.description}
                    </Typography>
                    {/* <Divider /> */}
                    <Typography className={classes.pos} color="textSecondary">
                        Team type:
                    </Typography>
                            <Typography variant="h6" component="h3">
                                {team.teamtype}
                            </Typography>
                    {/* <Divider /> */}
                    <Typography className={classes.time} color="textSecondary">
                        Created At:
                    </Typography>
                    <Typography variant="h6" component="p">
                        {team_time}
                    </Typography>
                  
                </Grid>

                <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square className={classes.upload}>
                    {/* <FileUpload /> */}
                    {/* <Uploader /> */}
                    {/* <DragAndDrop /> */}
                    {/* <CircularIntegration />  */}
                    {/* <Typography variant="h5" component="h2" className={classes.head2}>
                        Share file with your team : 
                    </Typography> */}
                    <Grid container spacing={2} justify="center">
                        <Grid item>
                            <AnimatedNumber
                                fontStyle={{ fontFamily: "Nunito", fontSize: 40 }}
                                animateToNumber={number}
                                config={{ tension: 89, friction: 40 }}
                                // onStart={() => console.log("onStart")}
                                // onFinish={() => console.log("onFinish")}
                                animationType={"calm"}
                            />
                        </Grid>
                        <Grid item>
                        <Typography variant="h5" component="h2" className={classes.fnumber}>
                            Files shared
                        </Typography>
                        </Grid>
                    </Grid>
                    {/* <Divider /> */}
                    {/* <div>
                    <AnimatedNumber
                        fontStyle={{ fontFamily: "Nunito", fontSize: 40 }}
                        animateToNumber={number}
                        includeComma
                        config={{ tension: 89, friction: 40 }}
                        onStart={() => console.log("onStart")}
                        onFinish={() => console.log("onFinish")}
                        animationType={"calm"}
                        />
                        <Typography variant="h5" component="h2" >
                        Files shared till date
                    </Typography>
                    </div> */}
                    <Typography variant="h5" component="h2" className={classes.head2}>
                        <b>Share more files here!</b>
                    </Typography>
                    <form onSubmit={submitHandler} noValidate>

                        {/* <DropzoneArea
                        className={classes.upfile} 
                        showFileNames
                        dropzoneText="Upload your file here!"
                        showAlerts={false}
                        filesLimit={1}
                        name="file"
                        onChange={(files) => setFile(files[0])}  /> */}

                        <TextField
                            id="outlined-basic"
                            // label="File name" 
                            variant="outlined"
                            required
                            margin="normal"
                            type="file"
                            name="file"
                            fullWidth
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <Progress percentage={uploadPercentage} className={classes.progress} />
                    </form>

                    {genlink && (
                        <>
                            <TextField
                                InputProps={{ style: { fontSize: 20, color: 'black' } }} // font size of input text
                                InputLabelProps={{ style: { fontSize: 20, color: 'green' } }} // font size of input label
                                className={classes.linkgen}
                                disabled
                                id="outlined-disabled"
                                fullWidth
                                label="Link to download file"
                                defaultValue={genlink}
                                value={genlink}
                                variant="outlined"
                            />
                            <div className={classes.linkgencl}>
                            <CopyToClipboard text={genlink}>
                                <Button variant="contained" color="primary" onClick={copyHandler} className={classes.copybtn}>
                                    {copied === true && (<>Copied!</>)}{copied === false && (<>Copy Link </>)}
                                </Button>
                            </CopyToClipboard>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.buttonsend}
                                onClick={sendmailHandler}
                                endIcon={<Icon>send</Icon>}>
                                {mailsent === true && (<>Sent mail</>)}{mailsent === false && (<>Send mail</>)}
                            </Button>
                            <IconButton component="span" onClick={fileremHandler} className={classes.buttonrefresh}>
                                <RefreshIcon fontSize="large"/>
                            </IconButton>
                            {/* <Button variant="contained" color="primary" onClick={fileremHandler} className={classes.buttonsend}>
                                Upload another File
                            </Button> */}
                            {/* <SuccessBtn percentage={mailPercentage} 
                                onClick={sendmailHandler}/> */}

                            {/* <Button
                                variant="contained"
                                color="primary"
                                className={button1Classname}
                                disabled={loading1}
                                endIcon={<Icon>send</Icon>}
                                onClick={sendmailHandler}>
                                
                                {success1 && <>Sent mail to all</>}
                                {!success1 && <>Send mail to all</>}
                                </Button> */}
                        </div>
                        </>
                    )}

                </Grid>
            </Grid>
            <Grid container spacing={2} justify="center" className={classes.addbtns}>
                <Grid item>
                  <Button variant="contained" color="primary" href={`/updateTeam/` + team._id}>
                    Add members
                  </Button>
                </Grid>
                <Grid item>
                <CustomizedDialogs title="Edit profile">
                            <Editteam />
                        </CustomizedDialogs>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" onClick={deleteHandler}>
                    Delete Team
                  </Button>
                </Grid>
                {teamvisibility === true && (
                <Grid item>
                  <Button variant="contained" color="primary" href={`/grantaccess/` + team._id}>
                    Grant access
                  </Button>
                </Grid>
                )}
              </Grid>
            <MuiThemeProvider theme={theme}>
                <MaterialTable title="Team members"
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
                            onClick: (e, data) => deleteMember(data)
                        }
                    ]}
                />
            </MuiThemeProvider>
            <Box pt={7}></Box>
        </Container>
    );
}