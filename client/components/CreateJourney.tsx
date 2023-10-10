import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {StyledPaper, StyledForm, StyledInput, StyledButton} from '../styling/createJourneyStyle';

const CreateJourney: React.FC = () => {
  const [journeyData, setJourneyData] = useState({
    name: '',
    description: '',
    img_url: '',
    //import from home
    latitude: '',
    longitude: ''
  });

  const [stepData, setStepData] = useState({
    name: '',
    hint: '',
    journeyId: null,
  });

  const [image, setImage] = useState<string | null>('');
  //const [video, setVideo] = useState<HTMLVideoElement | null>()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setJourneyData({ ...journeyData, [name]: value });
  };

  const handleStepInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStepData({ ...stepData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // First, create the journey to get its ID
      const response = await axios.post('/journey', journeyData);
      const newJourney = response.data;

      // Set the journey property of the step
      setStepData({ ...stepData, journey: newJourney.id });

      // Create the step with the journey ID
      await axios.post('/step', stepData);

      console.log('Journey and step created successfully', stepData, newJourney);
      // Redirect to the home page or another page
      window.location.href = '/home';
    } catch (error) {
      console.error('Error creating journey and step:', error);
    }
  };

  //for webcam access
  // useEffect(() => {

  //   const video = document.getElementById('video') as HTMLVideoElement;
  //   setVideo(video)

  //   if(navigator.mediaDevices.getUserMedia) {
  //     navigator.mediaDevices.getUserMedia({video: true})
  //     .then((stream) => {
  //       video.srcObject = stream;
  //       video.play();
  //     })
  //   }
  // }, [])

  // const takePicture = async() => {
  //   const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  //   const context = canvas.getContext('2d');
  //   context.drawImage(video, 0, 0, 320, 240)
  // }

  const saveImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = e.target;
    let imgSrc = URL.createObjectURL(files[0])
    setImage(imgSrc);
    setJourneyData({ ...journeyData, img_url: imgSrc.slice(5)});
  }


  return (
    <StyledPaper>
      <h2>Create a New Journey</h2>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          label="Name"
          type="text"
          name="name"
          value={journeyData.name}
          onChange={handleInputChange}
        />
        <StyledInput
          label="Description"
          type="text"
          name="description"
          value={journeyData.description}
          onChange={handleInputChange}
        />
        {/* <video id="video" width="320" height="240"></video>
        <button
          id="snap"
          onClick={takePicture}
        >Snap Photo</button>
        <canvas id="canvas" width="320" height="240"></canvas> */}
        <input
          id="cameraInput"
          type="file"
          accept="image/*"
          capture
          onChange={(e) => saveImage(e)}/>
        <img
          src={image} />
        <h3>Add Steps</h3>
        <StyledInput
          label="Step Name"
          type="text"
          name="name"
          value={stepData.name}
          onChange={handleStepInputChange}
        />
        <StyledInput
          label="Step Hint"
          type="text"
          name="hint"
          value={stepData.hint}
          onChange={handleStepInputChange}
        />
        <StyledButton type="submit">Create Journey</StyledButton>
      </StyledForm>
    </StyledPaper>
  );
};

export default CreateJourney;