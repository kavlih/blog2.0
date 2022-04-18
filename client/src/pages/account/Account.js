import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
// MUI Components
import Container from '@mui/material/Container';

import Login from './Login';
import Register from './Register';

const Account = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');

    if (loggedInUser) {
      navigate('/feed');
    }
  });

  return (
    <Container maxWidth='xs'>
      <Routes>
        <Route path={`/login`} element={<Login />} />
        <Route path={`/register`} element={<Register />} />
      </Routes>
    </Container>
  );
}

export default Account;