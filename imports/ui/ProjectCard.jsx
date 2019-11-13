import React from 'react';
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  card: {
    margin: 'auto',
  },
}));

export default function ProjectCard(props) {
  const classes = useStyles();
  let name = "";
  if (props.customer)
    name = props.customer.name;
  else
    name = "";

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="body2">
          Customer: {name}<br />
          Project: {props.project.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
}
