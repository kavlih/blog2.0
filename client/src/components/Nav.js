import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// MUI Components
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
// MUI Icons
import SettingsIcon from '@mui/icons-material/Settings';

import { UserContext } from '../context/UserContext';
import { accountHelper } from '../helpers/account.helper';

const useStyles = makeStyles((theme) => ({
  nav: {
    position: 'relative',
    '& a': {
      fontSize: theme.typography.h5.fontSize,
      fontFamily: theme.typography.h5.fontFamily,
      fontWeight: theme.typography.h5.fontWeight,
      color: theme.palette.text.secondary,
      textDecoration: 'none',
      '&.active, &:hover': {
        color: theme.palette.text.primary,
      },
      '&:before': {
        content: "'>'",
        marginRight: '4px',
        opacity: 0
      },
      '&.active:before, &:hover:before': {
        content: "'>'",
        marginRight: '4px',
        opacity: 1
      }
    },
    '& button': {
      position: 'absolute',
      right: 0,
    }
  },
  paper: {
    '& .MuiMenuItem-root': {
      '& a': {
        color: theme.palette.text.primary,
        textDecoration: 'none',
      },
      fontFamily: theme.typography.body2.fontFamily
    }
  }
}))

const NavMenu = () => {
  const classes = useStyles();
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
    handleClose();
    navigate('/account/login');
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
        className={classes.paper}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}><NavLink to='/settings'>Settings</NavLink></MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}

export default function Nav() {
  const classes = useStyles();
  const { user } = useContext(UserContext);

  return (
    <Container>
      <Stack 
        spacing={4} 
        direction='row' 
        justifyContent='center' 
        alignItems='center' 
        mt={6}
        mb={10}
        className={classes.nav}
      >
        <NavLink to='/feed'>Feed</NavLink>
        <NavLink to='/profile'>Profile</NavLink>
        <NavLink to='/users'>Users</NavLink>
        {user && <NavMenu />}
      </Stack>
    </Container>
  );
};
