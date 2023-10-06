import React, {useState, useEffect} from 'react';
import { Button, Container, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import { User } from '../types/User';


const Journey = () => {

  //set user state to User or null
  //const [user, setUser] = useState<User | null>(null);

  const location: {state: {journey: {name: string, user: {username: string}, img_url: string}}} = useLocation();
  const [journeys, setJourneys] = useState([]);

  useEffect(() => {
    console.log(location.state.journey);
    setJourneys([location.state.journey]);
  }, [])



  return(
    <Container>
      { journeys.map((journey) => {
        return (
          <div>
          <div>{journey.name}</div>
          <div>{journey.user.username}</div>
          <img src={journey.img_url}></img>
          </div>
      )})}
    </Container>
  );
}

export default Journey;