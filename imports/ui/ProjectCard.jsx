import React, { useState } from 'react';
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { deleteProject } from '../api/projects';

const useStyles = makeStyles(theme => ({
  card: {
    margin: 'auto',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
    marginLeft: 'auto',
  },
}));

export default function ProjectCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  let name = "";
  if (props.customer)
    name = props.customer.name;
  else
    name = "";

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleDeleteProject = () => {
    deleteProject(props.project);
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="body1">
          Customer: {name}<br />
          Project: {props.project.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Edit</Button>
        <Button size="small" onClick={handleDeleteProject}>Delete</Button>
        <IconButton
          className={ expanded? classes.expandOpen : classes.expand }
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2">
            Created: {
              props.project.createdAt.toLocaleDateString() +
              " " +
              props.project.createdAt.toTimeString()
            }
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
