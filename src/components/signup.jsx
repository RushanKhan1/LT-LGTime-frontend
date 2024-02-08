import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button"
import PasswordField from 'material-ui-password-field'
import { Redirect } from "react-router-dom";
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


    let [confirmPassword, setConfirmPassword] = useState("");
    let [passwordEqual, setPasswordEqual] = useState(true);
    let [authError, setAuthError] = useState(false);
    let [sendRequest, setSendRequest] = useState(false);
    let [object, setObject] = useState({
	email: "",
	password: ""
    })
    let [userExists, setUserExists] = useState(false);

    let history = useHistory()

    useEffect( () => {
	let headers = {
	    "Access-Control-Allow-Origin": "*"
	}

	if(sendRequest == true && passwordEqual == true){
	    axios.post("https://internship-task-backend.onrender.com/signup", object, { headers }).then( (res) => {
	    
		localStorage.setItem("token", res.data.token);

		if(res.data.token != undefined) {
		    history.push("/");
		    setAuthError(false);
		}

		
		setUserExists(false);
		setSendRequest(false);

	    } )
		 .catch( (err) => {
		     console.log(err);
		     if(err.response.status == 401) {
			 setUserExists(true);
		     }
		     else {
			 setUserExists(false);
			 setAuthError(true);
		     }
		 } )
	    
	}
    })

    


    function emailChange(event) {

	object.email = event.target.value;
	setObject(
	    {
		...object,
		email: object.email
	    }
	);
}

    function passwordChange(event) {
	object.password = event.target.value;
	setObject({
	    ...object,
	    password: object.password
	}
	);
    }

    function confirmPasswordChange(event) {

	confirmPassword = event.target.value;
	setConfirmPassword(confirmPassword);
    }

    function handleSubmit(event) {
	event.preventDefault();
	console.log(object.password);
	console.log(confirmPassword);
	if(object.password.localeCompare(confirmPassword) != 0){
	    setPasswordEqual(false);
	}
	else setPasswordEqual(true);
	setSendRequest(true);
    }


  return (
      <div className="form-container">
	  <h1>Sign Up</h1>
    <form className={classes.root} noValidate autoComplete="off">
	  <div> 
              <TextField required id="standard-required" label="First Name" defaultValue="" />
	  </div>
	  <div>
        <TextField required id="standard-required" label="Last Name" defaultValue="" />
	  </div>
	  <div className="email">
        <TextField required value={object.email} onChange={emailChange} id="standard-required" label="Email" defaultValue="" />
	  </div>
	  <div>
        <TextField required value={object.password} onChange={passwordChange} id="standard-required" label="Password" defaultValue="" />
	  </div>
	  <div>
        <TextField required value={confirmPassword} onChange={confirmPasswordChange} id="standard-required" label="Confirm Password" defaultValue="" />

	  </div>
	  {(!passwordEqual) ? <p style={{color: "red"}}> Password didn't match </p>: ""
	  }

	  {
	      (authError) ? <p style={{color: "red"}}> Authentication Failed</p>: ""
	  }
	  {
	      (userExists) ? <p style={{color: "red"}}> User Already Exists</p> : ""
	  }


	  <Button type="submit" onClick={handleSubmit} variant="contained" color="primary">
	      Sign Up
	  </Button>
	  <p>Already have an account? <Link to="/login">Login</Link></p>
   </form>
      </div>
  );
}
