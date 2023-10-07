import React, {useState, useEffect} from 'react';
import { Button, Container, Grid, Card, TextField, CardContent, CardMedia, Typography } from '@mui/material';
import axios from 'axios';
//import { Step } from '../types/Step';
import { Journey } from '@this/types/Journey';
import { User } from '@this/types/User';

const userJourney = () => {
  const [user, setUser] = useState();
  const [journey, setJourney] = useState(null);

  const [journeys, setJourneys] = useState([]);
  const [steps, setSteps] = useState([]);



  useEffect(() => {
    const getUserData = async () => {
      try {
        const userResponse = await axios.get(`/user`);
        setUser(userResponse.data);

        const journeyResponse = await axios.get(`/journey/user/5`);
        setJourneys(journeyResponse.data);

        const stepAndJourneyResponse = await axios.get(`/step/journey/2`);
        setSteps(stepAndJourneyResponse.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getUserData();
  }, []);

  // useEffect(() => {
  //   axios.get(`/journey/user/5`)
  //     .then((response) => {
  //       setJourneys(response.data);
  //      // console.log(response.data)

  //     })
  //     .catch((error) => {
  //       console.error('Error fetching user journeys:', error);
  //     });

  // }, []);


  // useEffect(() => {

  //   axios.get(`/step/journey/2`)
  //     .then((stepAndJourney) => {
  //       setSteps(stepAndJourney.data);
  //       //console.log(stepAndJourney.data)
  //     })
  //     .catch((error) => {
  //       console.error('Error getting steps for journey:', error);
  //     });

  // }, []);
  console.log(steps)
  console.log(journeys)

  return (
    <div>
    <h1> Journey Begins Here! *change me*</h1>
    <Grid container spacing={2}>
      {/* Display list of journeys */}
      {journeys.map((journey) => (
        <Grid item key={journey.id} xs={12} sm={6} md={4}>
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
              <Button
                variant="contained"
                color="primary"
                //onClick={() => setSelectedJourney(journey)}
                style={{ marginTop: 10 }}
              >
                More Details
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
      {/* Display selected journey details steps */}

        <div>
          <h3>Steps:</h3>
          {steps.map((step) => (
            <div key={step.id}>
              <p>Details: {step.name}</p>
              <p>Location: {step.location.latitude}, {step.location.longitude}</p>
            </div>
          ))}
        </div>
  </div>
  );
};

export default userJourney;