import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import Journey from './Journey';
import LeaderBoard from './LeaderBoard';
import NavBar from './NavBar';
import SignUp from './SignUp';


const App = () => {

  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/profile', label: 'Profile' },
    { path: '/journey', label: 'Journey' },
    { path: '/leaderboard', label: 'Leaderboard' },
    { path: '/signup', label: 'SignUp'}
  ];

  return (
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
  )
}

export default App;