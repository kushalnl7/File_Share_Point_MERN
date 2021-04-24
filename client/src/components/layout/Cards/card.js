import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Toolbar from '@material-ui/core/Toolbar';
import collegeteam from '../../img/collegeteam.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 200
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    // image: `url(${collegeteam})`,
  },
  cardContent: {
    flexGrow: 1,
  },
  public:{
    color: 'green',
  },
  private:{
    color: 'red',
  },
}));

export default function OutlinedCard({ team }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  var teamimage = "";
  if (team.teamtype === "College Team") {
    teamimage = "https://image.freepik.com/free-vector/group-college-university-students-hanging-out_74855-5251.jpg"
  }
  else if (team.teamtype === "Business Team") {
    teamimage = "https://image.freepik.com/free-vector/people-starting-business-project_23-2148866842.jpg"
  }
  else if (team.teamtype === "Professional Team") {
    teamimage = "https://image.freepik.com/free-vector/businessman-holding-pencil-big-complete-checklist-with-tick-marks_1150-35019.jpg"
  }
  else if (team.teamtype === "Project Team") {
    teamimage = "https://image.freepik.com/free-vector/business-team-brainstorm-idea-lightbulb-from-jigsaw-working-team-collaboration-enterprise-cooperation-colleagues-mutual-assistance-concept-pinkish-coral-bluevector-isolated-illustration_335657-1651.jpg"
  }
  else if (team.teamtype === "Personal Team") {
    teamimage = "https://image.freepik.com/free-vector/employees-giving-hands-helping-colleagues-walk-upstairs_74855-5236.jpg"
  }
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={teamimage}
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {team.teamname}
          </Typography>
          <Typography>
            {team.teamtype}
          </Typography>
          {team.teamvisibility === "Private Team" && (
          <Typography className={classes.private}>
            {team.teamvisibility}
          </Typography>
          )}
          {team.teamvisibility === "Public Team" && (
          <Typography className={classes.public}>
            {team.teamvisibility}
          </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" href={`/updateTeam/` + team._id}>
            Add members
          </Button>
          <Button size="small" color="primary" href={`/teamprofile/` + team._id}>
            Team Profile
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
