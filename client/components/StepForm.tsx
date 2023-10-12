import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom'; // Import useParams

export const StepForm: React.FC<{ journeyId?: number }> = ({ journeyId = 0 }) => {
  // If journeyId is not provided in the URL, it defaults to 0

  const [stepData, setStepData] = useState({
    name: '',
    hint: '',
  });

  const { journeyId: routeJourneyId } = useParams(); // Get the journeyId from the URL

  // Use routeJourneyId if provided in the URL, otherwise, use the default journeyId
  const currentJourneyId = routeJourneyId ? Number(routeJourneyId) : journeyId;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStepData({ ...stepData, [name]: value });
  };

  const addStep = async () => {
    try {
      const stepWithJourneyId = { ...stepData, journeyId: currentJourneyId };
      // Send the step data to the server to create a step with the journeyId
      await axios.post('/step', stepWithJourneyId);
      // Clear the step form for the next step
      setStepData({ name: '', hint: '' });
    } catch (error) {
      console.error('Error adding step:', error);
    }
  };

  return (
    <div>
      <h3>Add Steps</h3>
      <TextField
        label="Step Name"
        type="text"
        name="name"
        value={stepData.name}
        onChange={handleInputChange}
      />
      <TextField
        label="Step Hint"
        type="text"
        name="hint"
        value={stepData.hint}
        onChange={handleInputChange}
      />
      <Button onClick={addStep}>Add Step</Button>
    </div>
  );
};
