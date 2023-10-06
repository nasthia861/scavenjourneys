import React, {useState, useEffect} from 'react';
import { Button, Container, Grid, Card, TextField, CardContent, CardMedia, Typography } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { JourneyType } from "@this/types/Journey";
import { StepType } from "@this/types/Step"

import { User } from '../types/User';


const Journey = () => {

  //set user state to User or null
  //const [user, setUser] = useState<User | null>(null);
  const location: {state: {journey: JourneyType}} = useLocation();
  const [journey, setJourneys] = useState(location.state.journey);
  const [steps, setSteps] = useState<StepType[]>([]);



  useEffect(() => {
    // get steps for the selected journey
      axios.get(`/step/journey/${journey.id}`)
        .then((stepAndJourney: {data: []}) => {
          setSteps(stepAndJourney.data);
        })
        .catch((error) => {
          console.error('Error getting steps for journey:', error);
        });
  },[]);

  return (
    <Container>

      <h1> Journey Begins Here!</h1>
      <Grid container spacing={2}>
          <Grid  xs={12} sm={6} md={4}>
            <Card >
              <CardMedia
                component="img"
                alt={journey.name}
                height="140"
                image={journey.img_url}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {journey.name}
                  <br/>
                  {journey.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
      </Grid>

      {/* Display selected journey details steps */}
      {
        <div>

          <h3>Steps:</h3>
          {steps.map((step) => (
            <div key={step.id}>
              <p>Details: {step.name}</p>
              <p>Location: {step.location.latitude}, {step.location.longitude}</p>
            </div>
          ))}
        </div>
      }
    </Container>
  );
};

export default Journey;