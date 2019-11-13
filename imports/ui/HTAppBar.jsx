import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { setLinkProps, usePath } from 'hookrouter';

// HTAppBar - AppBar component for the project

const Pages = [
  { id: 1, name: 'Home', value: '/' },
  { id: 2, name: 'Customers', value: '/customers' },
  { id: 3, name: 'Projects', value: '/projects' },
];

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function HTAppBar() {
  const classes = useStyles();

  const makeButton = (page) => {
    return(
      <Button {...setLinkProps({ href: page.value })} color="inherit" key={page.id}>
        {page.name}
      </Button>
    );
  };
  const pages = Pages.map(
    page => makeButton(page)
  );

  const path = usePath();
  const page = Pages.find((e) => { if (e.value === path) return e.name; });

  // We create a Button for each page we have and add an onClick function
  // which calls the setPage function we passed to the GlobalContext from App.jsx
  return(
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {page.name}
          </Typography>
          {pages}
        </Toolbar>
      </AppBar>
    </div>
  );
}
