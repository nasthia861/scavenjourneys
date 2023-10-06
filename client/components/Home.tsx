import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import Search from './Search'
import JourneyItem from './JourneyItem';
import Journey from './Journey';

const StyledCreateJourneyButton = styled(Button)(() => ({
  backgroundColor: '#9a4119', // Change the background color
  color: 'white',
  '&:hover': {
    backgroundColor: '#b5870a', // Change the hover background color
  },
}));

const Home: React.FC = () => {
  const [journeys, setJourneys] = useState<typeof Journey[]>([]);

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
    <div>
      {/* Styled "Create a New Journey" button */}
      <Link to="/create-journey">
        <StyledCreateJourneyButton variant="contained">Create a New Journey</StyledCreateJourneyButton>
      </Link>

      <Search />

      {/* Render the list of recently made journeys */}
      <div className="journey-list">
        {journeys.map((journey) => (
          <JourneyItem journey={journey} />
        ))}
      </div>
    </div>
  );
};
// key={journey.id}

export default Home;