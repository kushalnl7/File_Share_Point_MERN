import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "../components/layout/Cards/card";
import { Grid } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import CustomizedDialogs from "../components/Modals/addTeamModal";
import Teamform from "../Teams/addteamForm";
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
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
    marginTop: theme.spacing(4),
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

export default function Myteams() {
  const classes = useStyles();

  const [myteams, setMyteams] = useState([]);
  const getmyteams = async () => {
    const teams_fetch = await axios.get(`${process.env.REACT_APP_URL}/team/myteams`);
    setMyteams(teams_fetch.data);
  }
  useEffect(() => {
    getmyteams();
  }, []);
  var cards = [];
  if(myteams.length === 0){
    cards.push(
      <Typography variant="h5" align="center" paragraph color="textPrimary" gutterBottom className={classes.noteam}>
              No teams yet... Click on create team button to create your first team and enjoy sharing!
      </Typography>
    )
  }
  else{
    for (var i = 0; i < myteams.length; i++) {
      cards.push(
        <Card
          team={myteams[i]}
        />
      );
    }
  }

  return (
    <>
      <CssBaseline />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Share With Team
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Create your own team. Add your teammates to it. Share all files with your team in just one click. <b>Enjoy Sharing!</b>
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <CustomizedDialogs title="Create Team">
                    <Teamform />
                  </CustomizedDialogs>
                </Grid>
                {/* <Grid item>
                  <Button variant="outlined" color="primary">
                    Main call to action
                  </Button>
                </Grid> */}
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
        <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
              Your Teams
            </Typography>
          <Grid container spacing={4}>
              {cards}
          </Grid>
        </Container>
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
