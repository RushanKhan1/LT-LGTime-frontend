import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button"
import axios from "axios";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";





const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function FormPropsTextFields() {
  const classes = useStyles();
    let [sendRequest, setSendRequest] = useState(false);
    let [authError, setAuthError] = useState(false);
    let [object, setObject] = useState({
	email: "",
	password: ""
    })



    let history = useHistory();

    function handleEmail(event) {
	object.email = event.target.value;
	setObject({
	    ...object,
	    email: object.email
	}
	);
    }

    function handlePassword(event) {

	object.password = event.target.value;

	setObject({
	    ...object,
	    password: object.password
	});
    }

    function handleSubmit(event) {

	event.preventDefault();
	if(sendRequest) setSendRequest(false);
	else setSendRequest(true)
    }


    useEffect( () => {
	let headers = {
	    "Access-Control-Allow-Origin": "*"
	}

	if(sendRequest == true){
	    axios.post("https://listiee-backend.herokuapp.com/login", object, { headers }).then( (res) => {
	    
		setSendRequest(false);
		localStorage.setItem("token", res.data.token);

		if(res.data.token != undefined) {
		    setAuthError(false);
		    history.push("/");
		}

		
	    } )
	    .catch( (err) => {setAuthError(true); console.log(err)} )
	    
	}
    })

  return (
      <div className="form-container">
	  <h1>Login</h1>
    <form className={classes.root} noValidate autoComplete="off">
	<div className="email">
        <TextField required  value={object.email} onChange={handleEmail} id="standard-required" label="Email" defaultValue="" />
	  <div>
        <TextField required value={object.password} onChange={handlePassword} id="standard-required" label="Password" defaultValue="" />
	  </div>
	  </div>
	  <Button type="submit" onClick={handleSubmit} variant="contained" color="primary">
	      Login
	  </Button>
	  {(authError) ? <p style={{color: "red"}}> Authentication Failed</p>: ""
	  }
	  <p>Don't have an account? <Link to="/signup">Signup</Link></p>
    </form>
      </div>
  );
}
