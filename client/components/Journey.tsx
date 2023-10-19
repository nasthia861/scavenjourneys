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
import { useLocation } from 'react-router-dom';
import { JourneyType } from "@this/types/Journey";
import { StepType } from "@this/types/Step"
import { JourneyProgressType } from '@this/types/JourneyProgress';
import { myContext } from "./Context";

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
            {buttonName}
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
                    </Typography>
                  </CardContent>

              </Card>
            </Item>
          );
          })
        }
      </Stack>
    </Container>
  );
};

export default Journey;