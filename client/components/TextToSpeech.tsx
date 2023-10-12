import React, { ChangeEvent, useEffect, useState } from 'react'

/**TTS functionality used in other components */
const TextToSpeech: React.FC = () => {

  const synth = new window.SpeechSynthesis();
  const [text, setText] = useState<string>('');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [chosenVoice, setChosenVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    setVoices(speechSynthesis.getVoices());
  }, []);

  const handleVoice = (e: ChangeEvent<HTMLSelectElement>) => {
    const chosenVoiceName = e.target.value;
    const chosenVoice = voices.find((voice) => voice.name === chosenVoiceName);
    setChosenVoice(chosenVoice || null);
  }

  const speakText = () => {
    if (synth && chosenVoice) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = chosenVoice;
      synth.speak(utterance);
    }
  }


  return (
    <div>TextToSpeech</div>
  )
}

export default TextToSpeech