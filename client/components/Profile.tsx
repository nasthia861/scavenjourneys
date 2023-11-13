import React, { useEffect, useState, SyntheticEvent } from "react";
import StepProgress from "./StepProgress";
import Achievements from "./Achievement";
import StepTab from "./StepTab";

import Avatar from "@mui/material/Avatar";
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
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import axios from "axios";
import { JourneyProgressType } from '@this/types/JourneyProgress';
import { StepProgressType } from "@this/types/StepProgress"
import SpeechToText from "./SpeechToText";
import { useNavigate, useLocation } from "react-router-dom";
import { UserType } from "@this/types/User";
import { JourneyType } from "@this/types/Journey";
import { toast } from 'react-toastify';
import logo from '../styling/scvnjrny_logo_stacked.svg';

type IHeaderProps = {
  userLat: number;
  userLong: number;
  accuracy: number;
};

  const Profile: React.FC<IHeaderProps> = ({userLat, userLong, accuracy}) => {

  const location: {state: {journeyProgressId: number | undefined}} = useLocation();
  const { currentJourneyIdState, isStepTabOpenState, tabValueState} = useLocation().state || {};
  const theme = useTheme();
  const [user, setUser] = useState<UserType>()
  const [userId, setUserId] = useState<number>(+window.location.pathname.split('/')[2])
  const [journeysStarted, setJourneysStarted] = useState<JourneyProgressType[]>([]);
  const [completedJourneys, setCompletedJourneys] = useState<JourneyProgressType[]>([]);
  const [steps, setSteps] = useState<StepProgressType[]>([]);
  const [username, setUsername] = useState<string>('');
  const [updatedUsername, setUpdatedUsername] = useState<string>('');
  const [updateButton, setUpdateButton] = useState(false);
  const [userImg, setUserImg] = useState<string>('');
  const [journeyiDToDelete, setJourneyIdToDelete] = useState<number | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [tabValue, setTabValue] = useState(tabValueState || "Started");
  const [isStepTabOpen, setIsStepTabOpen] = useState(isStepTabOpenState || false);
  const [currentJourneyId, setCurrentJourneyId] = useState<number | null>(currentJourneyIdState || null);
  const [currJourney, setCurrJourney] = useState<object | null>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // State to hold user's journeys created
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
      const unfinished = userJourneys.data.filter((journey: JourneyProgressType) => {
        return journey.in_progress === true;
      })
      const finished = userJourneys.data.filter((journey: JourneyProgressType) => {
        return journey.in_progress === false;
      })
      setJourneysStarted(unfinished);
      setCompletedJourneys(finished);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    getUserNameImg();
    getUserData();
    getUserJourneys();
    if (location.state !== null) {
      if (isStepTabOpen) {
        return;
      } else {
        handleJourneyClick(location.state.journeyProgressId);
      }
    }

  }, []);

  /** Journey and Step Functionality */
  const handleJourneyClick = async (journeyId: number) => {
    try {
      setSelectedIndex(journeyId)
      // GET steps for the selected journey
      const stepAndJourney = await axios.get(`/step/progress/${journeyId}`);
      setSteps(stepAndJourney.data);

      const allStepsCompleted: boolean = stepAndJourney.data.every((step: StepProgressType) => !step.in_progress);

      if (allStepsCompleted && tabValue === "Started") {
        axios.put(`/journey/progress/${journeyId}`, {in_progress: false})
          .then((result) => {
            setCompletedJourneys([...completedJourneys, result.data])
            const index = journeysStarted.findIndex((journey) => {
              return journey.id === result.data.id
            })
            journeysStarted.splice(index, 1)
            setJourneysStarted(journeysStarted);
            setTabValue("Completed");

            // Trigger a toast when all steps are completed
            toast.success(`Congrats ${username}! All steps are completed for the ${result.data.journey.name} Journey.`, {
              autoClose: 5000,
              position: "top-right",
              hideProgressBar: false,
              theme: "light",
              style: {
                background: '#FDF3E0',
                border: '2px solid #9a4119',
                borderRadius: '7px',
                padding: '5px',
              },
              icon: (
                <img
                  src={logo}
                  style={{
                    width: '32px',
                    height: '32px',
                    marginRight: '5px',
                  }}
                />
              ),
            });
          })
      }
    } catch (error) {
      console.error('Error fetching journey details:', error);
    }
  };

   // Function to fetch and display user's journeys created
   const getUserJourneys = async () => {
     try {
       const userJourneysResponse = await axios.get(`/journey/user/${userId}`);
       setUserJourneys(userJourneysResponse.data);
     } catch (error) {
       console.error("Error fetching user's journeys:", error);
     }
   };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
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

  const handleOpenStepTab = () => {
    setIsStepTabOpen(true);
  };

  const handleCloseStepTab = () => {
    setIsStepTabOpen(false);
  };

  const navigate = useNavigate();

  return (
    <Grid>
      <Stack spacing={1}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
            sx={{
              bgcolor: deepOrange[900],
              width: 56,
              height: 56,
            }}
            src={userImg}
            />
          </ListItemAvatar>
          <ListItemText
            sx={{ my: 2, mx: 2 }}
            primary={username}
            primaryTypographyProps={{
              fontSize: 25,
              fontWeight: 'large',
              letterSpacing: 0,
            }}/>
        </ListItem>
      </Stack>

      {/* Change Username button */}
     <Stack direction="row" spacing={1}  paddingLeft='10px'>
        {updateButton ? (
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
        ) : (
          <Button
            variant="contained"
            type='button'
            sx={{borderRadius: '20px'}}
            onClick={() => {
              setUpdateButton(true);
            }}
          >Update Username</Button>
        )}
      </Stack>

      <TabContext value={tabValue}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleTabChange} aria-label="lab API tabs example" variant='fullWidth' >
          <Tab label="Badges" value="Badges" />
          <Tab label="Started" value="Started" />
          <Tab label="Completed" value="Completed" />
          <Tab label="Created" value="Created" />
        </TabList>
      </Box>
        <TabPanel value="Badges">
          <Achievements userId={userId}/>
        </TabPanel>


        <TabPanel value="Started">
       {/* List of Journey Progress*/}
      <Typography variant="h5">Journeys In Progress</Typography>
      <List>
          {journeysStarted.map((journey) => (
            <React.Fragment key={journey.id}>
              <ListItemButton
                selected={selectedIndex === journey.id}
                onClick={() => handleJourneyClick(journey.id)}
                sx={{
                  padding: '10px',
                  background: '#f8e5c8',
                  borderRadius: '16px',
                  boxShadow: '5px 5px 15px 0px #a0a0a0, -5px -5px 15px 0px #ffffff',
                  border: '1px solid #9a4119',
                  margin: '10px',
                }}>
                <ListItemText primary={journey.journey.name} secondary={journey.journey.description} />
              </ListItemButton>
              <Grid>
                {(selectedIndex === journey.id) && (steps.map((step) => (
                    <StepProgress key={step.id} step={step} userLat={userLat} userLong={userLong} userId={userId} accuracy={accuracy} handleJourneyClick={handleJourneyClick}/>
                )))}
              </Grid>
            </React.Fragment>
          ))}

        </List>
      </TabPanel>


      <TabPanel value="Completed">
       {/* List of Journey Progress*/}
      <Typography variant="h5">Journeys Completed</Typography>
      <List>
          {completedJourneys.map((journey) => (
            <React.Fragment key={journey.id}>
              <ListItemButton
                selected={selectedIndex === journey.id}
                onClick={() => handleJourneyClick(journey.id)}
                sx={{
                  padding: '10px',
                  background: '#f8e5c8',
                  borderRadius: '16px',
                  boxShadow: '5px 5px 15px 0px #a0a0a0, -5px -5px 15px 0px #ffffff',
                  border: '1px solid #9a4119',
                  margin: '10px',
                }}>
                <ListItemText primary={journey.journey.name} secondary={journey.journey.description} />
              </ListItemButton>
              <Grid>
                {(selectedIndex === journey.id) && (steps.map((step) => (
                    <StepProgress key={step.id} step={step} userLat={userLat} userLong={userLong} userId={userId} accuracy={accuracy}/>
                )))}
              </Grid>
            </React.Fragment>
          ))}

        </List>
      </TabPanel>



      <TabPanel value="Created">
      {/* List of user's created journeys */}
      <Typography variant="h5">Journeys Created</Typography>
      <List>
        {userJourneys.map((journey) => (
          <React.Fragment key={journey.id}>
            <ListItemButton
              onClick={() => navigate('/journey', { state: { journey, userId } })}
              sx={{
                padding: '10px',
                background: '#f8e5c8',
                borderRadius: '16px',
                boxShadow: '5px 5px 15px 0px #a0a0a0, -5px -5px 15px 0px #ffffff',
                border: '1px solid #9a4119',
                margin: '10px',
              }}
            >
              <ListItemText
                primary={journey.name}
                secondary={journey.description}
              />
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenStepTab();
                  setCurrentJourneyId(journey.id)
                  setCurrJourney(journey);
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
            {/* StepTab component as a tab within the profile page */}
            {isStepTabOpen && (journey.id === currentJourneyId) && (
            <StepTab
              userId={userId}
              journeyId={currentJourneyId}
              userLat={userLat}
              userLong={userLong}
              journey={currJourney}
              onClose={handleCloseStepTab}
            />
            )}
          </React.Fragment>
        ))}
      </List>
      </TabPanel>
    </TabContext>


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
    </Grid>
  )
}
export default Profile;
