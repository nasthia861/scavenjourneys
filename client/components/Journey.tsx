import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
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
import { JourneyProgressType } from '@this/types/JourneyProgress';
import { myContext } from "./Context";
// import { myContextType } from "./Context";
import MarkerEntity from './ARSteps';
import { Canvas } from '@react-three/fiber';
import ARScene from './AR';


// type IHeaderProps = {
//   userId: number;
// };

  const Journey: React.FC = () => {

  const location: {state: {journey: JourneyType, userId: number}} = useLocation();
  const journey = location.state.journey
  const userId = location.state.userId
  const [alreadyStarted, setAlreadyStarted] = useState([]);
  const [steps, setSteps] = useState<StepType[]>([]);
  const [buttonName, setButtonName] = useState('Assign Journey');

  const [journeyProgressId, setJourneyProgressId] = useState<number | null>(null);
  const [showARScene, setShowARScene] = useState(false);
  const [selectedStep, setSelectedStep] = useState(null);



  const navigate = useNavigate();

  const assignJourney = async() => {
    // POST to assign journey to user
    if(buttonName === 'Already Started'){
      setJourneyProgressId(alreadyStarted[0].id);
    } else {

      const steps: {data: []} = await axios.get(`/step/journey/${journey.id}`)
      axios.post(`/journey/progress`, {
      user: userId,
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
          setJourneyProgressId(response.data.id)
        })
        .catch((error) => {
          console.error('Error assigning journey:', error);
        });
    }
  };

  const grabProgress = async() => {
    const result = await axios.get(`/journey/progress/${userId}`)
    let idArray = result.data.filter((progress: JourneyProgressType) => {
      return progress.journey.id === journey.id
    })
    if(idArray.length > 0) {
      setButtonName('Already Started')
    }
    setAlreadyStarted(idArray);
  }



  useEffect(() => {
    // get steps for the selected journey
    grabProgress()
      axios.get(`/step/journey/${journey.id}`)
        .then((stepAndJourney: {data: []}) => {
          setSteps(stepAndJourney.data);
          // setSelectedStep(stepAndJourney.data);

        })
        .catch((error) => {
          console.error('Error getting steps for journey:', error);

        })

  }, []);

  useEffect(() => {
    if(journeyProgressId) {
      navigate(`/profile/${userId}`, {state: {journeyProgressId}})
    }
  }, [journeyProgressId])


 const grabStepData = (
  _event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  step: StepType) => {
    setSelectedStep(step.name);
    setShowARScene(true);
    console.log(step)
    navigate('/ar', {state: { stepData: step }})
    // const position = [0, 8, -5];
    // const text = "";
    // const stepName = step.name;

    //  return <MarkerEntity position={position} text={text} stepName={stepName} />;
  };
  // console.log(selectedStep)

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
                <br/>
                {journey.description}
              </Typography>

            </CardContent>
          </Card>
            <Button onClick={assignJourney} variant="contained" color="primary">
            {buttonName}
            </Button>
        </Item>
        <h3>Steps:</h3>
        {
        steps.map((step) => {
          return (
            <Item key={step.id}>
              <Card>

                  <CardContent>
                    <Typography variant="h6" component="div">
                      <b>{step.name}</b>
                      <br />
                      <p>{step.hint}</p>
                      <Link to="/ar">
                      <button onClick={(event) => grabStepData(event, step)}>AR</button>


                      </Link>
                    </Typography>
                  </CardContent>

              </Card>
            </Item>
          );
          })

        }
      </Stack>
      {showARScene && selectedStep && (
        <ARScene stepName={selectedStep.name} />
        )}

    </Container>
  );
};

export default Journey;
