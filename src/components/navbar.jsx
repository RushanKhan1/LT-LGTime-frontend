import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    let [signedIn, setSignedIn] = useState(false)

    useEffect( () => {

	if(localStorage.getItem("token")) {
	    setSignedIn(true);
	}
	else setSignedIn(false);
	
    } )
    
    return (
	<div className={classes.root}>
	    <AppBar position="static">
		<Toolbar>
		    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
			<MenuIcon />
		    </IconButton>
		    <Typography variant="h6" className={classes.title}>
			Listiee
		    </Typography>
		    { signedIn ?  <Button color="inherit" href="/logout">Log Out</Button> : <Button color="inherit" href="/signup">Sign Up</Button> }
		</Toolbar>
	    </AppBar>
	</div>
    );
}
