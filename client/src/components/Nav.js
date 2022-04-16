import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

// MUI Components
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
// MUI Icons
import SettingsIcon from '@mui/icons-material/Settings';

import { accountHelper } from '../helpers/account.helper';

const NavMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();  
  const handleLogout = () => {
    accountHelper.logout()
    navigate('/account/login')
  };

  return (
    <>
      <IconButton
        id='basic-button'
        aria-label='more'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
      >
        <SettingsIcon />
      </IconButton>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem component={Link} href='/settings'>Settings</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}

export default function Nav() {
  const style = ({ isActive }) => ({
    fontWeight: isActive ? 'bold' : 'normal',
  });

  return (
    <Container>
      <Stack component='nav' direction='row' spacing={2} justifyContent='center'>
        <NavLink to='/feed' style={style}>Feed</NavLink>
        <NavLink to='/profile' style={style}>Profile</NavLink>
        <NavLink to='/users' style={style}>Users</NavLink>
      </Stack>
      <NavMenu />
    </Container>
  );
};
