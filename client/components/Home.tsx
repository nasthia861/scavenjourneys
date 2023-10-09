import React, {useState, useEffect} from 'react';
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { StyledCreateJourneyButton } from '../styling/homeStyle';

import Search from './Search'
import { JourneyType } from '@this/types/Journey';
import { User } from '@this/types/User';


const Home: React.FC = () => {

  const navigate = useNavigate();

 //set user state to User or null
 const [user, setUser] = useState<User | null>(null);
 const [userLat, setUserLat] = useState<number | null>(null)
 const [userLong, setUserLong] = useState<number | null>(null)
 const [alignment, setAlignment] = useState(3);
  const [journeys, setJourneys] = useState<JourneyType[]>([]);

 const getLocation = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    setUserLat(position.coords.latitude)
    setUserLong(position.coords.longitude)
  }, () => console.log('Could not get location'))
 }

 const getJourney = () => {
    // Fetch the journeys closest to you
    axios.get(`/journey/recent/${userLat}/${userLong}/${alignment}`)
      .then((response) => {
        response.data.sort((journeyA: {latitude: number}, journeyB: {latitude: number}) => {
          return (userLat - journeyA.latitude) - (userLat - journeyB.latitude)
      })
      console.log(response.data);
      setJourneys(response.data);
    })
    .catch((error) => {
      console.error('Error fetching recent journeys:', error);
    });

 }

 const handleToggleChange = (
  event: React.MouseEvent<HTMLElement>,
  newAlignment: number,
) => {
  setAlignment(newAlignment);
};

  useEffect(() => {
   // grab user location
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLat(position.coords.latitude)
      setUserLong(position.coords.longitude)
    }, () => console.log('Could not get location'))

   // Fetch the journeys closest to you
    axios.get(`/journey/recent/${userLat}/${userLong}`)
      .then((response) => {
        response.data.sort((journeyA: {latitude: number}, journeyB: {latitude: number}) => {
          return (userLat - journeyA.latitude) - (userLat - journeyB.latitude)
        })
        setJourneys(response.data);
      })
      .catch((error) => {
        console.error('Error fetching recent journeys:', error);
      });
    getLocation()
    if(userLat && userLong) {
      getJourney()
    }

  }, [userLat, userLong, alignment]);

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
    <br/>
    <Search setJourneys={setJourneys} userLat={userLat} userLong={userLong} alignment={alignment}/>
    <br/>
    <h2>set distance:</h2>
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleToggleChange}
      aria-label="Platform"
      >
      <ToggleButton value={1}>5 miles</ToggleButton>
      <ToggleButton value={2}>10 miles</ToggleButton>
      <ToggleButton value={3}>15 miles</ToggleButton>
      <ToggleButton value={4}>20 miles</ToggleButton>
    </ToggleButtonGroup>
    <br />
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
  </Container>
);
;
};
// key={journey.id}

export default Home;