import React, {useState, useEffect} from 'react';
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { StyledCreateJourneyButton } from '../styling/homeStyle';
import Search from './Search'
import { JourneyType } from '@this/types/Journey';
import { UserType } from '@this/types/User';

type IHeaderProps = {
  userLat: number;
  userLong: number;
};

const Home: React.FC<IHeaderProps> = ({userLat, userLong}) => {

  const navigate = useNavigate();

 //set user state to User or null
 const [user, setUser] = useState<UserType | null>(null);
 const [alignment, setAlignment] = useState(3);
  const [journeys, setJourneys] = useState<JourneyType[]>([]);


 const getJourney = async () => {
    // Fetch the journeys closest to you
    const response = await axios.get(`/journey/recent/${userLat}/${userLong}/${alignment}`)
      response.data.sort((journeyA: {latitude: number}, journeyB: {latitude: number}) => {
        return (userLat - journeyA.latitude) - (userLat - journeyB.latitude)
      })
      setJourneys(response.data)
 }

 const handleToggleChange = (
  event: React.MouseEvent<HTMLElement>,
  newAlignment: number,
) => {
  setAlignment(newAlignment);
};

  useEffect(() => {
    if(userLat && userLong) {
      getJourney()
    }

  }, [userLat, userLong, alignment]);


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

export default Home;
