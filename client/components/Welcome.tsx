import React from 'react';
import GoogleButton from 'react-google-button'
import Grid from '@mui/material/Grid';
import Image from 'mui-image';
import logo from '../styling/scvnjrny_logo_stacked.svg';




const Welcome: React.FC = () => {

  const googleLogin = () => {
    window.open('/auth/google', '_self');
  }
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

          <Image src={logo} width='200px' />
          <p>
            We're thrilled to have you embark on this exciting journey filled with clues, riddles, and local hidden gems. Get ready to put your problem-solving skills to the test as you follow the clues and search for locales all around. Whether you're exploring your neighborhood, a park, or a city, this scavenger hunt is designed to be a fun and challenging experience for participants of all ages.
          </p>
        <GoogleButton
          className='google-button'
          onClick={googleLogin}
        />
      </Grid>
    </div>
  )
}

export default Welcome;
