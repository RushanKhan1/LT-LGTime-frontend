import React, { useState ,useEffect } from "react";
import Card from "./card.jsx"
import Post from "./post.jsx"
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));


function Home(props) {
    const classes = useStyles();


    let [posts, setPosts] = useState([]);
    let [getPosts, setGetPosts] = useState(true);
    let [id, setId] = useState("");
    let [Delete, setDelete] = useState(false);
    let [url, setUrl] = useState("");
    let [loading, setLoading] = useState(true);
    

    useEffect(() => {

	if (props.deleteToken == true) { localStorage.removeItem("token") }

	if(getPosts == true){
	axios.get("https://internship-task-backend.onrender.com/posts").then( (res) => {
	    setPosts(res.data)
	    setLoading(false);
	} )
	    .catch( (err) => { console.log(err) } )
}



	let headers = {
	    "Access-Control-Allow-Origin": "*",
	    "token": localStorage.getItem("token")
	}

	let obj = {};
	if(Delete == true) {
	    setDelete(false)
	    axios.delete(url, { headers }).then( (res) => {
		console.log(res.data);
		console.log("in delete");
		setId("");
	    } )

		 .catch( (err) => {
		     console.log(err);
		     console.log("error");
	   })
	}
    })


    function renderPosts(post) {
	return (
	<Card id={post._id} title={post.title} image={post.image} content={post.content} country={post.country} handleDelete={handleDelete} />
	)
    }

    function handleDelete(_id) {

	setId(_id);
	setDelete(true);
	let Url ="https://internship-task-backend.onrender.com/posts/" + _id;
	console.log(Url);
	setUrl(Url);
	
    }


        
    return (
	<div>
	<Post />
	<div className="grid-container {classes.root}">
	     { loading ? <CircularProgress /> : posts.map(renderPosts) }
	</div>
	</div>
    )
}

export default Home;
