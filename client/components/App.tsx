import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './Welcome';
import Home from './Home';
import Profile from './Profile';
import Journey from './Journey';
import LeaderBoard from './LeaderBoard';
import NavBar from './NavBar';
import SignUp from './SignUp';
import CreateJourney from './CreateJourney';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles'; //theme container
import { themeOptions } from './Theme'; //theme import
// import { myContext } from './Context';
// import { ReactSession } from 'react-client-session';



const App = () => {

  // const userObj = useContext(myContext);
  // console.log(userObj);
  //menuItems array of links to specified pages (mapped in NavBar.tsx)
  const menuItems = [
      //path: route/url, label: display name in menu
    { path: '/', label: 'Welcome' },
    { path: '/home', label: 'Home' },
    { path:`/profile`, label: 'Profile' },
    { path: '/journey', label: 'Journey' },
    { path: '/leaderboard', label: 'Leaderboard' },
    { path: '/signup', label: 'SignUp'}
  ];
  //CssBaseLine use mitigate conflicts between React 18 and Material UI/styles
    //without cssBaseLine, we'd need to downgrade react/react-dom-router to v17.2 to use themes
    //https://mui.com/system/styles/basics/
  return (
    <ThemeProvider theme={themeOptions}>
    <CssBaseline />
    <BrowserRouter>
     <NavBar menuItems={menuItems} />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create-journey" element={<CreateJourney />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;