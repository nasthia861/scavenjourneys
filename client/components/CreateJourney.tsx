import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Paper } from '@mui/material'
import { styled } from '@mui/material/styles'; // Import styled

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setJourneyData({ ...journeyData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post('/journey', journeyData)
      .then((response) => {
        console.log('Journey created successfully:', response.data);
        // Redirect to the home page
        window.location.href = '/home';
      })
      .catch((error) => {
        console.error('Error creating journey:', error);
      });
  };

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
        <StyledButton type="submit">Create Journey</StyledButton>
      </StyledForm>
    </StyledPaper>
  );
};

export default CreateJourney;