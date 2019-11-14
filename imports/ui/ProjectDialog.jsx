import React, { useState } from 'react';
import Projects, { insertProject } from '../api/projects';
import Customers from '../api/customers';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  textField: {
    margin: 'auto',
  },
}));

export default function ProjectDialog(props) {
  const classes = useStyles();
  const [newValue, setNewValue] = useState("");
  const [customer, setCustomer] = useState("");

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

  const handleAdd = () => {
    insertProject(newValue, customer)
    props.onClose();
    setCustomer("");
  };

  const handleChange = (event) => {
    setNewValue(event.target.value);
  };
  const handleCustomerChange = (event) => {
    setCustomer(event.target.value);
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose} aria-labelledby="project-add">
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
          <Button onClick={props.onClose} color="primary">
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
