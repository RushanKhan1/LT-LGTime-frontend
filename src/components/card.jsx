import React, { useState } from "react";
import data from "../data/db.json"
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [loading, setLoading] = useState(false);


  return (
    <Card style={{display: ""}} className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
          </IconButton>
        }
        title={props.title}
        subheader="India"
      />
      <CardMedia
        className={classes.media}
        image={"https://res.cloudinary.com/rushan/image/upload/v1622632360/" + props.image}
        title={props.title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
      {props.content}
      </Typography>
      </CardContent>
      <CardActions disableSpacing>
          <IconButton onClick={ () => {
	      
	      if(localStorage.getItem("token")){
		  setLoading(true);
		  props.handleDelete(props.id);
	      }
	      else {
		  alert("You are not logged in");
	      }

	  }} aria-label="add to favorites">
	      {loading ? <CircularProgress /> : <DeleteIcon />  }
	  </IconButton>
          <IconButton aria-label="share">
              <ShareIcon />
          </IconButton>
      </CardActions>
    </Card>
  );
}

