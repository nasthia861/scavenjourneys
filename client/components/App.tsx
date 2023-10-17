import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { themeOptions } from './Theme'; //theme import

import ThemeProvider from '@mui/material/styles/ThemeProvider'; //theme container
import CssBaseline from '@mui/material/CssBaseline';
import Welcome from './Welcome';
import Home from './Home';
// import Profile from './Profile';
import Journey from './Journey';
import LeaderBoard from './LeaderBoard';
import NavBar from './NavBar';
import CreateJourney from './CreateJourney';
import StepForm from './StepForm.tsx';
import Achievements from './ Achievement.tsx';
import Context from './Context.tsx'

// lazy load components
// const Welcome = lazy(() =>
//   import('./Welcome.tsx').then((module) => ({ default: module.Welcome }))
// );
// const Home = lazy(() =>
//   import('./Home.tsx').then((module) => ({ default: module.Home }))
// );
const Profile = lazy(() =>
  import('./Profile.tsx').then((module) => ({ default: module.Profile }))
);
// const Journey = lazy(() =>
//   import('./Journey.tsx').then((module) => ({ default: module.Journey }))
// );
// const LeaderBoard = lazy(() =>
//   import('./LeaderBoard.tsx').then((module) => ({ default: module.LeaderBoard }))
// );
// const NavBar = lazy(() =>
//   import('./NavBar.tsx').then((module) => ({ default: module.NavBar }))
// );
// const CreateJourney = lazy(() =>
//   import('./CreateJourney.tsx').then((module) => ({ default: module.CreateJourney }))
// );


const App = () => {
  const [userLat, setUserLat] = useState<number | null>()
  const [userLong, setUserLong] = useState<number | null>()

  //menuItems array of links to specified pages (mapped in NavBar.tsx)
  const menuItems = [
      //path: route/url, label: display name in menu
    { path: '/', label: 'Welcome' },
    { path: '/home', label: 'Home' },
    { path:`/profile`, label: 'Profile' },
    { path: '/journey', label: 'Journey' },
    { path: '/leaderboard', label: 'Leaderboard' },
  ];

  const getLocation = () => {
    navigator.geolocation.watchPosition((position) => {
      setUserLat(position.coords.latitude)
      setUserLong(position.coords.longitude)
    }, () => console.error('Could not get location'))
  }

  useEffect(() => {
    getLocation()
  }, [])
  //CssBaseLine use mitigate conflicts between React 18 and Material UI/styles
    //without cssBaseLine, we'd need to downgrade react/react-dom-router to v17.2 to use themes
    //https://mui.com/system/styles/basics/
    return (
      <Context>

      <ThemeProvider theme={themeOptions}>
        <CssBaseline />
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <NavBar menuItems={menuItems} />
            <Routes>
              <Route path="/" element={<Welcome/>} />
              <Route path="/home" element={<Home userLat={userLat} userLong={userLong}/>} />
              <Route path="/profile" element={<Profile userLat={userLat} userLong={userLong}/>} />
              <Route path="/journey" element={<Journey/>} />
              <Route path="/leaderboard" element={<LeaderBoard/>} />
              <Route path="/create-journey" element={<CreateJourney userLat={userLat} userLong={userLong}/>} />
              <Route path="/StepForm/:journeyId" element={<StepForm/>} />
              <Route path="/achievements" element={<Achievements/>} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
      </Context>
    );
  };