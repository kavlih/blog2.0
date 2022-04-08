import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = (props) => {
  return (
    <nav className="nav-container">
      <div className="nav-start">
        {/* Logo */}
      </div>
      <div className="nav-center">
        <NavLink className="nav-link" to="/feed">Feed</NavLink>
        <NavLink className="nav-link" to="/profile">Profile</NavLink>
        <NavLink className="nav-link" to="/users">Users</NavLink>
      </div>
      <div className="nav-end">
        {/* Settings */}  
      </div>
    </nav>
  );
};

export default Nav;
