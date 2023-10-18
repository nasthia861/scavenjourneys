import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { StepProgressType } from '@this/types/StepProgress';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from '@mui/material/styles/styled';
import { VisuallyHiddenInput } from '../styling/createJourneyStyle';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';


type IHeaderProps = {
  step: StepProgressType
  userLat: number;
  userLong: number;
};

const StepProgress: React.FC<IHeaderProps> = ({step, userLat, userLong}) => {
  const [image, setImage] = useState<string | null | ArrayBuffer>()
  const [closeEnough, setCloseEnough] = useState(false)


  const solveStep = async(e: React.ChangeEvent<HTMLInputElement>) => {
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
   const [chosenVoice, setChosenVoice] = useState<SpeechSynthesisVoice>();
   useEffect(() => {
    setChosenVoice(voices[4]);
   })

   const speakText = () => {
     if (synth && chosenVoice) {
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
          <Button
              variant='outlined'
              size='small'
              onClick={() => {speakText()}}
            >TTS</Button>
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
        </CardActions>
    </Card>

  );
};

export default StepProgress;