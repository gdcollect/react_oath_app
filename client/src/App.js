import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import './App.css';

import Navbar from "./components/layouts/navbar/Navbar";
import Home from "./components/home/Home";
import Dashboard from "./components/dashboard/Dashboard";
import Signup from "./components/sign-up/Signup";
import Login from "./components/login/Login";
import About from "./components/about/About";
import Footer from "./components/layouts/footer/Footer";

import { Store } from "./store";
import { setAuthToken } from "./utils/setToken";
import { setCurrentUser, logOutUser } from "./actions/authAction";

import PrivateRoute from "./private/privateRoute";


// Check for token
if (localStorage.access_token && localStorage.access_user) {
  // Set auth token header auth
  setAuthToken(localStorage.access_token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.access_token);
  // Set user and isAuthenticated
  Store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    Store.dispatch(logOutUser());
    // Redirect to login
    window.location.href = '/login';
  }
}



export default class App extends Component {
  render() {
    return (
      <Provider store = { Store } >
        <Router>
          <React.Fragment>
            <header>
              <Navbar />
            </header>
            <main className="App container">
              <Switch>
                <Redirect from="/" to="/home" exact />
                <Route exact path="/home" component={ Home } />
                <Route exact path="/about" component={ About } />
                <PrivateRoute exact path="/dashboard" component={ Dashboard } />
                <Route exact path="/sign-up" component={ Signup } />
                <Route exact path="/login" component={ Login } />
              </Switch>
            </main>
            <Footer />
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}