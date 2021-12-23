import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// import { accountService } from '../_services';

const PrivateRoute = () => {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/account/login" />;
}

const useAuth = () => {
  return true;
}

export { PrivateRoute };