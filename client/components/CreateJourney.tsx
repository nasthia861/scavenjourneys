import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

import { myContext } from "./Context";

import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { UserType } from '@this/types/User';
import { JourneyType } from '@this/types/Journey'
//import { createCompletion, loadModel } from 'gpt4all'


type IHeaderProps = {
  userLat: number;
  userLong: number;
};
  const CreateJourney: React.FC<IHeaderProps> = ({userLat, userLong}) => {
  //grabs user data from google oauth
  const [user, setUser] = useState<any>(useContext(myContext));

  const [journeyData, setJourneyData] = useState<JourneyType>({
    latitude: userLat,
    longitude: userLong,
    name: '',
    description: '',
    user: {
      id: user.id
    },
    img_url: ''
    //import from home
  });

  const [journeyId, setJourneyId] = useState(null);

  const [image, setImage] = useState<string | null | ArrayBuffer>()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setJourneyData({ ...journeyData, [name]: value});
  };


  const createJourney = async () => {
    try {
      const journeyResponse = await axios.post('/journey', journeyData);
      const newJourney = journeyResponse.data;
      setJourneyId(newJourney.id);

      navigate(`/StepForm/${newJourney.id}`, {state:{userLat, userLong, journeyData}});
    } catch (error) {
      console.error('Error creating journey:', error);
    }
  };

  const navigate = useNavigate();

  const saveImage = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = await new FileReader()
    reader.addEventListener('load', (event) => {
      axios.post(`/cloud/createJourney/${journeyData.name}`, {data: event.target.result})
        .then((response) => {
          console.log(response.data.secure_url);
          setJourneyData({ ...journeyData, img_url: response.data.secure_url});
          setImage(response.data.secure_url)
        });
    })
    reader.readAsDataURL(e.target.files[0]);
  }


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
        <input
          id="cameraInput"
          type="file"
          accept="image/*"
          capture
          onChange={(e) => saveImage(e)}/>
        <img
          src={image}
          width="300"
          height="300"/>
        {!journeyId ? (
          <Button onClick={createJourney}>Add Steps</Button>
        ) : null}
    </Paper>
  );
};

export default CreateJourney;
