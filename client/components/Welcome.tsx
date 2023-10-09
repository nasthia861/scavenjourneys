import React from 'react';
import GoogleButton from 'react-google-button'
import { Typography } from '@mui/material';

const Welcome = () => {

  const googleLogin = () => {
    window.open('http://localhost:8080/auth/google', '_self');
  }
  return (
    <div>
      <Typography
      variant='h5'
      gutterBottom
      >
        Welcome to ScavenJourney
      </Typography>
        <GoogleButton
          label='Google Sign In'
          onClick={googleLogin}
      />
     {/* <NavBar menuItems={[]} /> */}
    </div>
  )
}

export default Welcome;