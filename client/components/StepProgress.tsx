import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StepProgressType } from '@this/types/StepProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import useTheme from "@mui/material/styles/useTheme";
import Box from '@mui/material/Box';


import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import MarkerEntity from './ARSteps';


type IHeaderProps = {
  userId: number
  step: StepProgressType
  userLat: number;
  userLong: number;
  accuracy: number;
};

const StepProgress: React.FC<IHeaderProps> = ({step, userLat, userLong, userId, accuracy}) => {
  const [image, setImage] = useState<string | null | ArrayBuffer>(null)
  const [closeEnough, setCloseEnough] = useState(false)
  const [sizeWarning, setSizeWarning] = useState<boolean>(false)
  const [inProgress, setInProgress] = useState<boolean>(step.in_progress)

  const theme = useTheme();

  // Increment steps taken in user data
  const giveStepsTakenAchievement = async () => {

    const userDataResponse = await axios.get(`/userdata/byUserId/${userId}`);
    const existingUserData = userDataResponse.data;
    const updatedUserData = {
      ...existingUserData,
      stepsTaken: existingUserData.stepsTaken + 1, // Increment stepsTaken by 1
    };
    await axios.put(`/userdata/${existingUserData.id}`, updatedUserData);

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
    // Check if the user needs an achievement based on steps taken
    if (updatedUserData.stepsTaken >= 5) {
      if (Array.isArray(userAchievements)) {
        console.log('these are your achievements---->',userAchievements)
        // Check if the user has achievement ID for steps taken
        const achievementId = 10;
        const hasAchievement = userAchievements.some(
          (achievement) => achievement.achievement.id === achievementId
        );
        // If they don't have it, create a new user achievement
        if (!hasAchievement) {
          createNewUserAchievement(achievementId);
        }
      }
    }

    if (updatedUserData.stepsTaken >= 25) {
      if (Array.isArray(userAchievements)) {
        // Check if the user has achievement ID for steps taken
        const achievementId = 11;
        const hasAchievement = userAchievements.some(
          (achievement) => achievement.achievement.id === achievementId
        );
        // If they don't have it, create a new user achievement
        if (!hasAchievement) {
          createNewUserAchievement(achievementId);
        }
      }
    }

    if (updatedUserData.stepsTaken >= 50) {
      if (Array.isArray(userAchievements)) {
        // Check if the user has achievement ID for steps taken
        const achievementId = 12;
        const hasAchievement = userAchievements.some(
          (achievement) => achievement.achievement.id === achievementId
        );
        // If they don't have it, create a new user achievement
        if (!hasAchievement) {
          createNewUserAchievement(achievementId);
        }
      }
    }
  };



  const getLocation = () => {
    let feetAcc = accuracy * 3.28084 * 1.05
    const feetPerDegree = 364000;

    const latDiff = Math.abs(Number(step.step.latitude) - userLat);
    const lonDiff = Math.abs(Number(step.step.longitude) - userLong);

    const distanceInFeet = Math.sqrt(latDiff * latDiff + lonDiff * lonDiff) * feetPerDegree;

    if(distanceInFeet < 20 + feetAcc) {
      //console.log('true', distanceInFeet, feetAcc)
      setCloseEnough(true);
    } else {
      //console.log('false', distanceInFeet, feetAcc)
      setCloseEnough(false);
    }

 }

  useEffect(() => {
    getLocation()

  }, [userLat, userLong])


   /**Text to Speech Functionality */
   const synth = window.speechSynthesis
   const voices = synth.getVoices();
   const [text, setText] = useState<string>(step.step.hint);
   const [chosenVoice, setChosenVoice] = useState<SpeechSynthesisVoice>(voices[4]);

   useEffect(() => {
    setChosenVoice(voices[4]);
   }, [chosenVoice])

   const speakText = () => {
     if (synth) {
       const utterance = new SpeechSynthesisUtterance(text);
       utterance.voice = chosenVoice;
       synth.speak(utterance);
     }
   }

  return (
    <Card sx={{
      maxWidth: 400,
      backgroundColor: 'transparent',
      margin: `${theme.spacing(1)} 0`,
      padding: theme.spacing(2),
      }}>
        {!inProgress ?
          (<CardMedia
          sx={{
            height: 300,
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: theme.shape.borderRadius,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          image={step.image_url || image }
        />) :
        (<CardContent
        sx={{
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: theme.shape.borderRadius,
          margin: `${theme.spacing(1)} 0`,
          padding: theme.spacing(2),
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        {/* <Typography gutterBottom variant="h5" component="div">
          {step.step.hint}
        </Typography> */}
        <Box>
          {closeEnough && (
              <MarkerEntity step={step} setImage={setImage} setInProgress={setInProgress} setSizeWarning={setSizeWarning} giveStepsTakenAchievement={giveStepsTakenAchievement}></MarkerEntity>
          )}
          {sizeWarning && (<Alert severity="warning">Your image is too big</Alert>)}
        </Box>
        {/* <Typography variant="body2" color="text.secondary" >
          {text} */}
        <Typography gutterBottom variant="h5" component="div">
          {step.step.hint}
          <IconButton onClick={() => {speakText()}} >
            <VolumeUpOutlinedIcon fontSize='small' />
          </IconButton>
        </Typography>
        </CardContent>
        )}
    </Card>

  );
};

export default StepProgress;
