import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid/Grid';
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import Item from './Item';
import { Hidden } from '@mui/material';

const Logout = () => {
  const [userId, setUserId] = useState<number>(+window.location.pathname.split('/')[2])
  const [pictures, setPictures] = useState([])



  const logUserOut = () => {
    axios.post('/auth/logout');
  }

  //change axios request to grab user photos instead
  const getPictures = () => {
    axios.get(`/step/progress/user/${userId}`)
      .then((response) => setPictures(response.data))
      .catch((error) => console.error('could not get pictures'))
  }

  useEffect(() => {
    getPictures();
  }, [])

  return (
    <div>
      <Grid
        container
        direction="column"
        // alignItems="center"
      >
        <p>
          Thanks for playing. Hope you had a great time and created awesome memories!
        </p>
        <Carousel
        >
            {
              pictures.map((photoData) => {
                return <img src={photoData.image_url} key={photoData.id}/>
              })
            }
        </Carousel>
        <Button
          variant='outlined'
          sx={{borderRadius: '20px'}}
          onClick={() => {logUserOut()}}
          href='/'
        >
          Logout
        </Button>
      </Grid>
    </div>
  )
}

export default Logout