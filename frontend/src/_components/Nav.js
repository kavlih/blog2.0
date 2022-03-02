import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = (props) => {
  return (
    <nav className="m-nav navbar navbar-expand-sm navbar-dark">
      <div className="container-fluid">
        <div></div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarTogglerDemo02">
          <div className="col-1"></div>
          <div className="navbar-nav text-center">
            <NavLink className="nav-link" to="/feed">Feed</NavLink>
            <NavLink className="nav-link" to="/">Profile</NavLink>
            <NavLink className="nav-link" to="/">Users</NavLink>
          </div>
          <div className="col-1"></div>
        </div>
      </div>
    </nav>
  );
};

export { Nav };
