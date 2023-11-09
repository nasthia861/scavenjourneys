import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { themeOptions } from './Theme'; //theme import
import axios, { AxiosResponse }from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ThemeProvider from '@mui/material/styles/ThemeProvider'; //theme container
import CssBaseline from '@mui/material/CssBaseline';
import Welcome from './Welcome';
import Home from './Home';
import Profile from './Profile';
import Journey from './Journey';
import LeaderBoard from './LeaderBoard';
import NavBar from './NavBar';
import CreateJourney from './CreateJourney';
import StepForm from './StepForm.tsx';
import Achievements from './Achievement.tsx';
import Logout from './Logout.tsx';
import AR from './AR';

const App = () => {
  // // grabs user data from google oauth
  const [userLat, setUserLat] = useState<number | null>()
  const [userLong, setUserLong] = useState<number | null>()
  const [accuracy, setAccuracy] = useState<number | null>()
  const [userId, setUserId] = useState<number>(0)
  const [loggedOut, setLoggedOut] = useState<boolean | null>(null)

  //menuItems array of links to specified pages (mapped in NavBar.tsx)
  const menuItems = [
      //path: route/url, label: display name in menu
      { path: `/home`, label: 'Home' },
      { path:`/profile/${userId}`, label: 'Profile' },
      { path: `/leaderboard`, label: 'Leaderboard' },
      { path: `/logout/${userId}`, label: 'Logout' },
  ];

  const getLocation = () => {

    navigator.geolocation.watchPosition((position) => {
      setUserLat(position.coords.latitude)
      setUserLong(position.coords.longitude)
      setAccuracy(position.coords.accuracy)
    }, () => console.error('Could not get location'))
  }

  const getUserInfo = () => {
    axios.get('/auth/getuser', { withCredentials: true })
    .then((res: AxiosResponse)=> {
      if (res.data){
        //set user data to state
        setUserId(res.data.id);
      }
    })
    .catch((err)=> {
      console.error('Could not create user state', err);
    })
  }

  useEffect(() => {
    getLocation()
    getUserInfo()
  }, [])
  //CssBaseLine use mitigate conflicts between React 18 and Material UI/styles
    //without cssBaseLine, we'd need to downgrade react/react-dom-router to v17.2 to use themes
    //https://mui.com/system/styles/basics/
    return (
      <ThemeProvider theme={themeOptions}>
        <ToastContainer/>
        <CssBaseline />
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <NavBar menuItems={menuItems} loggedOut={loggedOut}/>
            <Routes>
              <Route path="/" element={<Welcome/>} />
              <Route path="/ar" Component={AR} />
              <Route path="/home" element={<Home userId={userId} userLat={userLat} userLong={userLong}/>} />
              <Route path="/profile/:userId/" element={<Profile userLat={userLat} userLong={userLong} accuracy={accuracy}/>} />
              <Route path="/journey" element={<Journey/>} />
              <Route path="/leaderboard" element={<LeaderBoard/>} />
              <Route path="/create-journey/:UserId" element={<CreateJourney userLat={userLat} userLong={userLong}/>} />
              <Route path="/StepForm/:UserId/:journeyId" element={<StepForm/>} />
              <Route path="/achievements/:UserId" element={<Achievements userId={userId}/>} />
              <Route path="/logout/:UserId" element={<Logout setLoggedOut={setLoggedOut}/>} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    );
  };

  export default App;
