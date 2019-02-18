import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { validateName } from "../../validations/name.validate";
import { validateEmail } from "../../validations/email.validate";
import { validateUsername } from "../../validations/username.validate";
import { validatePassword } from "../../validations/password.validate";

import { addUser, getUsers } from "../../actions/authAction";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      username: "",
      password: "",
      password2: ""
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    this.props.getUsers();
  }

  onHandleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onHandleAddUser = (e) => {
    e.preventDefault();
    let newUser = {
      name: this.state.name,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2
    };

    if (
      validateName(newUser.name) && 
      validateEmail(newUser.email) && 
      validateUsername(newUser.username) && 
      validatePassword(newUser.password, newUser.password2)
    ) {
      this.props.addUser(newUser, this.props.history);
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <div className="Signup" onSubmit={ this.onHandleAddUser.bind(this) } >
        <div className="mt-4">
          <h1 className="display-4 text-center">Sign Up</h1>
          <h4 className="text-muted text-center">Let's Create Your New Account</h4>
          <form className="form-login py-5">
            <div className="row">
              <div className="col col-sm-12">
                <div className="form-group">
                  <label htmlFor="exampleInputName">Name</label>
                  <input type="text" name="name" className="form-control form-control-lg" id="exampleInputName" placeholder="Enter name" required
                  onChange={ this.onHandleChange.bind(this) } />
                  <small id="nameError" className="form-text text-danger d-none">Invalid name!</small>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col col-sm-12 col-md-6">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail">Email</label>
                  <input type="email" name="email" className="form-control form-control-lg" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter email" required
                  onChange={ this.onHandleChange.bind(this) } />
                  <small id="emailError" className="form-text text-danger d-none">Invalid email id!</small>
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
              </div>
              <div className="col col-sm-12 col-md-6">
                <div className="form-group">
                  <label htmlFor="exampleInputUsername">Username</label>
                  <input type="text" name="username" className="form-control form-control-lg" id="exampleInputUsername" placeholder="Enter Username" required
                  onChange={ this.onHandleChange.bind(this) } />
                  <small id="usernameError" className="form-text text-danger d-none">Invalid username!</small>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col col-sm-12">
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input type="password" name="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Enter password" required
                  onChange={ this.onHandleChange.bind(this) } />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col col-sm-12">
                <div className="form-group">
                  <label htmlFor="exampleInputPassword2">Confirm Password</label>
                  <input type="password" name="password2" className="form-control form-control-lg" id="exampleInputPassword2" placeholder="Confirm password" required
                  onChange={ this.onHandleChange.bind(this) } />
                  <small id="passwordError" className="form-text text-danger d-none">Password is not matched!</small>
                </div>
              </div>
            </div>
          <button type="submit" className="btn btn-lg btn-success btn-block">SIGN UP</button>
        </form>
        </div>
    </div>
    )
  }
}



Signup.propTypes = {
  addUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}


const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
};

export default connect(mapStateToProps, { addUser, getUsers })(Signup);

