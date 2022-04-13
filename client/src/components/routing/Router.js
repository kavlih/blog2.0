// https://www.robinwieruch.de/react-router/

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Typography from '@mui/material/Typography';

import PrivateRoute from './PrivateRoute';
import Account from '../../pages/account/Account';
import Feed from '../../pages/feed/Feed';
import Profile from '../../pages/profile/Profile';
import Settings from '../../pages/settings/Settings';
import Users from '../../pages/users/Users';
import UserProfile from '../../pages/users/UserProfile';
import Layout from '../../components/Layout';

const NoRoute = () => {
  return (
    <Typography variant="h3">This page does not exist: 404!</Typography>
  );
};

export default function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="" element={<PrivateRoute />}>
          <Route index element={<Feed />} />
          <Route path="feed" element={<Feed />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="users" element={<Users />} />
        <Route path="users/:username" element={<UserProfile />} />
        <Route path="account/*" element={<Account />} />
      </Route>
      <Route path="*" element={<NoRoute />} />
    </Routes>
  );
};