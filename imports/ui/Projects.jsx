import React, { useState } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Projects, { insertProject, deleteProject } from '../api/projects';
import Customers from '../api/customers';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

import useSnackbar from './Snackbars';

import ProjectCard from './ProjectCard';
import ProjectDialog from './ProjectDialog';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  snackbar: {
    [theme.breakpoints.down('xs')]: {
      bottom: 90,
    },
  },
  textField: {
    margin: 'auto',
  },
}));

function ProjectsList(props) {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbar, openSnackbar] = useSnackbar();

  const makeLink = (project) => {
    const customer = props.customers.find((r) => { if (r._id === project.customer) return true; });

    return (
      <Grid item key={project._id} xs={12} sm={6}>
        <ProjectCard project={project} customer={customer} openSnackbar={openSnackbar} />
      </Grid>
    );
  };

  const projects = props.projects.map(
    project => makeLink(project)
  );

  const makeOption = (customer) => {
    return (
      <MenuItem key={customer._id}
        value={customer._id}
      >
        {customer.name}
      </MenuItem>
    );
  };

  const customers = props.customers.map(
    customer => makeOption(customer)
  );

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <Grid container spacing={2}>
        { projects }
      </Grid>
      {snackbar}
      <Fab color="primary" aria-label="add" className={classes.fab}
        onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <ProjectDialog open={dialogOpen} onClose={handleClose}
        customers={props.customers} openSnackbar={openSnackbar} />
    </div>
  );
}

// withTracker keeps track of all the changes to the customer list
// and will update the component every time there's changes
export default ProjectsList = withTracker(() => {
  return {
    projects: Projects.find().fetch(),
    customers: Customers.find().fetch(),
  };
})(ProjectsList);
