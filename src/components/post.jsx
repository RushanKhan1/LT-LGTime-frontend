import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button"
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import axios from "axios";



import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
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

    let [object, setObject] = useState({
	title: "",
	content: "",
	image: ""
    })

    let [sendRequest, setSendRequest] = useState(false);
    let [postError, setPostError] = useState(false);
    let [imageStatus, setImageStatus] = useState("");


    /* function getBase64(file) {
       var reader = new FileReader();
       reader.readAsDataURL(file);
       reader.onload = function () {
       console.log(reader.result.toString());
       setObject({
       ...object,
       image: (reader.result.toString())
       })

       };
       reader.onerror = function (error) {
       console.log('Error: ', error);
       };
     * } */



    function handleImage(event){
	setImageStatus("attached");
	/* getBase64(event.target.files[0]) */
	const formData = new FormData();
	formData.append("file", event.target.files[0]);
	formData.append("upload_preset", "q4njcwqy");
	
	axios.post("https://api.cloudinary.com/v1_1/rushan/image/upload", formData).then( (res) => {

	    setImageStatus("uploaded");
	    setObject({
		...object,
		image: res.data.public_id
	    })

	})

    }


// fix handler names and event handlers to input 


    function handleTitle(event) {
	object.title = event.target.value;
	setObject({
	    ...object,
	    title: object.title
	})
    }

    function handleContent(event) {
	object.content = event.target.value;
	setObject({
	    ...object,
	    content: object.content
	})
    }

    function handleSubmit(event) {

	setSendRequest(true)

    }


    useEffect( () => {
	let headers = {
	    "Access-Control-Allow-Origin": "*",
	    "token": localStorage.getItem("token")
	}


	if(sendRequest == true && imageStatus === "uploaded"){
	    // have to set this before the request
	    // because the request is executing twice before the state is set.
	    setSendRequest(false);
	    setImageStatus("");
	    axios.post("https://internship-task-backend.onrender.com/posts", object, { headers }).then( (res) => {
		console.log(res.data);
		setPostError(false);
		setObject({
		    title: "",
		    content: "",
		    image: ""
		})
		
		
	    } )
	    .catch( (err) => {setPostError(true); console.log(err); setSendRequest(false)} )
	    
	}
    })





  return (
      <div className="post-form-container">

	  { (localStorage.getItem("token") != undefined) ? 

	    <div>
		<h1>Create a post</h1>
		<form className={classes.root} noValidate autoComplete="off">
		    <div className="email">
			<TextField onChange={handleTitle} value={object.title} id="standard-required" label="Title" defaultValue="" />
			<div>
			    <TextField  onChange={handleContent} value={object.content} id="standard-required" label="Body" defaultValue="" />
			</div>
		    </div>
		    <input
			accept="image/*"
			className="post-image"
			id="contained-button-file"
			type="file"
			onChange={handleImage}
		    />
		    {
			postError ?  <p style={{color: "red"}}> Authentication Failed</p> : "" }
		    {
			(imageStatus === "attached") ? <p style={{color: "brown"}}> Image is being uploaded...</p> : "" }
	      {
		  (imageStatus === "uploaded") ? <p style={{color: "green"}}> Image uploaded successfully</p> : "" }





	  <Button onClick={handleSubmit} variant="contained" color="primary">
	      Post
	  </Button>
		</form>
	    </div> :
	    
	    <div>
		<h1>Login to create a post</h1>
		<Button href="/login" variant="contained" color="primary">
		    Login
		</Button>
	    </div>
	    
	  }
	  

      </div>
  );
}
