import React, { lazy, Suspense, useEffect, useState, useContext, SyntheticEvent } from "react";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import useTheme from "@mui/material/styles/useTheme";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import deepPurple from "@mui/material/colors/deepPurple";
import axios from "axios";
import { myContext } from "./Context";
import { JourneyType } from '@this/types/Journey';
import { StepType } from "@this/types/Step"



  export const Profile: React.FC = () => {

  const [journeys, setJourneys] = useState<JourneyType[]>([]);
  const [steps, setSteps] = useState<StepType[]>([]);
  // const [stepProgress, setStepProgress] = useState([]);
  // const [journeyProgress, setJourneyProgress] = useState([])
  const [selectedJourney, setSelectedJourney] = useState(null);
  const [expanded, setExpanded] = useState<string | false>(false);
  // const [selectedJourneyProgress, setSelectedJourneyProgress] = useState<any>(null);

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

      const journeyProgressResponse = await axios.get(`/journey/progress/${ journeyId}`);
        setJourneyProgress(journeyProgressResponse.data);

      // GET steps for the selected journey
      const stepAndJourney = await axios.get(`/step/journey/${journeyId}`);
      setSteps(stepAndJourney.data);



      // GET step progress for each step
      const progressData = await Promise.all(
        stepAndJourney.data.map(async (step: { id: number; }) => {
          const progressObj = await axios.get(`/step/step_progress/${step.id}`);
          return {
            [step.id]: progressObj.data,
          };
        })
      );
        //set stepPorgress data for every step on iteration (stePandJourney m)
      setStepProgress(Object.assign({}, ...progressData));


      // Update the selected journey
      const selectedJourney = journeys.find((journey) => journey.id === journeyId);
      setSelectedJourney((prevSelectedJourney: { id: number; }) => (
        prevSelectedJourney && prevSelectedJourney.id === journeyId ? null : selectedJourney
      ));

      const progress = journeyProgress.find((progress) => progress.journey_id === journeyId);
      setSelectedJourneyProgress(progress);


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
       {/* List of Journeys */}
      <Typography variant="h5">Journeys</Typography>
      <List sx={{ border: `1px solid ${theme.palette.primary.main}`, borderRadius: theme.shape.borderRadius, padding: theme.spacing(2) }}>
          {journeys.map((journey) => (
            <React.Fragment key={journey.id}>
              <ListItemButton onClick={() =>
              handleJourneyClick(journey.id)}
              sx={{ border: `1px solid ${theme.palette.secondary.main}`, borderRadius: theme.shape.borderRadius, margin: `${theme.spacing(1)} 0` }}
               >
                <ListItemText primary={journey.name} secondary={journey.description} />
              </ListItemButton>
              {selectedJourney && selectedJourney.id === journey.id && (
                <>
                  <Typography variant="h5">Journey Progress</Typography>
                  <List>
                  {journeyProgress

                    .filter((progress) => {

                      return progress.journey.id === selectedJourney.id;
                    })
                    .map((progress) => {
                      const { tagId, img_url } = progress.journey;
                      return (
                        <ListItem key={progress.id}>
                          <ListItemText

                            primary={`In Progress: ${progress.in_progress}`}
                            secondary={`Difficulty: ${progress.difficulty}`}
                          />
                          <Typography variant="caption">
                            Started: {progress.started_at.slice(0, 10)}
                          </Typography>
                          <Typography variant="caption">
                            Journeyed on: {progress.last_progress_at.slice(0, 10)}
                            <Typography variant="caption">Tag ID: {tagId}</Typography>
                            {/* <img src={`${img_url}?w=20&h=20`}
                             alt="Journey Preview"
                             sx={{ marginLeft: theme.spacing(2) }}
                             /> */}
                          </Typography>
                        </ListItem>
                      );
                    })}
                  </List>

                  <Typography variant="h5">Steps & Step Progress</Typography>
                  <List>
                    {steps.map((step) => (
                      <React.Fragment key={step.id}>
                        <ListItem>
                          <ListItemText primary={`Step: ${step.name}`}
                          sx={{ border: `1px solid ${theme.palette.secondary.main}`, borderRadius: theme.shape.borderRadius, margin: `${theme.spacing(1)} 0` }}/>
                        </ListItem>
                        <List>
                          {stepProgress[step.id] &&
                            stepProgress[step.id].map((progress: any) => (
                              <ListItem key={progress.id}>
                                <ListItemText secondary={`In Progress: ${progress.in_progress}`}
                                sx={{ border: `1px solid ${theme.palette.primary.main}`, borderRadius: theme.shape.borderRadius, padding: `${theme.spacing(1)} 0` }} />
                              </ListItem>
                            ))}
                        </List>
                      </React.Fragment>
                    ))}
                  </List>
                </>
              )}
              <Divider />
            </React.Fragment>
          ))}
        </List>

      </Stack>
    </Container>
  )
}

// export default Profile;
