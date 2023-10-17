import React, { lazy, Suspense, useEffect, useState, useContext, SyntheticEvent } from "react";
import { Link } from 'react-router-dom';
import StepProgress from "./StepProgress";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Grid from '@mui/material/Grid';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ImageList from '@mui/material/ImageList';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import useTheme from "@mui/material/styles/useTheme";
import ListItemButton from "@mui/material/ListItemButton";
import deepPurple from "@mui/material/colors/deepPurple";
import axios from "axios";
import { myContext } from "./Context";
import { JourneyProgressType } from '@this/types/JourneyProgress';
import { StepProgressType } from "@this/types/StepProgress"



  export const Profile: React.FC = () => {

  const [journeys, setJourneys] = useState<JourneyProgressType[]>([]);
  const [steps, setSteps] = useState<StepProgressType[]>([]);

  //grabs user data from google oauth
  const [user, setUser] = useState<any>(useContext(myContext));
  const [username, setUsername] = useState<string>('');
  const [updatedUsername, setUpdatedUsername] = useState<string>('');
  const [userImg, setUserImg] = useState<string>('');

  /** User Functionality for User Profile*/
  const updateUsername = () => {
    axios.patch("/user/" + user.id, {username: updatedUsername} )
    .then(() => {})
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

  return (
    <Container>
      <Stack spacing={1}>
      <Typography variant="h5" gutterBottom>
        {username}
      </Typography>


      {/* For other variants, adjust the size with `width` and `height` */}
      <Avatar
      sx={{ bgcolor: deepPurple[500],
      width: 56, height: 56 }}
      src={userImg}
      ></Avatar>
     <Stack direction="row" spacing={1}>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            onChange={(e: SyntheticEvent) => {
              const target = e.target as HTMLInputElement;
              const value = target.value;
              setUpdatedUsername(value)
            }}
           />
          <Button
            variant="contained"
            onClick={() => {updateUsername();}}
          >
            Update Username
          </Button>
        </Stack>
        {/* achievements page*/}
        <Button component={Link} to="/achievements" variant="contained">
          Achievements
        </Button>
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
          <Grid>
            {steps.map((step) => (
                <StepProgress key={step.id} step={step}/>
            ))}
          </Grid>

        </List>

      </Stack>
    </Container>
  )
}

// export default Profile;
