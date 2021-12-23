import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Nav, PrivateRoute } from './_components';

import { Account } from './account/Index';
import { Feed } from './feed/Index';

const App = () => {
  return (
    <div id="wrapper" className="d-flex flex-column h-100 w-100">
      <Nav />
      <main>
        <div className="container-fluid h-100 d-flex">
          <Routes>
            <Route path="/feed" element={<PrivateRoute />}>
              <Route path="" element={<Feed />} />
            </Route>
            <Route path="/account/*" element={<Account />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export { App };
