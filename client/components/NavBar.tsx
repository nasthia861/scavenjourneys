import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import { FormControlLabel } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';

//iterface to allocate types to MenuItems (path and label)
interface MenuItem {
  path: string;
  label: string;
}
//interface to set type menuItem: array of pages to link to (Profile, Leaderboard, etc.)
interface NavBarProps {
  //menu items hold the value of MenuItem interface within an array to map over 
  menuItems: MenuItem[];
}


const NavBar = ( {menuItems}: NavBarProps ) => {

  //authenticate user
  const [auth, setAuth] = React.useState<boolean | null>(true);
  //set anchor to display or close menu in navBar 
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  //handler for setting auth 
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  //handler to menu in navBar
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  //handler to close menu
  const handleClose = () => {
    setAnchorEl(null);
  };
  

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* <FormGroup>
        <FormControlLabel
          control={
            <Routes
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup> */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
           onClick={handleMenu} 
           style={{ cursor: 'pointer' }} 
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon
           />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome To ScavenJourney !
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
            {menuItems.map((item) => (
                  <MenuItem key={item.path} component={Link} to={item.path} onClick={handleClose}>
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
    
  );
}

export default NavBar;
/**
 * 
 *  <ul>
      <Link to="/journey" >Journey</Link>
      <Link to="/profile" >Profile</Link>
      <Link to="/leaderboard" >Leaderboard</Link>
      </ul>
 */