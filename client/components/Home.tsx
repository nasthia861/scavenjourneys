import React, {useState, useEffect} from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
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
import useTheme from "@mui/material/styles/useTheme";

type IHeaderProps = {
  userLat: number;
  userLong: number;
  userId: number;
};

const Home: React.FC<IHeaderProps> = ({userLat, userLong, userId}) => {

const navigate = useNavigate();

//set user state to User or null
// const [userId, setUserId] = useState<number>(+window.location.pathname.split('/').pop())
const [alignment, setAlignment] = useState(3);
const [journeys, setJourneys] = useState<JourneyType[]>([]);
const theme = useTheme();



const getJourneys = async () => {
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
      getJourneys()
    }

  }, [userLat, userLong, alignment]);


return (
  <Grid
    container
    spacing={2.5}
    direction="column"
    alignItems="center"
    justifyContent="center"
    padding='30px'
    paddingRight='10px'
  >
    <br/>
    <Search setJourneys={setJourneys} getJourneys={getJourneys} userLat={userLat} userLong={userLong} alignment={alignment}/>
    <ToggleButtonGroup
      sx={{ width: { xs: 300, sm: 450 } }}
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
    <StyledCreateJourneyButton
      onClick={() => navigate(`/create-journey/${userId}`,{state:{userId}})}
      variant="outlined"
      sx={{borderRadius: '20px'}}
    >
          Create a New Journey
    </StyledCreateJourneyButton>

    <h3> Pick your Journey</h3>
    <Grid container spacing={2}>
      {/* Display list of journeys */}
      {journeys.map((journey) => (
        <Grid item key={journey.id} xs={12} sm={6} md={4}>
          <Card sx={{
            maxHeight: 345,
            background: '#f8e5c8',
            margin: `${theme.spacing(1)} 0`,
            padding: '10px',
          }}
          elevation={3}
            onClick={() => {
            navigate('/journey',{state:{journey, userId}})
          }}>
            <CardMedia
              sx={{
                boxShadow: '2px 2px 5px 0px #a0a0a0, -2px -2px 5px 0px #ffffff',
                borderRadius: theme.shape.borderRadius,
                alignItems: "center",
                objectFit: 'contain'
              }}
              component="img"
              alt={journey.name}
              height="120"
              width='auto'
              image={journey.img_url}
            />
            <CardContent
            sx={{
              backgroundColor: "#FDF3E0",
              border: `1px solid ${theme.palette.primary.main}`,
              borderRadius: theme.shape.borderRadius,
              margin: `${theme.spacing(1)} 0`,
              padding: theme.spacing(2),
              justifyContent: "space-between",
              alignItems: "center",
              textAlign: 'center',
              alignContent: 'center'
            }}>
              <Typography
                variant="h5"
                alignItems="center"
                textAlign='center'
                alignContent='center'
              >
                {journey.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Grid>
);
;
};

export default Home;
