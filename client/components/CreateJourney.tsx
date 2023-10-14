import React, { useContext, useState } from 'react';
import axios from 'axios';

import { myContext } from "./Context";

import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { UserType } from '@this/types/User';
import { JourneyType } from '@this/types/Journey'
import { createCompletion, loadModel } from 'gpt4all'


type IHeaderProps = {
  userLat: number;
  userLong: number;
};
  const CreateJourney: React.FC<IHeaderProps> = ({userLat, userLong}) => {
  //grabs user data from google oauth
  const [user, setUser] = useState<any>(useContext(myContext));

  const [journeyData, setJourneyData] = useState<JourneyType>({
    name: '',
    description: '',
    user: {
      id: user.id
    },
    img_url: '',
    //import from home
    latitude: userLat,
    longitude: userLong
  });

  const [journeyId, setJourneyId] = useState(null);

  const [image, setImage] = useState<string | null>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setJourneyData({ ...journeyData, [name]: value});
  };


  const createJourney = async () => {
    try {
      console.log('before', journeyData)
      const journeyResponse = await axios.post('/journey', journeyData);
      const newJourney = journeyResponse.data;
      console.log('responce', newJourney)
      setJourneyId(newJourney.id);
      // console.log(journeyData)
      navigate(`/StepForm/${newJourney.id}`);
    } catch (error) {
      console.error('Error creating journey:', error);
    }
  };

  const navigate = useNavigate();

  const saveImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = e.target;
    let imgSrc = URL.createObjectURL(files[0])
    setImage(imgSrc);
    setJourneyData({ ...journeyData, img_url: imgSrc.slice(5)});
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
          src={image} />
        {!journeyId ? (
          <Button onClick={createJourney}>Add Steps</Button>
        ) : null}
    </Paper>
  );
};

export default CreateJourney;
