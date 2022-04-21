import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import Nav from './Nav';

const Layout = () => {
  return (
  <>
    <Nav />
    <Container component='main' maxWidth='md' sx={{ mt:8, mb:20 }}>
      <Outlet />
    </Container>
  </>
  );
}

export default Layout;