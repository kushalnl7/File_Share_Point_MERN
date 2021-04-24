import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function SuccessBtn(percentage) {
  const classes = useStyles();

  const [progress, setProgress] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });
  React.useEffect(() => {
    return () => {
      setProgress(0);
    };
  }, []);
    React.useEffect(() => {
        setProgress(percentage.percentage);
        // console.log(percentage);
        if (progress === 0) {
            setSuccess(false);
            setLoading(false);
          }
        else if(progress === 100){
            setSuccess(true);
            setLoading(false);
        }
        else {
            setSuccess(false);
            setLoading(true);
        }
        });

  return (
    <div className={classes.root}>
      {/* <div className={classes.wrapper}>
        <Fab
          aria-label="save"
          color="primary"
          className={buttonClassname}
          type="submit"
        //   onClick={handleButtonClick}
        >
          {success ? <CheckIcon /> : <SaveIcon />}
        </Fab>
        {loading && <CircularProgress size={68} className={classes.fabProgress} />}
      </div> */}
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="primary"
          className={buttonClassname}
          disabled={loading}
          endIcon={<Icon>send</Icon>}>
        
          {/* Upload File */}
          {success && <>Sent mail to all</>}
          {!success && <>Send mail to all</>}
        </Button>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
    </div>
  );
}