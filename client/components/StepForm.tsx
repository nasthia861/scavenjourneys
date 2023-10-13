import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useParams, useNavigate } from 'react-router-dom';
import { myContext } from "./Context";

const StepForm: React.FC = () => {
  const { journeyId: routeJourneyId } = useParams();
  const navigate = useNavigate();

  const [journeyId, setJourneyId] = useState<number | null>(routeJourneyId ? Number(routeJourneyId) : null);

  //grabs user data from google oauth
  const [user, setUser] = useState<any>(useContext(myContext));

  const [stepData, setStepData] = useState({
    name: '',
    hint: '',
    user: {
      id: user.id
    },
  });

  const [journeyCreated, setJourneyCreated] = useState(false); // Flag to track journey creation
  const [stepIds, setStepIds] = useState<number[]>([]); // Array to store step IDs


  useEffect(() => {
    // Add an event listener for the beforeunload event
    const unloadHandler = async (e: BeforeUnloadEvent) => {
      if (!journeyCreated) {
        // Display a confirmation message when the user tries to leave
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';

        if (journeyId) {
          // Delete steps first
          for (const stepId of stepIds) {
            await axios.delete(`/step/${stepId}`);
          }
          // Delete the journey once steps are deleted
          await axios.delete(`/journey/${journeyId}`);
          // Redirect to the CreateJourney page
          navigate('/create-journey');
        }
      }
    };

    window.addEventListener('beforeunload', unloadHandler);

    return () => {
      window.removeEventListener('beforeunload', unloadHandler);
    };
  }, [journeyCreated, journeyId, stepIds]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStepData({ ...stepData, [name]: value });
  };

  const addStep = async () => {
    try {
      const stepWithJourneyId = { ...stepData, journey: { id: journeyId } };
      const response = await axios.post('/step', stepWithJourneyId);
      const newStepId = response.data.id;
      setStepIds([...stepIds, newStepId]);
      setStepData({ name: '', hint: '', user: {
        id: user.id
      }, });
    } catch (error) {
      console.error('Error adding step:', error);
    }
  };

  const submitJourney = async () => {
    try {
      // Mark the journey as created
      setJourneyCreated(true);
      // Post the step to the database
      const stepWithJourneyId = { ...stepData, journey: { id: journeyId }};
      await axios.post('/step', stepWithJourneyId);
      setStepData({ name: '', hint: '', user: {
        id: user.id
      }, });
      // Navigate to the home page
      navigate('/home');
    } catch (error) {
      console.error('Error submitting journey with steps:', error);
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
      <Button onClick={submitJourney}>Submit Journey</Button>
    </div>
  );
};

export default StepForm;