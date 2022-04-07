import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Account  from '../../pages/account/Account';
import Feed     from '../../pages/feed/Feed';
import Profile  from '../../pages/profile/Profile';
import Settings from '../../pages/settings/Settings';
import Users    from '../../pages/users/Users';

const Router = () => {
  return (
    <Routes>
      <Route path="" element={<PrivateRoute />}>
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="/users/*" element={<Users />} />
      <Route path="/account/*" element={<Account />} />
    </Routes>
  );
}

export default Router;