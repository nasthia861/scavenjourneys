import React, { useEffect, useState, useContext, SyntheticEvent, useRef } from "react";
import StepProgress from "./StepProgress";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import useTheme from "@mui/material/styles/useTheme";
import ListItemButton from "@mui/material/ListItemButton";
import deepOrange from "@mui/material/colors/deepOrange";
import axios from "axios";
import { myContext } from "./Context";
import { JourneyProgressType } from '@this/types/JourneyProgress';
import { StepProgressType } from "@this/types/StepProgress"
import SpeechToText from "./SpeechToText";


  export const Profile: React.FC = () => {

  const [journeys, setJourneys] = useState<JourneyProgressType[]>([]);
  const [steps, setSteps] = useState<StepProgressType[]>([]);

  //grabs user data from google oauth
  const [user, setUser] = useState<any>(useContext(myContext));
  const [username, setUsername] = useState<string>('');
  const [updatedUsername, setUpdatedUsername] = useState<string>('');
  const [userImg, setUserImg] = useState<string>('');

  /** User Functionality for User Profile*/
  const updateUsername = async (username: string) => {
    await axios.patch("/user/" + user.id, {username: username} )
    .then(() => {console.log('username updated')})
    .catch((err) => {
      console.error('Could not Axios patch', err)
    });
  };

  const getUserNameImg = () => {
    axios.get('/user/' + user.id)
    .then((userData) => {
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
      const userJourneys = await axios.get(`/journey/progress/${user.id}`);
      setJourneys(userJourneys.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    getUserNameImg();
    getUserData();
  });

  /** Journey and Step Functionality */
  const handleJourneyClick = async (journeyId: number) => {
    try {

      // GET steps for the selected journey
      const stepAndJourney = await axios.get(`/step/progress/${journeyId}`);
      setSteps(stepAndJourney.data);

    } catch (error) {
      console.error('Error fetching journey details:', error);
    }
  };

  const theme = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <Container>
      <Stack spacing={1}>
      <Typography variant="h5" gutterBottom>
        {username}
      </Typography>


      {/* For other variants, adjust the size with `width` and `height` */}
      <Avatar
      sx={{ bgcolor: deepOrange[900],
      width: 56, height: 56 }}
      src={userImg}
      ></Avatar>
     <Stack direction="row" spacing={1}  >
      <form onSubmit= { handleSubmit } >
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            onChange={handleUsernameChange}
            value={ updatedUsername }
            inputRef={inputRef}
            InputProps={{ endAdornment: <SpeechToText onceSpoken={ setUpdatedUsername } />}}
          />
          <Button
            variant="contained"
            type='submit'
            onClick={async () => {
              updateUsername(updatedUsername);
              if (inputRef.current) {
                inputRef.current.value = '';
              }
            }}
            >
            Update Username
          </Button>
        </form>
        </Stack>
       {/* List of Journeys */}
      <Typography variant="h5">Journeys</Typography>
      <List sx={{ border: `1px solid ${theme.palette.primary.main}`, borderRadius: theme.shape.borderRadius, padding: theme.spacing(2) }}>
          {journeys.map((journey) => (
            <React.Fragment key={journey.id}>
              <ListItemButton onClick={() =>
              handleJourneyClick(journey.id)}
              sx={{ border: `1px solid ${theme.palette.secondary.main}`, borderRadius: theme.shape.borderRadius, margin: `${theme.spacing(1)} 0` }}
              >
                <ListItemText primary={journey.journey.name} secondary={journey.journey.description} />
              </ListItemButton>
            </React.Fragment>
          ))}
          <Typography variant="h5">Steps & Step Progress</Typography>
          <List>
            {steps.map((step) => (
              <StepProgress key={step.id} step={step}/>
            ))}
          </List>

        </List>

      </Stack>
    </Container>
  )
}

// export default Profile;
