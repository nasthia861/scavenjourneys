import React, { useState } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export const CreateJourney: React.FC = () => {
  const [journeyData, setJourneyData] = useState({
    name: '',
    description: '',
    img_url: '',
  });

  const [journeyId, setJourneyId] = useState(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setJourneyData({ ...journeyData, [name]: value });
  };

  const createJourney = async () => {
    try {
      const journeyResponse = await axios.post('/journey', journeyData);
      const newJourney = journeyResponse.data;
      setJourneyId(newJourney.id);
    } catch (error) {
      console.error('Error creating journey:', error);
    }
  };

  const navigate = useNavigate();

  return (
    <Paper>
      <h2>Create a New Journey</h2>
      <TextField
        label="Name"
        type="text"
        name="name"
        value={journeyData.name}
        onChange={handleInputChange}
      />
      <TextField
        label="Description"
        type="text"
        name="description"
        value={journeyData.description}
        onChange={handleInputChange}
      />
      <TextField
        label="Image URL"
        type="text"
        name="img_url"
        value={journeyData.img_url}
        onChange={handleInputChange}
      />
      <Button onClick={createJourney}>Create Journey</Button>
        {journeyId && (
          <Button
            onClick={() => navigate(`/StepForm/${journeyId}`)}
          >
            Add Steps
          </Button>
        )}
    </Paper>
  );
};