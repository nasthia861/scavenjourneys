import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid/Grid';
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import Item from './Item';
import GoogleButton from 'react-google-button';
import Box from '@mui/material/Box/Box';

const Logout = () => {
  const [pictures, setPictures] = useState([])


  //change axios request to grab user photos instead
  const getPictures = () => {
    axios.get('/journey')
      .then((response) => setPictures(response.data))
      .catch((error) => console.error('could not get pictures'))
  }

  const googleLogin = () => {
    window.open('/auth/google', '_self');
  }

  useEffect(() => {
    getPictures();
  }, [])

  return (
    <div>
      <Box

        alignItems="center"
        justifyContent="center"
        padding='30px'
        width='100%'
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
      </Box>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        padding='30px'
        width='100%'
      >
        <p>
          Still have some exploring to do?
        </p>
        <GoogleButton
          className='google-button'
          onClick={googleLogin}
          />
      </Grid>
    </div>
  )
}

export default Logout