import React, { useState, useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// MUI Components
import { styled } from "@mui/material";
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
// MUI Icons
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';

import { UserContext } from '../context/UserContext';

const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: theme.typography.h5.fontSize,
  fontFamily: theme.typography.h5.fontFamily,
  fontWeight: theme.typography.h5.fontWeight,
  padding: '5px 20px',
 
  '& a.active, &:hover a': {
    color: theme.palette.text.primary,
  }

}));

const Nav = () => {
  const { user } = useContext(UserContext);
  const [ auth, setAuth ] = useState(user);
  const [ anchorElSettings, setAnchorElSettings ] = useState(null);
  const [ anchorElNav, setAnchorElNav ] = useState(null);

  useEffect(() => {
    setAuth(user);
  }, [user])

  const handleSettingsOpen = (event) => {
    setAnchorElSettings(event.currentTarget);
  };
  
  const handleSettingsClose = () => {
  setAnchorElSettings(null);
  };

  const handleNavMenuOpen = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleNavMenuClose = () => {
    setAnchorElNav(null);
  };

  const navigate = useNavigate();  
  const handleLogout = () => {
    localStorage.clear();
    handleSettingsClose();
    navigate('/account/login');
  };

  const renderSettings = (
    <Menu
      id="settings-appbar"
      anchorElSettings={anchorElSettings}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorElSettings)}
      onClose={handleSettingsClose}
    >
      <MenuItem onClick={handleSettingsClose}>
        <NavLink to='/settings'>Settings</NavLink>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="static" color='transparent' sx={{ mt:1 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters component='nav'>
            {/* Logo */}
            <Typography sx={{ mr: 2, display: { xs: 'none', sm: 'block' }, position:'absolute', left: 0 }}
              variant="h4"
              noWrap
              component="div"
            >
              whoosh
            </Typography>
            {/* Mobile Navigation */}
            <Box sx={{ display: { xs: 'block', sm: 'none' }, position:'absolute', left: 0 }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleNavMenuOpen}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorElSettings={anchorElNav}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={Boolean(anchorElNav)}
                onClose={handleNavMenuClose}
                sx={{ display: { xs: 'block', sm: 'none' } }}
              >
                <MenuItem onClick={handleNavMenuClose}>
                  <Typography textAlign="center">Feed</Typography>
                </MenuItem>
                <MenuItem onClick={handleNavMenuClose}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleNavMenuClose}>
                  <Typography textAlign="center">Users</Typography>
                </MenuItem>
              </Menu>
            </Box>
            {/* Navigation */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, justifyContent:'center', alignItems:'center' }}>
              <StyledButton onClick={handleNavMenuClose} disableArrow>
                <NavLink to='/feed'>Feed</NavLink>
              </StyledButton>
              <StyledButton onClick={handleNavMenuClose} disableArrow>
                <NavLink to='/profile'>Profile</NavLink>
              </StyledButton>
              <StyledButton onClick={handleNavMenuClose} disableArrow>
                <NavLink to='/users'>Users</NavLink>
              </StyledButton>
            </Box>
            {/* Molbile Logo */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
              <Typography sx={{ flexGrow: 1, display:'flex', justifyContent:'center', alignItems:'center' }}
                variant="h4"
                noWrap
                component="div"
              >
                whoosh
              </Typography>
            </Box>
            {/* Settings */}
            {auth && (
              <Box sx={{ position:'absolute', right: 0 }}>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  onClick={handleSettingsOpen}
                  color="inherit"
                >
                  <SettingsIcon />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {renderSettings}
    </>
  );
};
export default Nav;
