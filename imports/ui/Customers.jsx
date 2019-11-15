import React, { useState } from 'react';
import Typography from "@material-ui/core/Typography";
import { withTracker } from 'meteor/react-meteor-data';
import Customers, { insertCustomer, deleteCustomer } from '../api/customers';
import Chip from '@material-ui/core/Chip';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import useSnackbar from './Snackbars';

// CustomerList - component to list the current customers

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function CustomerList(props) {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newValue, setNewValue] = useState("");
  const [snackbar, openSnackbar] = useSnackbar();

  // makeLink is called on each customer and a Material UI Chip is returned
  const makeLink = (customer) => {
    return (
      <Chip key={customer._id}
        label={customer.name}
        onDelete={() => {
          openSnackbar('Customer "' + customer.name + '" deleted');
          deleteCustomer(customer);
        }}
      />
    );
  };

  const customers = props.customers.map(
    customer => makeLink(customer)
  );

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleAdd = () => {
    insertCustomer(newValue)
    setDialogOpen(false);
    openSnackbar('Customer "' + newValue + '" added');
  };

  const handleChange = (event) => {
    setNewValue(event.target.value);
  };

  return (
    <div>
      <Typography
        variant="h4">
        List of customers
      </Typography>
      <div style={{paddingTop: 10}}>
        { customers }
      </div>
      {snackbar}
      <Fab color="primary" aria-label="add" className={classes.fab}
        onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <Dialog open={dialogOpen} onClose={handleClose} aria-labelledby="customer-add">
        <DialogTitle id="customer-add-title">Add customer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="customer-name"
            label="Customer Name"
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
export default CustomerList = withTracker(() => {
  return {
    customers: Customers.find().fetch(),
  };
})(CustomerList);
