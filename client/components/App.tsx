import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import Journey from './Journey';
import LeaderBoard from './LeaderBoard';
import NavBar from './NavBar';
import SignUp from './SignUp'; 
import { themeOptions } from './Theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
      main: '#9a4119',
    },
    secondary: {
      main: '#b5870a',
    },
    background: {
      default: '#bbada7',
    },
  },
  // Add more customizations if needed
});
const App = () => {

  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/profile', label: 'Profile' },
    { path: '/journey', label: 'Journey' },
    { path: '/leaderboard', label: 'Leaderboard' },
    { path: '/signup', label: 'SignUp'}
  ];

  return (
    <ThemeProvider theme={theme}> 
    <CssBaseline />

    <BrowserRouter>
    
     <NavBar menuItems={menuItems} />
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;