// https://www.robinwieruch.de/react-router/

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Account from '../../pages/account/Account';
import Feed from '../../pages/feed/Feed';
import Profile from '../../pages/profile/Profile';
import Settings from '../../pages/settings/Settings';
import Users from '../../pages/users/Users';
import UserProfile from '../../pages/users/UserProfile';
import Layout from '../../components/Layout';
import NoContent from '../../components/NoContent';

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='' element={<PrivateRoute />}>
          <Route index element={<Feed />} />
          <Route path='feed' element={<Feed />} />
          <Route path='profile' element={<Profile />} />
          <Route path='settings' element={<Settings />} />
        </Route>
        <Route path='users' element={<Users />} />
        <Route path='users/:username' element={<UserProfile />} />
        <Route path='account/*' element={<Account />} />
      </Route>
      <Route path='*' element={<NoContent headline='This page does not exist: 404!' />} />
    </Routes>
  );
};

export default Router;