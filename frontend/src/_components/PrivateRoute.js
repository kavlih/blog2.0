import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/account/login" />;
}

const useAuth = () => {
  const loggedInUser = localStorage.getItem("user");
  return loggedInUser;
}

export { PrivateRoute };