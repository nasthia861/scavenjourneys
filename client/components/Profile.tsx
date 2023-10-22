import React, { useEffect, useState, SyntheticEvent } from "react";
import StepProgress from "./StepProgress";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Grid from '@mui/material/Grid';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from "@mui/material/ListItemText";
import useTheme from "@mui/material/styles/useTheme";
import ListItemButton from "@mui/material/ListItemButton";
import deepOrange from "@mui/material/colors/deepOrange";
import axios from "axios";
import { JourneyProgressType } from '@this/types/JourneyProgress';
import { StepProgressType } from "@this/types/StepProgress"
import SpeechToText from "./SpeechToText";
import { useNavigate, useLocation } from "react-router-dom";
import { UserType } from "@this/types/User";

type IHeaderProps = {
  userLat: number;
  userLong: number;
};

  const Profile: React.FC<IHeaderProps> = ({userLat, userLong}) => {

  const location: {state: {journeyProgressId: number | null}} = useLocation();

  const theme = useTheme();
  const [user, setUser] = useState<UserType>()
  const [userId, setUserId] = useState<number>(+window.location.pathname.split('/')[2])
  const [journeys, setJourneys] = useState<JourneyProgressType[]>([]);
  const [steps, setSteps] = useState<StepProgressType[]>([]);
  const [username, setUsername] = useState<string>('');
  const [updatedUsername, setUpdatedUsername] = useState<string>('');
  const [updateButton, setUpdateButton] = useState(false);
  const [userImg, setUserImg] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const navigate = useNavigate();




  /** User Functionality for User Profile*/
  const updateUsername = async (username: string) => {
    setUsername(username)
    await axios.patch(`/user/${userId}`, {username: username} )
    .then(() => {
      setUpdateButton(false)
    })
    .catch((err) => {
      console.error('Could not Axios patch', err)
    });
  };
  const getUserNameImg = () => {
    axios.get(`/user/${userId}`)
    .then((userData) => {
      setUser(userData.data);
      setUsername(userData.data.username);
      setUserImg(userData.data.img_url);
    })
    .catch((err) => {
      console.error('Could not retrieve user information', err);
    })
  };

  /**Speech To Text Input Handling */
  const { onceSpoken } = SpeechToText;
  useEffect(() => {
    setUpdatedUsername(onceSpoken);
  }, [onceSpoken])

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setUpdatedUsername('');
  }

  const handleUsernameChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setUpdatedUsername(target.value);

  }

  // GET user's journey progress
  const getUserData = async () => {
    try {
      const userJourneys = await axios.get(`/journey/progress/${userId}`);
      setJourneys(userJourneys.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  useEffect(() => {
    getUserNameImg();
    getUserData();

    if(location.state !== null) {
      handleJourneyClick(location.state.journeyProgressId)
    }
  }, []);


  /** Journey and Step Functionality */
  const handleJourneyClick = async (journeyId: number ) => {
    try {
      setSelectedIndex(journeyId)
      // GET steps for the selected journey
      const stepAndJourney = await axios.get(`/step/progress/${journeyId}`);
      setSteps(stepAndJourney.data);


    } catch (error) {
      console.error('Error fetching journey details:', error);
    }
  };


  return (
    <Container sx={{padding: '10px'}} >
      <Stack spacing={1}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            sx={{ bgcolor: deepOrange[900], width: 56, height: 56 }}
            src={userImg}/>
        </ListItemAvatar>
        <ListItemText
          sx={{ my: 2, mx: 2 }}
          primary={username}
          primaryTypographyProps={{
            fontSize: 25,
            fontWeight: 'large',
            letterSpacing: 0,
          }}
        />
      </ListItem>

      {/* <Typography variant="h5" gutterBottom>
        {username}
      </Typography>

      For other variants, adjust the size with `width` and `height`
      <Avatar
      sx={{ bgcolor: deepOrange[900],
      width: 56, height: 56 }}
      src={userImg}
      ></Avatar> */}
     <Stack direction="row" spacing={1}  >
        {!updateButton && (
          <Button
            variant="contained"
            type='button'
            sx={{borderRadius: '20px'}}
            onClick={() => {
              setUpdateButton(true);
            }}
          >Update Username</Button>
        )}
      {updateButton && (
        <form onSubmit= { handleSubmit } >
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            onChange={handleUsernameChange}
            value={ updatedUsername }
            InputProps={{ endAdornment: <SpeechToText onceSpoken={ setUpdatedUsername } />, sx: {borderRadius: '20px'}}}
          />
            <Button
               variant="contained"
              type='submit'
              sx={{borderRadius: '20px'}}
              onClick={() => {
                updateUsername(updatedUsername);
              }}
            >
              SET
            </Button>
        </form>
        )}
        </Stack>
        {/* achievements page*/}
        <Button
          onClick={() => navigate('/achievements',{state:{user}})}
          sx={{borderRadius: '20px'}}
          variant='outlined'>
          Achievements
        </Button>
       {/* List of Journeys */}
      <Typography variant="h5">Journeys</Typography>
      <List sx={{ border: `1px solid ${theme.palette.primary.main}`, borderRadius: theme.shape.borderRadius, padding: theme.spacing(2), overflow: 'auto', maxHeight: 200}}>
          {journeys.map((journey) => (
            <React.Fragment key={journey.id}>
              <ListItemButton
                selected={selectedIndex === journey.id}
                onClick={() => handleJourneyClick(journey.id)}
                sx={{ border: `1px solid ${theme.palette.secondary.main}`, borderRadius: theme.shape.borderRadius, margin: `${theme.spacing(1)} 0` }}
              >

                <ListItemText primary={journey.journey.name} secondary={journey.journey.description} />
              </ListItemButton>
            </React.Fragment>
          ))}
      </List>
      <Typography variant="h5">Steps & Step Progress</Typography>
      <List sx={{ border: `1px solid ${theme.palette.primary.main}`, borderRadius: theme.shape.borderRadius, padding: theme.spacing(2), overflow: 'auto', maxHeight: 200}}>
            {steps.map((step) => (
              <React.Fragment key={step.id}>
                <StepProgress step={step} userLat={userLat} userLong={userLong}/>
              </React.Fragment>
            ))}
      </List>
      </Stack>
    </Container>
  )
}

export default Profile;
