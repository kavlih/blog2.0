import React from 'react';
import { Link } from 'react-router-dom';

const Nav = (props) => {
  // const {} = props;
  return (
    <nav className="m-nav- navbar navbar-expand-lg">
      <div className="container-fluid">
        <div id="logo">
          <Link className="nav-link" to="/">
            Logo
          </Link>
        </div>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNavAltMarkup" 
          aria-controls="navbarNavAltMarkup" 
          aria-expanded="false" 
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {/* if user is NOT logged in */}
            <Link className="nav-link" to="/login">
              Login
            </Link>
            <Link className="nav-link" to="/register">
              Register
            </Link>
            {/* if user IS logged in */}
            {/* <Link className="nav-link" to="/feed">
              Feed
            </Link> */}
          </div>
        </div>
        <div>
          <Link className="nav-link" to="/">
            Settings
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
