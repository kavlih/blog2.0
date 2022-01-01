// TODO display users data

import React from 'react';
import { useNavigate } from 'react-router-dom'

import { accountService } from '../_services';

const Feed = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    accountService.logout()
    navigate("/account/login")
  };

  return (
    <div className="container">
      <h1>Hi!</h1>
      <p>You're logged in with React & JWT!!</p>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}

export { Feed };
