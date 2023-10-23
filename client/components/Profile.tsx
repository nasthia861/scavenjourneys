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
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";

import axios from "axios";
import { JourneyProgressType } from '@this/types/JourneyProgress';
import { StepProgressType } from "@this/types/StepProgress"
import SpeechToText from "./SpeechToText";
import { useNavigate, useLocation } from "react-router-dom";
import { UserType } from "@this/types/User";
import { JourneyType } from "@this/types/Journey";

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
  const [journeyiDToDelete, setJourneyIdToDelete] = useState<number | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  // State to hold user's journeys
  const [userJourneys, setUserJourneys] = useState<JourneyType[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>();




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
    getUserJourneys();

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

   // Function to fetch and display user's journeys
   const getUserJourneys = async () => {
     try {
       const userJourneysResponse = await axios.get(`/journey/user/${userId}`);
       setUserJourneys(userJourneysResponse.data);
     } catch (error) {
       console.error("Error fetching user's journeys:", error);
     }
   };

   const handleConfirmDialogOpen = () => {
    setConfirmDialogOpen(true);
  };

  const handleConfirmDialogClose = () => {
    setConfirmDialogOpen(false);
  };

   const handleDeleteJourney = (journeyId: React.SetStateAction<number>) => {
    setJourneyIdToDelete(journeyId);
    handleConfirmDialogOpen(); // Open the confirmation dialog
    console.log('handleDeleteJourney: ', journeyiDToDelete)
  };

  const deleteJourney = async () => {
    handleConfirmDialogClose(); // Close the confirmation dialog
    if (journeyiDToDelete) {
      try {
        // Delete the journey and its steps
        await axios.delete(`/journey/${journeyiDToDelete}`);
        setJourneyIdToDelete(null);
        // Refresh the user's journeys
        getUserJourneys();
      } catch (error) {
        console.error("Error deleting journey:", error);
      }
    }
  };

  const navigate = useNavigate();

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
     {!updateButton && (
          <Button
            variant="outlined"
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
               variant="outlined"
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
        {/* achievements page*/}
        <Button
        sx={{borderRadius: '20px'}}
        onClick={() => navigate(`/achievements/${userId}`,{state:{user}})}
        variant="contained">
          Achievements
        </Button>
         {/* Button to fetch and render user's journeys */}
      {/* <Button
        variant="contained"
        onClick={getUserJourneys}
      >
        Show My Journeys
      </Button> */}

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
                <StepProgress key={step.id} step={step} userLat={userLat} userLong={userLong} userId={userId}/>
            ))}
          </Grid>

        </List>
      {/* List of user's journeys */}
      <Typography variant="h5">My Journeys</Typography>
      <List sx={{ padding: theme.spacing(2) }}>
        {userJourneys.map((journey) => (
          <React.Fragment key={journey.id}>
            <ListItemButton
              onClick={() => navigate('/journey', { state: { journey, userId } })}
              sx={{
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: theme.shape.borderRadius,
                margin: `${theme.spacing(1)} 0`,
                padding: theme.spacing(2),
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ListItemText
                primary={journey.name}
                secondary={journey.description}
              />
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/StepForm/${userId}/${journey.id}`, {state:{userLat, userLong}});
                }}
                color="primary"
              >
                <AddIcon />
              </IconButton>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteJourney(journey.id);
                }}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </ListItemButton>
          </React.Fragment>
        ))}
      </List>
      {/* Confirmation dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={handleConfirmDialogClose}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this journey?
            This action will permanently delete this journey, all of its steps, and any associated data such as the progress anyone has made going on this journey.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteJourney} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      </Stack>
    </Container>
  )
}
export default Profile;

