import React, {useState, useEffect} from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography , Stack} from '@mui/material';
import { Item } from '../styling/journeyStyle';
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
  const [stepProgress, setStepProgress] = useState([]);




  useEffect(() => {
    // get steps for the selected journey
      axios.get(`/step/journey/${journey.id}`)
        .then((stepAndJourney: {data: []}) => {
          setSteps(stepAndJourney.data);
        })
        .catch((error) => {
          console.error('Error getting steps for journey:', error);
        })

  }, []);


  useEffect(() => {
    // Fetching step progress for each step
    steps.forEach((step) => {
      axios.get(`/step/step_progress/${step.id}`)
        .then((progressResponse) => {
          setStepProgress((prevProgress) => ({
            ...prevProgress,
            [step.id]: progressResponse.data,
          }));
        })
        .catch((error) => {
          console.error(`Error getting step progress for step ${step.id}:`, error);
        });
    });
  }, [steps]);


  return (
    <Container>

      <Stack spacing={2}>
        <h1> Journey Begins Here!</h1>
        <Item>

          <Card >
            <CardMedia
              component="img"
              alt={journey.name}
              height="140"
              image={journey.img_url}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                <b>{journey.name}</b>
                <br/>
                <i>by: {journey.user.username}</i>
                <br/>
                {journey.description}
              </Typography>
            </CardContent>
          </Card>
        </Item>
      {/* Display selected journey details steps */}
        <h3>Steps:</h3>
        {
        steps.map((step) => {
          const progress = stepProgress[step.id] || { in_progress: false };          console.log(progress)
          return (
            <Item key={step.id}>
              <Card>

                  <CardContent>
                    <Typography variant="h6" component="div">
                      <b>Details: {step.name}</b>
                      <p>Location: {step.location.latitude}, {step.location.longitude}</p>
                      <br />
                      <i>Progress: {progress.in_progress === true ? 'In Progress' : 'Not Started' }</i>
                      <br />
                    </Typography>
                  </CardContent>

              </Card>
            </Item>
          );
          })
        }
      </Stack>
    </Container>
  );
};

export default Journey;