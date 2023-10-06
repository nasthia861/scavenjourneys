import React, {useState, useEffect} from 'react';
import axios from 'axios';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Grid, Card, TextField, CardContent, CardMedia, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';

import Search from './Search'
import JourneyItem from './JourneyItem';
import { JourneyType } from '@this/types/Journey';
import { User } from '@this/types/User';

const StyledCreateJourneyButton = styled(Button)(() => ({
  backgroundColor: '#9a4119', // Change the background color
  color: 'white',
  '&:hover': {
    backgroundColor: '#b5870a', // Change the hover background color
  },
}));

// type IHeaderProps = {
//   journeys: JourneyType[];
//   setJourneys: (journeys: JourneyType[]) => void;
// };

const Home: React.FC = () => {
  const navigate = useNavigate();
  const location: {state: {journey: JourneyType}} = useLocation();

 //set user state to User or null
 const [user, setUser] = useState<User | null>(null);

 const [journeys, setJourneys] = useState<JourneyType[]>([]);
 const [newJourneyName, setNewJourneyName] = useState('');
 const [selectedJourney, setSelectedJourney] = useState(null);
 const [steps, setSteps] = useState([]);

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

  // useEffect(() => {
  //   // get steps for the selected journey
  //   if (selectedJourney) {
  //     axios.get(`/step/journey/${selectedJourney.id}`)
  //       .then((stepAndJourney) => {
  //         //console.log(stepAndJourney)
  //         setSteps(stepAndJourney.data);
  //       })
  //       .catch((error) => {
  //         console.error('Error getting steps for journey:', error);
  //       });
  //   }
  // }, [selectedJourney]);

  //assign Journey to User
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
    <Search setJourneys={setJourneys}/>

     {/* Styled "Create a New Journey" button */}
     <Link to="/create-journey">
        <StyledCreateJourneyButton variant="contained">Create a New Journey</StyledCreateJourneyButton>
      </Link>
    <h1> Pick your Journey</h1>
    <Grid container spacing={2}>
      {/* Display list of journeys */}
      {journeys.map((journey) => (
        <Grid item key={journey.id} xs={12} sm={6} md={4}>
          <Card onClick={() => navigate('/journey',{state:{journey}})}>
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
      ))}
    </Grid>
      {/* Display selected journey details steps
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
      )} */}



  </Container>
);
;
};
// key={journey.id}

export default Home;