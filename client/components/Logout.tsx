import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid/Grid';
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import Item from './Item';
import { Hidden } from '@mui/material';

const Logout = () => {
  const [pictures, setPictures] = useState([])



  const logUserOut = () => {
    axios.post('/auth/logout');
  }

  //change axios request to grab user photos instead
  const getPictures = () => {
    axios.get('/journey')
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
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        padding='30px'
      >
        <p>
          Thanks for playing. Hope you had a great time and created awesome memories!
        </p>
        <Carousel
          indicatorContainerProps={{style: {marginTop: '20px'}}}
        >
            {
                pictures.map( (item: any, i) => <Item key={i} item={item} /> )
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