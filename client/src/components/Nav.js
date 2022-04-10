import React from 'react';

import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

import NavMenu from './NavMenu';

const Nav = (props) => {
  return (
    <Container>
      <Stack direction="row" spacing={2} justifyContent="center">
        <Link href="/feed">Feed</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/users">Users</Link>
      </Stack>
      <NavMenu />
    </Container>
  );
};

export default Nav;
