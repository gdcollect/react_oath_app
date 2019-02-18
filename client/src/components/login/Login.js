import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./Login.css";

import { loginUser, getUsers } from "../../actions/authAction";
import { loginValidation } from "../../validations/login.validate";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }


  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    this.props.getUsers();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  onHandleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onValidateLoginCredentials = (userCredentials) => {
    const { users } = this.props.auth;
    users.map(loginUser => {
      return loginValidation(userCredentials, loginUser);
    });
  }

  onHandleLogin = (e) => {
    e.preventDefault();
    let newUser = {
      email: this.state.email,
      password: this.state.password
    };

    this.onValidateLoginCredentials(newUser);
    
    this.props.loginUser(newUser, this.props.history);
  }

  render() {
    return (
      <div className="Login">
        <div className="mt-4">
          <h1 className="login-heading text-center display-4">Log In</h1>
          <h4 className="text-muted text-center">Let's Get into Your Account</h4>
          <form className="form-login py-5" onSubmit={ this.onHandleLogin.bind(this) } >
            <div className="form-group">
              <label htmlFor="exampleInputEmail">Email</label>
              <input type="email" name="email" className="form-control form-control-lg" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter email" required
              onChange={ this.onHandleChange.bind(this) } />
              <small id="emailError" className="form-text text-danger d-none">Invalid email id!</small>
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword">Password</label>
              <input type="password" name="password" className="form-control form-control-lg" id="exampleInputPassword" placeholder="Enter password" required
              onChange={ this.onHandleChange.bind(this) } />
              <small id="passwordError" className="form-text text-danger d-none">Invalid password!</small>
            </div>
          <button type="submit" className="btn btn-lg btn-primary btn-block">LOGIN</button>
        </form>
      </div>
    </div>
    )
  }
}


Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}



const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}


export default connect(mapStateToProps, { loginUser, getUsers })(Login);
