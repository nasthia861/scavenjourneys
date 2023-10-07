import React from 'react';
import GoogleButton from 'react-google-button'
import { Typography } from '@mui/material';

const Welcome = () => {
  return (
    <div>
      <Typography
      variant='h5'
      gutterBottom
      >
        Welcome to ScavenJourney
      </Typography>
     <a href='/auth/google'>
        <GoogleButton
          label='Google Sign In'
          onClick={() => { console.log('Google button clicked') }}
      />

     </a>
     {/* <NavBar menuItems={[]} /> */}
    </div>
  )
}

export default Welcome;