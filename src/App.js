import logo from './logo.svg';
import './App.css';
import Signup from "./components/signup.jsx";
import Login from "./components/login.jsx";
import Navbar from "./components/navbar.jsx";
import Home from "./components/home.jsx"

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
	<Router>
	<Switch>
	    <Route exact path="/login">
		<Navbar />
		<Login />
	    </Route>
	    <Route exact path="/signup">
		<Navbar />
		<Signup />
	    </Route>
	    <Route exact path="/">
		<Navbar />
		<Home />
	    </Route>
	    <Route exact path="/logout"> 
		<Navbar />
		<Home deleteToken={true} />
	    </Route>
	</Switch>
	</Router>
    </div>
      
  );
}

export default App;
