import React, { useEffect, useState, useContext } from "react";
import {
  Avatar,
  Container,
  Stack,
  TextField,
  Typography,
  Button,
  List,
  ListItemText,
  Divider,
  ListItemButton} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { Box } from "@mui/system";
import axios from "axios";
import { myContext } from "./Context";

import { JourneyType } from '@this/types/Journey';
import { StepType } from "@this/types/Step"


const Profile = () => {

  const [journey, setJourney] = useState<JourneyType[]>([]);
  const [journeys, setJourneys] = useState([]);
  const [steps, setSteps] = useState<StepType[]>([]);
  const [stepProgress, setStepProgress] = useState([]);



  useEffect(() => {


      // Get journeys by userId
    axios.get('/journey/user/5')
      .then((userJourneys) => {
        setJourneys(userJourneys.data);
      })
      .catch((error) => {
        console.error('Error fetching journeys:', error);
      });
  }, []);

  // useEffect(() => {
  //   // get steps for the selected journey
  //     axios.get(`/step/journey/${journey.id}`)
  //       .then((stepAndJourney: {data: []}) => {
  //         setSteps(stepAndJourney.data);
  //       })
  //       .catch((error) => {
  //         console.error('Error getting steps for journey:', error);
  //       })

  // }, []);

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


  const userObj = useContext(myContext);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    setUser(userObj);
  });

  axios.get('/step/')


  // update user information
  const updateUsername = () => {
    axios.patch("/user/" + user.id, {username: user.username} )
    .then((res) => {
      setUser(res.data);
    })
    .catch((err) => {
      console.error('Could not Axios patch', err)
    });
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
              <ListItemButton >
                <ListItemText primary={journey.name} />
              </ListItemButton>
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
