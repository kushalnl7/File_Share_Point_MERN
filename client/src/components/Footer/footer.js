import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

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

const useStyles = makeStyles((theme) => ({
    footer: {
    backgroundColor: theme.palette.grey[200],
    padding: theme.spacing(6),
  },
}));

export default function Footer() {
  const classes = useStyles();

    return (

    // <Box pt={40} >
    <div>
         <footer className={classes.footer}>
                  <Typography variant="h6" align="center" gutterBottom>
                    File Share Point
                  </Typography>
                  <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Hope you have a great experience!
                  </Typography>
                  <Copyright />
                </footer>
    </div>
    // </Box>

    );
}