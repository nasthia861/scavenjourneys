import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StepProgressType } from '@this/types/StepProgress';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from '@mui/material/styles/styled';
import Alert from '@mui/material/Alert';

import { VisuallyHiddenInput } from '../styling/createJourneyStyle';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import IconButton from '@mui/material/IconButton';


type IHeaderProps = {
  step: StepProgressType
  userLat: number;
  userLong: number;
};

const StepProgress: React.FC<IHeaderProps> = ({step, userLat, userLong}) => {
  const [image, setImage] = useState<string | null | ArrayBuffer>()
  const [closeEnough, setCloseEnough] = useState(false)
  const [sizeWarning, setSizeWarning] = useState<boolean>(false)


  const solveStep = async(e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files[0].size < 1000000) {
      setSizeWarning(false);
      const reader = await new FileReader()
      reader.addEventListener('load', (event) => {
        axios.post(`/cloud/stepProgress/${step.id}`, {data: event.target.result})
          .then((response) => {
            axios.put(`/step/progress/${step.id}`, {
              in_progress: false,
              image_url: response.data.secure_url
            })
            setImage(response.data.secure_url)
          })
      });
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setSizeWarning(true);
    }
  }



  const getLocation = () => {
    //0.00005 20ft
    if(Math.abs(+step.step.latitude - userLat) <  0.5) {
      setCloseEnough(true)
    }
 }

  useEffect(() => {
    getLocation()
  }, [userLat])

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
    <Card sx={{ maxWidth: 345 }}>
        {!step.in_progress && (<CardMedia
          sx={{ height: 140 }}
          image={step.image_url}
        />)}
        {image && (<CardMedia
          sx={{ height: 140 }}
          image={image}
        />)}
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {step.step.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" >
          {text}
          <IconButton onClick={() => {speakText()}} >
            <VolumeUpOutlinedIcon fontSize='small' />
          </IconButton>
        </Typography>
        </CardContent>
        <CardActions>
          {closeEnough && step.in_progress && (
            <Button component="label" variant="contained" startIcon={<CameraAltRoundedIcon />}>
            Solve Step
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              capture="environment"
              onChange={(e) => solveStep(e)}
              />
            </Button>

           )}
          {sizeWarning && (<Alert severity="warning">Your image is too big</Alert>)}
        </CardActions>
    </Card>

  );
};

export default StepProgress;