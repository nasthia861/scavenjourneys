import React, {useState, useEffect} from 'react';
import { Button, Container, Grid, Card, TextField, CardContent, CardMedia, Typography } from '@mui/material';
import axios from 'axios';
//import { Step } from '../types/Step';

import { User } from '../types/User';


const Journey = () => {

  //set user state to User or null
  const [user, setUser] = useState<User | null>(null);

  const [journeys, setJourneys] = useState([]);
  const [journeyId, setJourneyId] = useState('')
  const [newJourneyName, setNewJourneyName] = useState('');
  const [selectedJourney, setSelectedJourney] = useState(null);
  const [steps, setSteps] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');



  useEffect(() => {
    // Fetch existing
    axios.get('/journey')
      .then((journeys) => {
        setJourneys(journeys.data);
        //console.log(journeys.data)
      })
      .catch((error) => {
        console.error('Error fetching journeys:', error);
      });


  }, []);

  useEffect(() => {
    // get steps for the selected journey
    if (selectedJourney) {
      axios.get(`/step/journey/${selectedJourney.id}`)
        .then((stepAndJourney) => {
          //console.log(stepAndJourney)
          setSteps(stepAndJourney.data);
        })
        .catch((error) => {
          console.error('Error getting steps for journey:', error);
        });
    }
  }, [selectedJourney]);

  // //Not in complete working state Logan, placeholder
  // const createJourney = () => {
  //   axios.post('/journey', { name: newJourneyName })
  //     .then((response) => {
  //       console.log('Journey created successfully:', response.data);

  //     })
  //     .catch((error) => {
  //       console.error('Error creating journey:', error);
  //     });
  // };

  // const assignJourney = () => {
  // if (user && selectedJourney) {
  //   axios.post(`/journey/assign/${selectedJourney.id}`, { userId: user.id })
  //     .then((response) => {
  //       console.log('Journey assigned to user:', response.data);
  //       setSuccessMessage('Journey assigned successfully!');
  //     })
  //     .catch((error) => {
  //       console.error('Error assigning journey to user:', error);
  //       setSuccessMessage('');
  //     });
  // }
  // };

  return (
    <Container>
      <h1> Journey Begins Here!</h1>
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
                  onClick={() => setSelectedJourney(journey)}
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
      {selectedJourney && (
        <div>
          <h2>Selected Journey: {selectedJourney.name}</h2>
          <p>Description: {selectedJourney.description}</p>

          <h3>Steps:</h3>
          {steps.map((step) => (
            <div key={step.id}>
              <p>Details: {step.name}</p>
              <p>Location: {step.location.latitude}, {step.location.longitude}</p>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default Journey;