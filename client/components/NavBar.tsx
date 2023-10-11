import React, {useState, useContext} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { myContext } from './Context';
// import InputBase from '@mui/material/InputBase';
// import { styled, alpha} from '@mui/material/styles';
import {  AppBar, Box, Toolbar, Typography, Menu, MenuItem, IconButton, Avatar } from '@mui/material';

//we can use forms to anchor signed-in users to NavBar features (Profile Pic, username, etc..)
import { FormControlLabel, FormGroup } from '@mui/material';

//withheld from external types folder to exemplify interface/ assignments being passed to functional component
//we have to assign types/interface to ensure proper typescript syntax
//interface to allocate types to MenuItems (path and label: string)
interface MenuItem {
  path: string;
  label: string;
}
//interface to set interface for NavBarProps: array of pages to link to (Profile:{path: '/', label: 'profile'} etc.)
interface NavBarProps {
  //menu items hold the value of MenuItem interface within an array to map over
  //path and label props being passed to MenuItem array elements
  menuItems: MenuItem[];
}
// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(3),
//     width: 'auto',
//   },
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(0)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }));
//NavBar accepts NavBar props with with menu items array, each value assigned a path and label
export const NavBar: React.FC<NavBarProps> = ( {menuItems}) => {

  //Use useContext to set the user state
  const userObj = useContext(myContext);

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

  //handler to close menu after selecting link to other page
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
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

/**
 *
 *  <ul>
      <Link to="/journey" >Journey</Link>
      <Link to="/profile" >Profile</Link>
      <Link to="/leaderboard" >Leaderboard</Link>
      </ul>
 */