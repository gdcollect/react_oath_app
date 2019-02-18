import React, { Component } from 'react';
import { connect } from "react-redux";

import "./Dashboard.css";

import { getUsers } from "../../actions/authAction";


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    this.setState(prevState => {
      return {
        user: this.props.auth.currentUser
      }
    });
  }

  render() {
    //console.log(this.props.auth);
    return (
      <div className="Dashboard">
        <div className="jumbotron mt-4 text-center text-light">
          <h1 className="display-4 mb-3">Welcome { this.state.user.name }</h1>
          <br/>
          <a className="btn btn-dashboard btn-light btn-lg" href="https://www.github.com/rooneyrulz">VISIT GITHUB</a>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { getUsers })(Dashboard)
