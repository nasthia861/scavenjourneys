import React, {useState, useEffect} from 'react';
import { Button, Container, Grid, TextField } from '@mui/material';
import axios from 'axios';

import { User } from '@this/types/User';


const Journey = () => {

  //set user state to User or null
  const [user, setUser] = useState<User | null>(null);

  const [journeys, setJourneys] = useState([]);
  const [newJourneyName, setNewJourneyName] = useState('');

  useEffect(() => {
    // Fetch existing
    axios.get('/journey')
      .then((response) => {
        setJourneys(response.data);
      })
      .catch((error) => {
        console.error('Error fetching journeys:', error);
      });
  }, []);

  //Not in complete working state Logan, placeholder
  const createJourney = () => {
    // send a POST request to create a new journey
    axios.post('/journey', { name: newJourneyName })
      .then((response) => {
        console.log('Journey created successfully:', response.data);
        // update the state with the new journey if needed
      })
      .catch((error) => {
        console.error('Error creating journey:', error);
      });
  };

  return(
    <Container>
      <h1>Select or Create a Journey</h1>
      <Grid container spacing={2}>
        {/* Display existing journeys */}
        {journeys.map((journey) => (
          <Grid item key={journey.id}>
            {journey.name}
          </Grid>
        ))}
      </Grid>
      {/* Input for creating a new journey */}
      <TextField
        label="New Journey Name"
        variant="outlined"
        fullWidth
        value={newJourneyName}
        onChange={(e) => setNewJourneyName(e.target.value)}
        style={{ marginTop: 20 }}
      />
      {/* Button to create a new journey */}
      <Button variant="contained" color="primary" onClick={createJourney} style={{ marginTop: 10 }}>
        Create Journey
      </Button>
    </Container>
  );
}

export default Journey;