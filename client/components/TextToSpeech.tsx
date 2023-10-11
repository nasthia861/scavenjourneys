import React from 'react';


const TextToSpeech = () => {

  const handleSpeak = () => {

    const speak = new window.webkitSpeechRecognition();
    speak.lang = 'en-US';

    speak.onresult = (e: any) => {
      const spoke = e.results[0][0].transcript;
    };
    speak.start();

    speak.onspeechend = () => {
      speak.stop();
    };
  }



  return (
    <div>TextToSpeech</div>
  )
}

export default TextToSpeech