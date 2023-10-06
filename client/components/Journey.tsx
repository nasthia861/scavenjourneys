import React, {useState, useEffect} from 'react';
import { Button, Container, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { JourneyType } from "@this/types/Journey";

import { User } from '../types/User';


const Journey = () => {

  //set user state to User or null
  //const [user, setUser] = useState<User | null>(null);

  const location: {state: {journey: JourneyType}} = useLocation();
  const [journey, setJourneys] = useState(location.state.journey);

  return(
    <Container>
          <div>title: {journey.name}</div>
          <div>created by: {journey.user.username}</div>
          <img src={journey.img_url} alt='image of chosen journey'></img>
    </Container>
  );
}

export default Journey;