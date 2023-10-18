import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

import { myContext } from "./Context";

import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styled from '@mui/material/styles/styled';
import { VisuallyHiddenInput } from '../styling/createJourneyStyle';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
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
    name: null,
    description: null,
    user: {
      id: user.id
    },
    img_url: null,
    tag: {}
    //import from home
  });

  const [image, setImage] = useState<string | null >()
  const [ready, setReady] = useState<boolean>(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setJourneyData({ ...journeyData, [name]: value});
  };


  const createJourney = async () => {

    try {
      const journeyResponse = await axios.post('/journey', journeyData);
      const newJourney = journeyResponse.data;

      navigate(`/StepForm/${newJourney.id}`, {state:{userLat, userLong, newJourney}});
    } catch (error) {
      console.error('Error creating journey:', error);
    }
  };


  useEffect(() => {
    if(journeyData.name && journeyData.description && journeyData.img_url) {
      setReady(true);
    }
  }, [journeyData])

  const navigate = useNavigate();

  const saveImage = async(e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.files[0]", e.target.files[0])
    const reader = await new FileReader()
    reader.addEventListener('load', async(event) => {
      const response = await axios.post(`/cloud/createJourney/${journeyData.name}`, {data: event.target.result})
      console.log("response.data.secure_url", response.data.secure_url)
      setJourneyData({ ...journeyData, img_url: response.data.secure_url});
      setImage(response.data.secure_url)
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
        error={!journeyData.name}
      />
      <TextField
        label="Description"
        type="text"
        name="description"
        value={journeyData.description}
        onChange={handleInputChange}
        error={!journeyData.description}
      />


    {/*
      <input
        id="icon-button-file"
        type="file"
        accept="image/*"
        capture
        onChange={(e) => saveImage(e)}
      /> */}
    <Button component="label" variant="contained" startIcon={<CameraAltRoundedIcon />}>
      Journey Photo
      <VisuallyHiddenInput
        type="file"
        accept="image/*"
        capture
        onChange={(e) => saveImage(e)}
       />
    </Button>

        {image && (<img
          src={image}
          width="250"
          height="auto"
          />
        )}
        {ready && (
          <Button onClick={createJourney}>Add Steps</Button>
        )}
    </Paper>
  );
};

export default CreateJourney;
