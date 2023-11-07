// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import styled from '@mui/system/styled'
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import { myContext } from "./Context";
// import { StepType } from '@this/types/Step';
// import { JourneyType } from '@this/types/Journey';
// import { ShakeButton } from '../styling/stepFormStyling';
// import Box from '@mui/material/Box';

// const StepForm: React.FC = () => {
//   const params = useParams();
//   const routeJourneyId = params.journeyId;
//   const routeUserId = parseInt(params.UserId);
//   const navigate = useNavigate();
//   const location: {state: {userLat: number, userLong: number, journeyData: JourneyType}} = useLocation();
//   const latitude = location.state.userLat
//   const longitude = location.state.userLong
//   const journeyData = location.state.journeyData


//   const [journeyId, setJourneyId] = useState<number | null>(routeJourneyId ? Number(routeJourneyId) : null);

//   //grabs user data from params
//   const [userId, setUserId] = useState<number | null>(routeUserId);

//   const [stepData, setStepData] = useState<StepType>({
//     name: '',
//     hint: '',
//     latitude: latitude,
//     longitude: longitude,
//     user: {
//       id: userId
//     },
//     journey: journeyData
//   });

//   const [journeyCreated, setJourneyCreated] = useState(false); // Flag to track journey creation
//   const [stepIds, setStepIds] = useState<number[]>([]); // Array to store step IDs

//   // State for errors and shake effect
//   const [stepNameError, setStepNameError] = useState(false);
//   const [stepHintError, setStepHintError] = useState(false);
//   const [isShaking, setIsShaking] = useState(false);

//   useEffect(() => {
//     // Add an event listener for the beforeunload event
//     const unloadHandler = async (e: BeforeUnloadEvent) => {
//       if (!journeyCreated) {
//         // Display a confirmation message when the user tries to leave
//         e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
//         if (journeyId) {
//           // Delete steps first
//           for (const stepId of stepIds) {
//             await axios.delete(`/step/${stepId}`);
//           }
//           // Delete the journey once steps are deleted
//           await axios.delete(`/journey/${journeyId}`);
//           // Redirect to the CreateJourney page
//           navigate('/home');
//         }
//       }
//     };
//     window.addEventListener('beforeunload', unloadHandler);
//     return () => {
//       window.removeEventListener('beforeunload', unloadHandler);
//     };
//   }, [journeyCreated, journeyId, stepIds]);
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setStepData({ ...stepData, [name]: value });
//   };

//   const grabAIHint = () => {

//   }

//   const submitJourney = async () => {
//      // Validate step data before submission
//      if (!stepData.name || !stepData.hint) {
//        // check name
//        if (!stepData.name) {
//          setStepNameError(true);
//          setIsShaking(true);

//          // Clear errors and stop the shake effect after a short delay
//          setTimeout(() => {
//            setStepNameError(false);
//            setStepHintError(false);
//          }, 5000);
//          setTimeout(() => {
//            setIsShaking(false);
//          }, 500);
//        }

//        //check hint
//        if (!stepData.hint) {
//          setStepHintError(true);
//          setIsShaking(true);

//          // Clear errors and stop the shake effect after a short delay
//          setTimeout(() => {
//            setStepNameError(false);
//            setStepHintError(false);
//          }, 5000);
//          setTimeout(() => {
//            setIsShaking(false);
//          }, 500);
//        }
//        return;
//      }

//     try {
//       // Mark the journey as created
//       setJourneyCreated(true);

//       // Post the step to the database
//       const stepWithJourneyId = { ...stepData, journey: { id: journeyId }};
//       await axios.post('/step', stepWithJourneyId);

//       // Calculate the number of steps created
//       const stepCount = 1 + stepIds.length;

//       // get the userData for logged in user
//       const userDataResponse = await axios.get(`/userdata/byUserId/${userId}`);

//         // update said userData
//         const existingUserData = userDataResponse.data;
//         const updatedUserData = {
//           ...existingUserData,
//           journeysCreated: existingUserData.journeysCreated + 1,
//           stepsCreated: existingUserData.stepsCreated + stepCount,
//         };
//         await axios.put(`/userdata/${existingUserData.id}`, updatedUserData);

//       // remember the new userData
//       const newJourneysCreated = existingUserData.journeysCreated + 1
//       const newStepsCreated = existingUserData.stepsCreated + stepCount

//       // Check for achievements if the user has any
//       const userAchievementsResponse = await axios.get(`/userachievements/byUserId/${userId}`);
//       const userAchievements = userAchievementsResponse.data;

//       // Function to create a new user achievement if it doesn't exist
//       const createNewUserAchievement = async (achievementId: number) => {
//         await axios.post('/userachievements', {
//           user: { id: userId },
//           achievement: { id: achievementId },
//         });
//       };
//       // Check if the user needs an amateur journey maker achievement
//       if (newJourneysCreated >= 5) {
//         if (Array.isArray(userAchievements)) {

//           // Check if the user has achievement ID 1
//           const hasAchievement = userAchievements.some(
//             (achievement) => achievement.achievement.id === 1
//           );
//           // If they don't have it, create a new user achievement
//           if (!hasAchievement) {
//             createNewUserAchievement(1);
//           }
//         }
//       }
//       // Check if the user needs an expert journey maker achievement
//       if (newJourneysCreated >= 20) {
//         if (Array.isArray(userAchievements)) {

//           // Check if the user has achievement ID 2
//           const hasAchievement = userAchievements.some(
//             (achievement) => achievement.achievement.id === 2
//           );
//           // If they don't have it, create a new user achievement
//           if (!hasAchievement) {
//             createNewUserAchievement(2);
//           }
//         }
//       }
//       // Check if the user needs an master journey maker achievement
//       if (newJourneysCreated >= 50) {
//         if (Array.isArray(userAchievements)) {

//           // Check if the user has achievement ID 3
//           const hasAchievement = userAchievements.some(
//             (achievement) => achievement.achievement.id === 3
//           );
//           // If they don't have it, create a new user achievement
//           if (!hasAchievement) {
//             createNewUserAchievement(3);
//           }
//         }
//       }
//       // Check if the user needs an amateur step maker achievement
//       if (newStepsCreated >= 15) {
//         if (Array.isArray(userAchievements)) {

//           // Check if the user has achievement ID 4
//           const hasAchievement = userAchievements.some(
//             (achievement) => achievement.achievement.id === 4
//           );
//           // If they don't have it, create a new user achievement
//           if (!hasAchievement) {
//             createNewUserAchievement(4);
//           }
//         }
//       }
//       // Check if the user needs an amateur step maker achievement
//       if (newStepsCreated >= 50) {
//         if (Array.isArray(userAchievements)) {

//           // Check if the user has achievement ID 5
//           const hasAchievement = userAchievements.some(
//             (achievement) => achievement.achievement.id === 5
//           );
//           // If they don't have it, create a new user achievement
//           if (!hasAchievement) {
//             createNewUserAchievement(5);
//           }
//         }
//       }
//       // Check if the user needs an amateur step maker achievement
//       if (newStepsCreated >= 100) {
//         if (Array.isArray(userAchievements)) {

//           // Check if the user has achievement ID 6
//           const hasAchievement = userAchievements.some(
//             (achievement) => achievement.achievement.id === 6
//           );
//           // If they don't have it, create a new user achievement
//           if (!hasAchievement) {
//             createNewUserAchievement(6);
//           }
//         }
//       }
//         // Clear step data and navigate to the home page
//         setStepData({ name: '', hint: '', user: { id: userId } });
//         navigate('/home');
//       } catch (error) {
//         console.error('Error submitting journey with steps:', error);
//       }
//     };

//     return (
//       <Box
//         display="flex"
//         flexDirection="column"
//         alignItems="center"
//         paddingTop="32px" // Adjust as needed to move it to the top of the page
//       >
//         <h3>Add Steps</h3>
//         <TextField
//           label="Step Name"
//           type="text"
//           name="name"
//           value={stepData.name}
//           onChange={handleInputChange}
//           error={stepNameError}
//           helperText={stepNameError ? 'Please enter a name' : ''}
//           style={{ marginBottom: '16px' }}
//         />
//         <TextField
//           label="Step Hint"
//           type="text"
//           name="hint"
//           value={stepData.hint}
//           onChange={handleInputChange}
//           error={stepHintError}
//           helperText={stepHintError ? 'Please enter a hint' : ''}
//           style={{ marginBottom: '16px' }}
//         />
//         {!isShaking ? (
//           <Button onClick={submitJourney} variant="contained">
//             Submit Journey
//           </Button>
//         ) : (
//           <ShakeButton onClick={submitJourney} variant="contained">
//             Submit Journey
//           </ShakeButton>
//         )}
//       </Box>
//     );
//   };


// export default StepForm;