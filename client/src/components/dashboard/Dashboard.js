import React, {useState} from 'react';
import Background from "../img/bg.png";
import Background1 from "../img/upload.png";
import Background2 from "../img/security.png";
import Background3 from "../img/time.png";
import Background4 from "../img/group.png";
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        File Share Point
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createMuiTheme();

var cardStyle = {
    display: 'block',
    width: '45vw',
    height: '30vw',
    '@media (max-width:600px)': {
        width: '55vw',
        height: '60vw',
        },
    '@media (max-width:300px)': {
        width: '55vw',
        height: '60vw',
        },
}
var cardmediaStyle = {
    height: '100%',
    width: '100%',
    objectFit: 'cover'
}

var cardcontentstyle = {
    paddingTop: '14.25%'
}

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};

theme.typography.h4 = {
  fontSize: '0.8rem',
  '@media (min-width:600px)': {
    fontSize: '1.2rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.6rem',
  },
};

theme.typography.h6 = {
  fontSize: '0.7rem',
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


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    height: '77vh',
    '& > *': {
      //margin: theme.spacing(1),
      width: '22ch',
    },
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  image: {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  image1: {
    backgroundImage: `url(${Background1})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    objectFit: 'cover',
  },
  image2: {
    backgroundImage: `url(${Background2})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  image3: {
    backgroundImage: `url(${Background3})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    //backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  image4: {
    backgroundImage: `url(${Background4})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
   appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  footer: {
    backgroundColor: theme.palette.grey[200],
    padding: theme.spacing(6),
  },
  
}));



export default function Dashboard() {
  const classes = useStyles();

    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


    return(
        <div class="guide">

            <center>
                {/* <ThemeProvider theme={theme}>
                    <Typography variant="h4">Welcome to Secured File Sharing Application</Typography>
                </ThemeProvider> */}
                {/* <Divider className={classes.divider} /> */}
                <Grid container component="main" className={classes.root}>
                    <CssBaseline />
                    {/* <Grid item xs={false} sm={false} md={1} lg={false} xl={false}/> */}
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.image} />
                    {/* <Grid item xs={false} sm={false} md={1} lg={false} xl={false}/> */}
                </Grid>
                {/* <Divider className={classes.divider} /> */}
                <ThemeProvider theme={theme}>
                    <Box m={2} />                   
                    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                        Here is a Quick Guide for you!
                    </Button>
                    
                        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                            <AppBar className={classes.appBar}>
                            <Toolbar>
                                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                <CloseIcon />
                                </IconButton>
                                <Typography variant="h6" className={classes.title}>
                                YOUR GUIDE !
                                </Typography>
                                <Button autoFocus color="inherit" onClick={handleClose}>
                                Got It!
                                </Button>
                            </Toolbar>
                            </AppBar>
                            <List>

                            <ListItem>
                            <Grid container direction="row" alignItems="stretch">
                                    {/* <Grid item xs={1} sm={false} md={1}  /> */}
                                    <Grid item xs={4} sm={4} md={5} className={classes.image1} />
                                    {/* <Grid item xs={1} sm={false} md={1}  /> */}
                                    <Grid item xs={8} sm={8} md={5}>
                                        <Card style={cardStyle}>
                                            <CardContent style={cardcontentstyle}>
                                            <Typography variant="h6">Upload any kind of file. With the high speed servers, file upload will never be the same again. Register for free to keep track of your uploaded files or other advance features.
                                                </Typography> 
                                             </CardContent>
                                        </Card>
                                        </Grid>
                            </Grid>
                            </ListItem>
                            <Divider />
                                    <ListItem>
                                <Grid container direction="row" alignItems="stretch">
                                    {/* <Grid item item xs={1} sm={false} md={1}/> */}
                                    <Grid item item xs={7} sm={8} md={6}>
                                        <Card style={cardStyle}>
                                            <CardContent style={cardcontentstyle}>
                                            <Typography variant="h6">Uploaded files are encrypted to keep your files secure. With access control, you will be sure that only the people you want can download your files.
                                            </Typography> 
                                        </CardContent> 
                                        </Card>
                                    </Grid>
                                    {/* <Grid item item xs={1} sm={false} md={1}/> */}
                                    <Grid item xs={5} sm={4} md={4} className={classes.image2}/>
                                </Grid>
                            </ListItem>
                            <Divider />
                                    <ListItem>
                            <Grid container direction="row" alignItems="stretch">
                                    {/* <Grid item xs={1} sm={false} md={1}/> */}
                                    <Grid item xs={5} sm={4} md={5} className={classes.image3}>
                                    </Grid>
                                    {/* <Grid item xs={1} sm={false} md={1}  /> */}
                                    <Grid item xs={7} sm={8} md={5}>
                                    <Card style={cardStyle}>
                                    <CardContent style={cardcontentstyle}>
                                    <Typography variant="h6">
                                        With expire duration option, you can set your files to expire after some amount of time. This way, your files will only be available for download for a certain amount of time.
                                     </Typography> 
                                </CardContent> 
                                </Card>     
                                </Grid>
                                </Grid>
                            </ListItem>
                            <Divider />
                                <ListItem>
                            <Grid container direction="row" alignItems="stretch">
                                    {/* <Grid item xs={1} sm={false} md={1}/> */}
                                    <Grid item item xs={7} sm={8} md={6}>
                                    <Card style={cardStyle}><CardContent style={cardcontentstyle}>
                                    <Typography variant="h6">
                                        You can create/update a team by adding or removing members so that you can share the file with team instead of sending it to one particular user at a time.
                                    </Typography> 
                                </CardContent></Card>
                                    </Grid>
                                    {/* <Grid item xs={1} sm={false} md={1}/> */}
                                    <Grid item xs={5} sm={4} md={4} className={classes.image4}>
                                    </Grid>
                                </Grid>
                                </ListItem>

                            </List>
                        </Dialog>
                </ThemeProvider>
            <Box pt={3} >
                <footer className={classes.footer}>
                  <Typography variant="h6" align="center" gutterBottom>
                    File Share Point
                  </Typography>
                  <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Hope you have a great experience!
                  </Typography>
                  <Copyright />
                </footer>
              </Box>
                 
            </center>

        </div>

    );

}