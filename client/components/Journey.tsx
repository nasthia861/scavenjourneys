import React, {useState, useEffect, useContext} from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Item } from '../styling/journeyStyle';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import { JourneyType } from "@this/types/Journey";
import { StepType } from "@this/types/Step"
import { myContext } from "./Context";
// import { myContextType } from "./Context";
import ThreeStepDescription from './ARD';
import MarkerEntity from './ARSteps';
import { useXR, useCamera } from '@react-three/xr';



  const Journey: React.FC = () => {

  //set user state to User or null
  //const [user, setUser] = useState<User | null>(null);
  const location: {state: {journey: JourneyType}} = useLocation();
  const journey = location.state.journey
  //const [journey, setJourneys] = useState(location.state.journey);
  const [steps, setSteps] = useState<StepType[]>([]);
   const [user, setUser] = useState<any>(useContext(myContext));
  // const [stepProgress, setStepProgress] = useState([]);
  const [showARScene, setShowARScene] = useState(false);
  const [selectedStep, setSelectedStep] = useState(null);



  // const [userStarted, setUserStarted] = useState(false);

  const assignJourney = async() => {
    // POST to assign journey to user
    const steps: {data: []} = await axios.get(`/step/journey/${journey.id}`)
    axios.post(`/journey/progress`, {
      user: user.id,
      journey: journey.id,
    })
      .then((response) => {
        steps.data.forEach((step: {id:number}) => {
          axios.post('/step/progress', {
            journey_progress: response.data.id,
            step: step.id
          })
          .catch((error) => console.error('Error assigning steps', error))
        })
      })
      .catch((error) => {
        console.error('Error assigning journey:', error);
      });
  };



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


 const handleARButtonClick = (step: StepType) => {
    setSelectedStep(step.name);
  };
  //console.log(selectedStep)

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
                {/* <i>by: {journey.user.username}</i> */}
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
          //const progress = stepProgress[step.id] || { in_progress: false };
          return (
            <Item key={step.id}>
              <Card>

                  <CardContent>
                    <Typography variant="h6" component="div">
                      <b>{step.name}</b>
                      <br />
                      <p>{step.hint}</p>
                      <Link to="/ar">
  <Button onClick={() => setShowARScene(true)}>AR</Button>
</Link>
                    </Typography>
                  </CardContent>

              </Card>
            </Item>
          );
          })

        }
{showARScene && (
          <ARCanvas>
            <Box />
          </ARCanvas>
        )}
      </Stack>

    </Container>
  );
};

export default Journey;