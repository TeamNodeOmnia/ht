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
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MenuItem from '@material-ui/core/MenuItem';

import ProjectCard from './ProjectCard';

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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [newValue, setNewValue] = useState("");
  const [customer, setCustomer] = useState("");

  const makeLink = (project) => {
    const customer = props.customers.find((r) => { if (r._id === project.customer) return true; });

    return (
      <Grid item key={project._id} xs={12} sm={6}>
        <ProjectCard project={project} customer={customer} />
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

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleAdd = () => {
    insertProject(newValue, customer)
    setDialogOpen(false);
    setSnackbarOpen(true);
  };

  const handleChange = (event) => {
    setNewValue(event.target.value);
  };
  const handleCustomerChange = (event) => {
    setCustomer(event.target.value);
  };

  return (
    <div>
      <Grid container spacing={2}>
        { projects }
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={ <span id="message-id">Project added</span> }
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
      <Fab color="primary" aria-label="add" className={classes.fab}
        onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <Dialog open={dialogOpen} onClose={handleClose} aria-labelledby="project-add">
        <DialogTitle id="project-add-title">Add project</DialogTitle>
        <DialogContent>
          <TextField className={classes.textField}
            id="customer-name"
            label="Customer"
            select
            value={customer}
            onChange={handleCustomerChange}
            fullWidth
          >
            {customers}
          </TextField>
          <TextField className={classes.textField}
            margin="dense"
            id="project-name"
            label="Project Name"
            fullWidth
            onChange={handleChange}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleAdd();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
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
