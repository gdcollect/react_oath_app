import React, { Component } from 'react'
import { NavLink, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./Navbar.css";

import { logOutUser } from "../../../actions/authAction";

class Navbar extends Component {

    onHandleLogOut = (e) => {
        this.props.logOutUser();
    }

    render() {

      const { isAuthenticated } = this.props.auth;

      const authHeaderLink = (
        <Link className="navbar-brand" to="/dashboard">REACT-OATH</Link>
      );

      const guestHeaderLink = (
        <Link className="navbar-brand" to="/home">REACT-OATH</Link>
      );

      const authNavLink = (
          <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/dashboard">DASHBOARD</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/about">ABOUT</NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <a href="#!" className="nav-link" onClick={ this.onHandleLogOut.bind(this) }>LOGOUT</a>
                    </li>
                </ul>
            </div>
      );

      const guestNavLink = (
          <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/home">HOME</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/about">ABOUT</NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/sign-up">SIGN UP</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">LOGIN</NavLink>
                    </li>
                </ul>
            </div>
      );

      return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark px-lg-5">
                { isAuthenticated ? authHeaderLink : guestHeaderLink }
                <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                { isAuthenticated ? authNavLink : guestNavLink }
            </nav>
        </div>
    )
  }
}


Navbar.propTypes = {
    logOutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}



const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { logOutUser }) (withRouter(Navbar));

