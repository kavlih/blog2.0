import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { Login } from './Login';
import { Register } from './Register';

const Account = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser) {
      navigate("/feed");
    }
  });

  return (
    <div className="m-account col align-self-center justify-self-center">
      <Routes>
        <Route path={`/login`} element={<Login />} />
        <Route path={`/register`} element={<Register />} />
      </Routes>
    </div>
  );
}

export { Account };