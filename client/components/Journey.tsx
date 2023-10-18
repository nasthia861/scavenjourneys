import React, {useState, useEffect, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Grid, Card, CardContent, CardMedia, Typography , Stack, Button} from '@mui/material';
import { Item } from '../styling/journeyStyle';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { JourneyType } from "@this/types/Journey";
import { StepType } from "@this/types/Step"
import { myContext } from "./Context";
import ThreeStepDescription from './ARD';
import MarkerEntity from './ARSteps';


const Journey = () => {

  const userObj = useContext(myContext);
  //console.log(userObj.id)


  //set user state to User or null
  //const [user, setUser] = useState<User | null>(null);
  const location: {state: {journey: JourneyType}} = useLocation();
  const [journey, setJourneys] = useState(location.state.journey);
  const [steps, setSteps] = useState<StepType[]>([]);
  const [stepProgress, setStepProgress] = useState([]);
  const [showARScene, setShowARScene] = useState(false);
  const [selectedStep, setSelectedStep] = useState(null);







  useEffect(() => {
    // get steps for the selected journey
      axios.get(`/step/journey/${journey.id}`)
        .then((stepAndJourney: {data: []}) => {
          setSteps(stepAndJourney.data);
          setSelectedStep(stepAndJourney.data);

        })
        .catch((error) => {
          console.error('Error getting steps for journey:', error);

        })

  }, []);



  useEffect(() => {
    // Fetching step progress for each step
    steps.forEach((step) => {
      axios.get(`/step/step_progress/${step.id}`)
        .then((progressResponse) => {
          setStepProgress((prevProgress) => ({
            ...prevProgress,
            [step.id]: progressResponse.data,
          }));
        })
        .catch((error) => {
          console.error(`Error getting step progress for step ${step.id}:`, error);
        });
    });
  }, [steps]);

 const handleARButtonClick = (step: StepType) => {
    setSelectedStep(step.name);
  };
  console.log(selectedStep)

  const assignJourney = () => {

    const difficulty = 1;
    const in_progress = true;
    const started_at = new Date().toISOString();
    const last_progress_at = new Date().toISOString();

    // POST to assign journey to user
    axios.post(`/journey/progress/${userObj.id}/${journey.id}`, {
      difficulty,
      in_progress,
      started_at,
      last_progress_at,
      user: userObj.id,
      journey: journey.id,
    })
      .then((response) => {
        console.log('Journey assigned!', response.data);
      })
      .catch((error) => {
        console.error('Error assigning journey:', error);
      });
  };

  return (
    <Container>

      <Stack spacing={2}>
        <h1> Journey Begins Here!</h1>
        <Item>

          <Card >
            <CardMedia
              component="img"
              alt={journey.name}
              height="140"
              image={journey.img_url}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                <b>{journey.name}</b>
                <br/>
                <i>by: {journey.user.username}</i>
                <br/>
                {journey.description}
              </Typography>

            </CardContent>
          </Card>
          <Button onClick={assignJourney} variant="contained" color="primary">
          Assign Journey
        </Button>
        </Item>
      {/* Display selected journey details steps */}
        <h3>Steps:</h3>
        {
        steps.map((step) => {
          const progress = stepProgress[step.id] || { in_progress: false };
          return (
            <Item key={step.id}>
              <Card>

                  <CardContent>
                    <Typography variant="h6" component="div">
                      <b>Details: {step.name}</b>
                      <p>Location: {step.location.latitude}, {step.location.longitude}</p>
                      <br />
                      <i>Progress: {progress.in_progress === true ? 'In Progress' : 'Not Started' }</i>
                      <br />
                      <Link to="/ar">
                      <button onClick={() => handleARButtonClick(step.name)} >
                      AR
                      </button>

                    </Link>
                    </Typography>
                  </CardContent>

              </Card>
            </Item>
          );
          })

        }
        {selectedStep && <MarkerEntity stepName={selectedStep.name} />}

      </Stack>

    </Container>
  );
};

export default Journey;