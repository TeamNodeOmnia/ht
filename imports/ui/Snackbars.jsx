import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  snackbar: {
    [theme.breakpoints.down('xs')]: {
      bottom: 90,
    },
  },
}));

export default function useSnackbar() {
  const classes = useStyles();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const queueRef = React.useRef([]);

  const processQueue = () => {
    if (queueRef.current.length > 0) {
      setMessage(queueRef.current.shift().message);
      setSnackbarOpen(true);
    }
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const openSnackbar = (message) => {
    queueRef.current.push({
      message,
      key: new Date().getTime(),
    });

    if (snackbarOpen) {
      setSnackbarOpen(false);
    } else {
      processQueue();
    }
  };

  const handleExited = () => {
    processQueue();
  };

  return [
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={handleSnackbarClose}
      onExited={handleExited}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={ <span id="message-id">{message}</span> }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={handleSnackbarClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
      className={classes.snackbar}
    />
  , openSnackbar];
}
