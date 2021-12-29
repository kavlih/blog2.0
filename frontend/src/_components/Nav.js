// TODO Nav doesn't get rerendered after redirect from login

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = (props) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    setUser(loggedInUser)
  }, []);

  return (
    <nav className="m-nav navbar navbar-expand-lg">
      {/* if user is logged in */}
      {user && <div className="container-fluid">
        <div id="logo">
          <Link className="nav-link col-1" to="/">Logo</Link>
        </div>
        <div className="justify-content-center">
          <div className="navbar-nav">
            <Link className="nav-link" to="/feed">Feed</Link>
            <Link className="nav-link" to="/">Channels</Link>
            <Link className="nav-link" to="/">Profile</Link>
            <Link className="nav-link" to="/">Users</Link>
          </div>
        </div>
        <div>
          <Link className="nav-link col-1" to="/">Settings</Link>
        </div>
      </div>}
      {/* if user is NOT logged in */}
      {!user && <div className="container-fluid">
      <div id="logo" className="col-1">
          <Link className="nav-link" to="/">Logo</Link>
        </div>
        <div className="justify-content-center">
          <div className="navbar-nav">
            <Link className="nav-link" to="/account/login">Login</Link>
            <Link className="nav-link" to="/account/register">Register</Link>
          </div>
        </div>
        <div className="col-1">
          {/* Placeholder */}
        </div>
      </div>}
    </nav>
  );
};

export { Nav };
