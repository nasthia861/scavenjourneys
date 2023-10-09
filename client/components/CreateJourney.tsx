import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(() => ({
  padding: '16px',
  maxWidth: '400px',
  margin: '0 auto',
}));

const StyledForm = styled('form')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
}));

const StyledInput = styled(TextField)(() => ({
  width: '100%',
}));

const StyledButton = styled(Button)(() => ({
  marginTop: '16px',
}));

const CreateJourney: React.FC = () => {
  const [journeyData, setJourneyData] = useState({
    name: '',
    description: '',
    img_url: '',
  });

  const [stepData, setStepData] = useState({
    name: '',
    hint: '',
    journey: null,
  });

  const [image, setImage] = useState<string | null>('');

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

  const saveImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = e.target;
    console.log(URL.createObjectURL(files[0]))
    setImage(URL.createObjectURL(files[0]))
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
        <StyledInput
          label="Image URL"
          type="text"
          name="img_url"
          value={journeyData.img_url}
          onChange={handleInputChange}
        />
        <input
          type="file"
          accept="image/*"
          capture
          onChange={(e) => saveImage(e)}/>
        <img src={image}/>
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