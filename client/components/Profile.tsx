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
  useTheme,
  Divider,
  ListItemButton, Accordion,
  AccordionSummary,
  AccordionDetails,} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { Box } from "@mui/system";
import axios from "axios";
import { myContext } from "./Context";
//import { UserType } from "@this/types/User";
import { JourneyType } from '@this/types/Journey';
import { StepType } from "@this/types/Step"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



const Profile = () => {

  const [journeys, setJourneys] = useState<JourneyType[]>([]);
  const [steps, setSteps] = useState<StepType[]>([]);
  const [stepProgress, setStepProgress] = useState([]);
  const [journeyProgress, setJourneyProgress] = useState([])
  const [selectedJourney, setSelectedJourney] = useState(null);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [selectedJourneyProgress, setSelectedJourneyProgress] = useState<any>(null);


  const userObj = useContext(myContext);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    setUser(userObj);

    // GET user's journeys and journey progress
    const getUserData = async () => {
      try {
        const userJourneys = await axios.get(`/journey/user/${userObj.id}`);
        setJourneys(userJourneys.data);


        const journeyProgressResponse = await axios.get(`/journey/progress/${ userObj.id}`);
        //setJourneyProgress(journeyProgressResponse.data);
        //console.log(journeyProgressResponse)



      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUserData();
  });



  const handleJourneyClick = async (journeyId: number) => {


    try {

      const journeyProgressResponse = await axios.get(`/journey/progress/${ journeyId}`);
        setJourneyProgress(journeyProgressResponse.data);
        //console.log(journeyProgressResponse)

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





  const updateUsername = () => {
    axios.patch("/user/" + user.id, {username: user.username} )
    .then((res) => {
      setUser(res.data);
    })
    .catch((err) => {
      console.error('Could not Axios patch', err)
    });
  };


  const theme = useTheme();

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
     <Stack direction="row" spacing={1}>
          <TextField id="outlined-basic" label="Username" variant="outlined" value={''} />
          <Button variant="contained" onClick={updateUsername}>
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
                       console.log(journeyProgress)
                      // console.log("Selected Journey ID:", selectedJourney.id);
                       console.log("Progress Journey IDs:", progress);
                      return progress.journey.id === selectedJourney.id;
                    })
                    .map((progress) => {
                      console.log("Mapping Progress ID:", progress.id);
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

export default Profile;
