import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import useTheme from "@mui/material/styles/useTheme";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List'
import CircularProgress from '@mui/material/CircularProgress';


import { useNavigate } from 'react-router-dom';
import { StepType } from '@this/types/Step';

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
  // const location: {state: {userLat: number, userLong: number, journeyData: JourneyType}} = useLocation();
  // const latitude = location.state.userLat
  // const longitude = location.state.userLong
  // const journeyData = location.state.journeyData

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
  const [loadingSuggestion, setLoadingSuggestion] = useState<boolean>(false);

  useEffect(() => {
  }, [journeyCreated, journeyId, stepIds]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStepData({ ...stepData, [name]: value });
  };

  const grabAIHint = () => {
    if(stepData.name.length > 0){
      setLoadingSuggestion(true)
      axios.post('/chat/', {
        answer: stepData.name
      })
      .then((clue) => {
        setStepData({...stepData, hint: clue.data})
        setLoadingSuggestion(false)
      })
      .catch((error) => {
        console.error('could not grab clue from server', error)
      })
    }
  }

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
      const stepWithJourneyId = { ...stepData, journey: { id: journeyId }, latitude: userLat, longitude: userLong};
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
        //right here, clearing everything except name hint and user
        setStepData({ ...stepData, name: '', hint: '' });
      } catch (error) {
        console.error('Error submitting steps:', error);
      }
    };

    return (
      <div>
        {submittedSteps.length > 0 && (
          <List
            sx={{
              borderRadius: theme.shape.borderRadius,
              padding: theme.spacing(2),
              marginBottom: theme.spacing(2),
            }}
          >
            <Typography variant="h6">New Steps:</Typography>
            {submittedSteps.map((step, index) => (
              <ListItem
                key={index}
                sx={{
                  padding: theme.spacing(2),
                  background: '#f8e5c8',
                  borderRadius: '16px',
                  boxShadow: '5px 5px 15px 0px #a0a0a0, -5px -5px 15px 0px #ffffff',
                  border: '1px solid #9a4119',
                  margin: '10px',
                }}
              >
                <Box sx={{ padding: theme.spacing(2) }}>
                  <Typography variant="body1">Name: {step.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Hint: {step.hint}
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        )}
        <List
          sx={{
            padding: '10px',
            background: '#f8e5c8',
            borderRadius: '16px',
            boxShadow: '5px 5px 15px 0px #a0a0a0, -5px -5px 15px 0px #ffffff',
            border: '1px solid #9a4119',
            margin: '10px',
          }}
        >
          <h3>Add Steps</h3>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Your current location will be used as the destination for this step
          </Typography>
          <TextField
            label="Answer"
            type="text"
            name="name"
            value={stepData.name}
            onChange={handleInputChange}
            error={stepNameError}
            helperText={stepNameError ? 'Please enter a name' : ''}
            style={{ marginBottom: '16px' }}
          />
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Add a clue for the player to solve the step or use our suggested clue button
          </Typography>
          <Button
            onClick={grabAIHint}
            variant="contained"
            sx={{
              background: 'primary',
              borderRadius: '16px',
              transition: 'box-shadow 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '5px 5px 20px 0px #b9b4b4, -5px -5px 20px 0px #ffffff',
              },
            }}
          >
            Suggested Clue
          </Button>
          {loadingSuggestion && (<CircularProgress />)}
          <br />
          <br />
          <TextField
            label="Step Clue"
            multiline // Allow multiple lines
            rows={3} // Initial number of rows
            maxRows={6} // Maximum number of rows (it will become scrollable after reaching this limit)
            name="hint"
            value={stepData.hint}
            onChange={handleInputChange}
            error={stepHintError}
            helperText={stepHintError ? 'Please enter a clue' : ''}
            style={{ marginBottom: '16px', width: '100%' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              {!isShaking ? (
                <Button
                  onClick={submitJourney}
                  variant="contained"
                  sx={{
                    background: 'primary',
                    borderRadius: '16px',
                    transition: 'box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      boxShadow: '5px 5px 20px 0px #b9b4b4, -5px -5px 20px 0px #ffffff',
                    },
                  }}
                >
                  Add Step
                </Button>
              ) : (
                <Button onClick={submitJourney} variant="contained" color="secondary">
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
