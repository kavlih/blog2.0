import React from 'react';

import { Routes, Route } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';

import { Account } from '../account/Index';
import { Feed } from '../feed/Index';

const Router = (props) => {
  return (
    <Routes>
      <Route path="" element={<PrivateRoute />}>
        <Route path="/feed" element={<Feed />} />
      </Route>
      <Route path="/account/*" element={<Account />} />
    </Routes>
  );
}

export { Router };