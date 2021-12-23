import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Login } from './Login';
import { Register } from './Register';

const Account = () => {

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