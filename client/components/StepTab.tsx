import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styled from '@mui/system/styled'
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Grid from '@mui/material/Grid';
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
import { Typography, List, Divider } from '@mui/material';

import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { myContext } from "./Context";
import { StepType } from '@this/types/Step';
import { JourneyType } from '@this/types/Journey';
import { ShakeButton } from '../styling/stepFormStyling';

interface StepTabProps {
  userId: number;
  journeyId: number;
  userLat: number;
  userLong: number;
  journey: object;
  onClose: () => void; // Callback to close the tab
}

const StepTab: React.FC<StepTabProps> = ({ userId, journeyId, userLat, userLong, journey, onClose }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const latitude = userLat
  const longitude = userLong
  const journeyData = journey

  const [stepData, setStepData] = useState<StepType>({
    name: '',
    hint: '',
    latitude: latitude,
    longitude: longitude,
    user: {
      id: userId
    },
    journey: journeyData
  });

  const [journeyCreated, setJourneyCreated] = useState(false); // Flag to track journey creation
  const [stepIds, setStepIds] = useState<number[]>([]); // Array to store step IDs

  // State for errors and shake effect
  const [stepNameError, setStepNameError] = useState(false);
  const [stepHintError, setStepHintError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [submittedSteps, setSubmittedStep] = useState<any>([]); // Track submitted steps

  useEffect(() => {
  }, [journeyCreated, journeyId, stepIds]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStepData({ ...stepData, [name]: value });
  };

  const submitJourney = async () => {
     // Validate step data before submission
     if (!stepData.name || !stepData.hint) {
       // check name
       if (!stepData.name) {
         setStepNameError(true);
         setIsShaking(true);

         // Clear errors and stop the shake effect after a short delay
         setTimeout(() => {
           setStepNameError(false);
           setStepHintError(false);
         }, 5000);
         setTimeout(() => {
           setIsShaking(false);
         }, 500);
       }

       //check hint
       if (!stepData.hint) {
         setStepHintError(true);
         setIsShaking(true);

         // Clear errors and stop the shake effect after a short delay
         setTimeout(() => {
           setStepNameError(false);
           setStepHintError(false);
         }, 5000);
         setTimeout(() => {
           setIsShaking(false);
         }, 500);
       }
       return;
     }

    try {
      // Mark the journey as created
      setJourneyCreated(true);

      // Post the step to the database
      const stepWithJourneyId = { ...stepData, journey: { id: journeyId }};
      await axios.post('/step', stepWithJourneyId);
      
      const submittedStepNameHint: any = {
        name: stepData.name,
        hint: stepData.hint
      }
      // add step to submitted steps array
      setSubmittedStep([...submittedSteps, submittedStepNameHint])

      // Calculate the number of steps created
      const stepCount = 1 + stepIds.length;

      // get the userData for logged in user
      const userDataResponse = await axios.get(`/userdata/byUserId/${userId}`);

        // update said userData
        const existingUserData = userDataResponse.data;
        const updatedUserData = {
          ...existingUserData,
          stepsCreated: existingUserData.stepsCreated + stepCount,
        };
        await axios.put(`/userdata/${existingUserData.id}`, updatedUserData);

      // remember the new userData
      const newStepsCreated = existingUserData.stepsCreated + stepCount

      // Check for achievements if the user has any
      const userAchievementsResponse = await axios.get(`/userachievements/byUserId/${userId}`);
      const userAchievements = userAchievementsResponse.data;

      // Function to create a new user achievement if it doesn't exist
      const createNewUserAchievement = async (achievementId: number) => {
        await axios.post('/userachievements', {
          user: { id: userId },
          achievement: { id: achievementId },
        });
      };
      // Check if the user needs an amateur step maker achievement
      if (newStepsCreated >= 15) {
        if (Array.isArray(userAchievements)) {

          // Check if the user has achievement ID 4
          const hasAchievement = userAchievements.some(
            (achievement) => achievement.achievement.id === 4
          );
          // If they don't have it, create a new user achievement
          if (!hasAchievement) {
            createNewUserAchievement(4);
          }
        }
      }
      // Check if the user needs an amateur step maker achievement
      if (newStepsCreated >= 50) {
        if (Array.isArray(userAchievements)) {

          // Check if the user has achievement ID 5
          const hasAchievement = userAchievements.some(
            (achievement) => achievement.achievement.id === 5
          );
          // If they don't have it, create a new user achievement
          if (!hasAchievement) {
            createNewUserAchievement(5);
          }
        }
      }
      // Check if the user needs an amateur step maker achievement
      if (newStepsCreated >= 100) {
        if (Array.isArray(userAchievements)) {

          // Check if the user has achievement ID 6
          const hasAchievement = userAchievements.some(
            (achievement) => achievement.achievement.id === 6
          );
          // If they don't have it, create a new user achievement
          if (!hasAchievement) {
            createNewUserAchievement(6);
          }
        }
      }
        // Clear step data and navigate to the home page
        setStepData({ name: '', hint: '', user: { id: userId } });
        // navigate('/home');
      } catch (error) {
        console.error('Error submitting journey with steps:', error);
      }
    };

    return (
      <div>
        {submittedSteps.length > 0 && (
          <List 
          sx={{ border: `1px solid ${theme.palette.primary.main}`, borderRadius: theme.shape.borderRadius, padding: theme.spacing(2), marginBottom: theme.spacing(2) }}>
            <Typography 
              variant="h6">
              New Steps:
            </Typography>
            {submittedSteps.map((step, index) => (
              <ListItem
                key={index}
                sx={{
                  border: `1px solid ${theme.palette.primary.main}`,
                  borderRadius: theme.shape.borderRadius,
                  padding: theme.spacing(2),
                  marginBottom: theme.spacing(2),
                }}
              >
                <Box sx={{ padding: theme.spacing(2) }}>
                  <Typography
                  variant="body1">
                  Name: {step.name}
                  </Typography>
                  <Typography
                  variant="body2"
                  color="textSecondary">
                  Hint: {step.hint}
                  </Typography>
              </Box>
              </ListItem>
            ))}
          </List>
        )}
        <List
        sx={{ border: `1px solid ${theme.palette.primary.main}`, borderRadius: theme.shape.borderRadius, padding: theme.spacing(2) }}>
          <h3>Add Steps</h3>
          <Typography variant="body2" color="textSecondary" gutterBottom>
          Your current location will be used as the destination for this step
          </Typography>
          <TextField
            label="Step Name"
            type="text"
            name="name"
            value={stepData.name}
            onChange={handleInputChange}
            error={stepNameError}
            helperText={stepNameError ? 'Please enter a name' : ''}
            style={{ marginBottom: '16px' }}
          />
          <TextField
            label="Step Hint"
            type="text"
            name="hint"
            value={stepData.hint}
            onChange={handleInputChange}
            error={stepHintError}
            helperText={stepHintError ? 'Please enter a hint' : ''}
            style={{ marginBottom: '16px' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              {!isShaking ? (
                <Button
                onClick={submitJourney}
                variant="contained"
                color="primary"
                >
                  Add Step
                </Button>
              ) : (
                <Button
                onClick={submitJourney}
                variant="contained"
                color="secondary"
                >
                  Add Step
                </Button>
              )}
            </div>
          </div>
        </List>
      </div>
    );
  };

export default StepTab;
