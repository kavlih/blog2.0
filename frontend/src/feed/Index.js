import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'

import { accountService } from '../_services';
import { UserContext } from "../_components";

const Feed = () => {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate();

  const handleLogout = () => {
    accountService.logout()
    navigate("/account/login")
  };

  return (
  <>
    <div className="container-fluid h-100">
      <p>{JSON.stringify(user)}</p>
      <button onClick={handleLogout}>logout</button>
    </div>
  </>
  );
}

export { Feed };
