import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import Search from './Search'
import JourneyItem from './JourneyItem';
import { Journey } from '@this/types/Journey';

const StyledCreateJourneyButton = styled(Button)(() => ({
  backgroundColor: '#9a4119', // Change the background color
  color: 'white',
  '&:hover': {
    backgroundColor: '#b5870a', // Change the hover background color
  },
}));

const Home: React.FC = () => {
  const [journeys, setJourneys] = useState<Journey[]>([]);

  useEffect(() => {
    // Fetch the most recently made 20 journeys
    axios.get('/journey/recent')
      .then((response) => {
        setJourneys(response.data);
      })
      .catch((error) => {
        console.error('Error fetching recent journeys:', error);
      });
  }, []);

return (
  <Container>
    <Search />
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

    {/* Display selected journey details w/steps */}
    {selectedJourney && (
      <div>
      {/* Styled "Create a New Journey" button */}
      <Link to="/create-journey">
        <StyledCreateJourneyButton variant="contained">Create a New Journey</StyledCreateJourneyButton>
      </Link>

         <h2>Selected Journey: {selectedJourney.name}</h2>
        <p>Description: {selectedJourney.description}</p>

        <h3>Steps:</h3>
        {steps.map((step) => (
          <div key={step.id}>
            <p>Details: {step.name}</p>
            <p>Location: {step.location.latitude}, {step.location.longitude}</p>
          </div>
        ))}

      {/* Render the list of recently made journeys */}
      <div className="journey-list">
        {journeys.map((journey) => (
          <JourneyItem key={journey.id} journey={journey} />
        ))}
      </div>
      </div>
    )}
  </Container>
);
;
};
// key={journey.id}

export default Home;