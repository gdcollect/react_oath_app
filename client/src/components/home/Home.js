import React from 'react';
import { Link } from "react-router-dom";

import "./Home.css";

export default function Home() {
  return (
    <div className="Home">
      <div className="jumbotron mt-4 text-center text-light">
        <h1 className="display-4 mb-3">React Authentication App</h1>
        <br/>
        <Link className="btn btn-signup btn-light btn-lg" to="/sign-up">SIGN UP</Link>
        <Link className="btn btn-login text-light btn-lg" to="/login">LOGIN</Link>
      </div>
    </div>
  )
}
