import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';
import './topmenu.css';
import logo from '../../assets/keep.png';
import profile from '../../assets/img3.gif';

function Topmenu({ darkTheme, setDarkTheme,sideMenuOpen, setSideMenuOpen})  {
  const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [ setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
 
  const isSettingsOpen = Boolean(settingsAnchorEl);

  const theme = createTheme({
    palette: {
      mode: darkTheme ? 'dark' : 'light',
    },
  });

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };



  const handleSettingsMenuOpen = (event) => {
    setSettingsAnchorEl(event.currentTarget);
  };

  const handleSettingsMenuClose = () => {
    setSettingsAnchorEl(null);
  };

  
  const renderSettingsMenu = (
    <Menu
      anchorEl={settingsAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id="settings-menu"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isSettingsOpen}
      onClose={handleSettingsMenuClose}
      
    >
      <MenuItem onClick={() => {
        setDarkTheme(prevTheme => !prevTheme);
        handleSettingsMenuClose();
      }}>
        {darkTheme ? 'Disable Dark Mode' : 'Enable Dark Mode'}
      </MenuItem>
    </Menu>
  );
  
  const renderProfileMenu = (  // Profile Menu
  <Menu
  anchorEl={anchorEl}
  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  id="profile-menu"
  keepMounted
  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
  open={isMenuOpen}
  onClose={handleMenuClose}
>
  <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
  <MenuItem onClick={handleMenuClose}>My account</MenuItem>
</Menu>
);
return (
  <ThemeProvider theme={theme}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: darkTheme ? "#000" : "primary.main", color: darkTheme ? "#fff" : "text.primary" }}>
        <Toolbar className="toolbar"> 
        <IconButton color="inherit" edge="start" onClick={() => setSideMenuOpen(!sideMenuOpen)}>
    <MenuIcon />
</IconButton>

          <Typography
          className='keep'
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
                        <img src={logo} alt="logo" style={{ width: '32px', marginRight: '20px' }} />

              
              <span>Keep</span>
            </Typography>
          
          
          <div className="search-bar">
            <SearchIcon  className="search-icon"/>
            <InputBase
              placeholder="Search…"
              className="search-input"
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton color="inherit" onClick={handleSettingsMenuOpen}>
            <SettingsIcon />
          </IconButton>
          <IconButton onClick={handleProfileMenuOpen}>
            <img src={profile} alt="Profile" className="ProfileImage" />
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderProfileMenu}
      {renderSettingsMenu}
      
    </Box>
  </ThemeProvider>
);
}

export default Topmenu;
