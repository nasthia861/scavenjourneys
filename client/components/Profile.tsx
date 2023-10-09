import React, { useEffect, useState, useContext } from "react";
import {
  Avatar,
  Container,
  Stack,
  TextField,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemButton, Accordion,
  AccordionSummary,
  AccordionDetails,} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { Box } from "@mui/system";
import axios from "axios";
import { myContext } from "./Context";

import { JourneyType } from '@this/types/Journey';
import { StepType } from "@this/types/Step"
//import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



const Profile = () => {
 // const journey: {journey: JourneyType} ;
  //const [journey, setJourney] = useState<JourneyType[]>([]);
  const [journeys, setJourneys] = useState<JourneyType[]>([]);
  const [steps, setSteps] = useState<StepType[]>([]);
  const [step, setStep] = useState<StepType[]>([]);
  const [stepProgress, setStepProgress] = useState([]);
  const [journeyProgress, setJourneyProgress] = useState([])
  const [selectedJourney, setSelectedJourney] = useState(null);
  const [expanded, setExpanded] = React.useState<string | false>(false);




  const handleJourneyClick = async (journeyId: number) => {
    try {
      // GET steps for the selected journey
      const stepAndJourney = await axios.get(`/step/journey/${journeyId}`);
      setSteps(stepAndJourney.data);

      // GET step progress for each step
      const progressData = await Promise.all(
        stepAndJourney.data.map(async (step: { id: any; }) => {
          const progressObj = await axios.get(`/step/step_progress/${step.id}`);
          return {
            [step.id]: progressObj.data,
          };
        })
      );

      setStepProgress(Object.assign({}, ...progressData));

      // Update the selected journey
      const selectedJourney = journeys.find((journey) => journey.id === journeyId);
      setSelectedJourney(selectedJourney);
    } catch (error) {
      console.error('Error fetching journey details:', error);
    }
  };

  useEffect(() => {
    // GET user's journeys and journey progress
    const getUserData = async () => {
      try {
        const userJourneys = await axios.get('/journey/user/5');
        setJourneys(userJourneys.data);

        const journeyProgressResponse = await axios.get('/journey/progress/user/5');
        setJourneyProgress(journeyProgressResponse.data);
        console.log(journeyProgressResponse)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUserData();
  }, []);

  const userObj = useContext(myContext);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    setUser(userObj);
  });

  axios.get('/step/')

  useEffect(() => {
    // Fetching step progress for each step
    steps.forEach((step) => {
      axios.get(`/step/step_progress/${step.id}`)
        .then((progressResponse) => {
          setStepProgress((prevProgress) => ({
            ...prevProgress,
            [step.id]: progressResponse.data,
          }));
        })
        .catch((error) => {
          console.error(`Error getting step progress for step ${step.id}:`, error);
        });
    });
  }, [steps]);


  const updateUsername = () => {
    axios.patch("/user/" + user.id, {username: user.username} )
    .then((res) => {
      setUser(res.data);
    })
    .catch((err) => {
      console.error('Could not Axios patch', err)
    });
  };


  const handleChange = (panel: string) =>
  (event: React.SyntheticEvent, isExpanded: boolean) =>
  {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Container>
      <Stack spacing={1}>
      <Typography variant="h5" gutterBottom>
        {user.username}
      </Typography>


      {/* For other variants, adjust the size with `width` and `height` */}
      <Avatar
      sx={{ bgcolor: deepPurple[500],
      width: 56, height: 56 }}
      src={user.img_url}
      ></Avatar>
      <Box
       component='form'
       sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
       >
      <TextField
          id="outlined-basic"
          label="Username"
          // onChange={(e) => setUser(e.target.value)}
        />
      </Box>
      <List component="nav" aria-label="journeys">
        {journeys.map((journey) => (
          <React.Fragment key={journey.id}>
            <ListItemButton onClick={() => handleJourneyClick(journey.id)}>
              <ListItemText primary={journey.name} />
            </ListItemButton>
            <Divider />
          </React.Fragment>
        ))}
      </List>
        <Typography variant="h6" gutterBottom>
          Journey Progress
        </Typography>
        <List component="nav" aria-label="journey-progress">
          {journeyProgress.map((progress) => (
            <ListItem key={progress.id}>
              <ListItemText primary={`In Progress: ${progress.in_progress}`} />
              <ListItemText primary={`Difficulty: ${progress.difficulty}`} />
              <br/>
              <ListItemText primary={`Started: ${progress.started_at.slice(0, 10)}`} />
              <ListItemText primary={`Journeyed on: ${progress.last_progress_at.slice(0, 10)}`} />

            </ListItem>
          ))}
        </List>

        {/* Steps and Step Progress */}
        <Typography variant="h6" gutterBottom>
          Steps
        </Typography>
        <List component="nav" aria-label="steps">
          {steps.map((step) => (
            <React.Fragment key={step.id}>
              <ListItem>
                <ListItemText primary={`Step: ${step.name}`} />
              </ListItem>
              {/* Display step progress */}
              <List component="nav" aria-label={`step-progress-${step.id}`}>
                {stepProgress[step.id] &&
                  stepProgress[step.id].map((progress: { id: React.Key; in_progress: any; }) => (
                    <ListItem key={progress.id}>
                      <ListItemText primary={`In Progress: ${progress.in_progress}`} />
                    </ListItem>
                  ))}
              </List>
              <Divider />
            </React.Fragment>
          ))}
        </List>

      <Button variant="contained" size="medium">
          Update Username
        </Button>
    </Stack>
    </Container>
  )
}

export default Profile;
