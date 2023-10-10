import React, { useState } from 'react';
import MicNoneRoundedIcon from '@mui/icons-material/MicNoneRounded';
import { IconButton } from '@mui/material';


const TextToSpeech = ({onceSpoken} : any) => {

  const [spoken, setSpoken] = useState('');

  const handleSpeak = () => {

    const speak = new window.webkitSpeechRecognition();
    speak.lang = 'en-US';

    speak.onresult = (e: any) => {
      const spoke = e.results[0][0].transcript;
      setSpoken(spoke);
      //prop for passing the spoken data
      onceSpoken(spoke);
    };
    speak.start();

    speak.onspeechend = () => {
      speak.stop();
    };

  }



  return (
    <div>
      <IconButton
        onClick={handleSpeak}
      >
        <MicNoneRoundedIcon />
      </IconButton>
    </div>
  )
}

export default TextToSpeech