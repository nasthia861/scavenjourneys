import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import Journey from './Journey';
import LeaderBoard from './LeaderBoard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/journey' element={<Journey />} />
        <Route path='/leaderBoard' element={<LeaderBoard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App