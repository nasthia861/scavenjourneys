import React, { useState, useContext, useEffect } from 'react';
import { StepProgressType } from '@this/types/StepProgress';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';
// import ImageListItemBar from '@mui/material/ImageListItemBar';
// import IconButton from '@mui/material/IconButton';
// import InfoIcon from '@mui/icons-material/Info';
// import Button from "@mui/material/Button";



type IHeaderProps = {
  step: StepProgressType
};

const StepProgress: React.FC<IHeaderProps> = ({step}) => {
  const [image, setImage] = useState<string | null>(step.image_url)
  const [closeEnough, setCloseEnough] = useState(false)



  const solveStep = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {files} = e.target;
      let imgSrc = URL.createObjectURL(files[0])
      setImage(imgSrc);
  }

   /**Text to Speech Functionality */
   const synth = window.speechSynthesis
   const voices = synth.getVoices();
   const [text, setText] = useState<string>(step.step.hint);
   const [chosenVoice, setChosenVoice] = useState<SpeechSynthesisVoice>(voices[4]);

   const speakText = () => {
     if (synth && chosenVoice) {
       const utterance = new SpeechSynthesisUtterance(text);
       utterance.voice = chosenVoice;
       synth.speak(utterance);
     }
   }

  return (
    <Card sx={{ maxWidth: 345 }}>
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
          {closeEnough && (
              <input
              id="cameraInput"
              // label="Solve Step"
              type="file"
              accept="image/*"
              capture="environment"
              onChange={(e) => solveStep(e)}/>
           )}
        </CardActions>
    </Card>









      // <ImageListItem>
      //     {(image.length > 0) ? <div/> :
      //       <img
      //     src={image}
      //     loading="lazy"
      //     />
      //     }
      //   <ImageListItemBar
      //     title={step.step.name}
      //     //subtitle={step.step.user.username}
      //     actionIcon={
      //       <IconButton
      //         sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
      //         aria-label={step.step.hint}
      //         // onClick={toggleDescription}
      //       >
      //         <InfoIcon />
      //       </IconButton>
      //     }
      //   />
      //   {/* <input
      //     id="cameraInput"
      //     type="file"
      //     accept="image/*"
      //     capture
      //     onChange={(e) => solveStep(e)}/> */}
      // </ImageListItem>
  );
};

export default StepProgress;