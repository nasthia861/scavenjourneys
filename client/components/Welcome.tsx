import React from 'react';
import GoogleButton from 'react-google-button'
import Grid from '@mui/material/Grid';
import Image from 'mui-image';
import logo from '../styling/scvnjrny_logo_stacked.svg';
import map from '../styling/pinkMap.png'
import Typography from '@mui/material/Typography';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const Welcome: React.FC = () => {

  const googleLogin = () => {
    window.open('/auth/google', '_self');
  }
  return (
    <div
      style={{
        backgroundImage: `url(${map})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: 'auto'
      }}
    >
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        padding='20px'
        paddingTop='80px'
      >

          <Image src={logo} width='200px' />
          <Typography
            style={{
              fontFamily: 'Secular One',
              fontSize: '20px',
              color: '#9e5528',
              textAlign: 'center'
            }}
            padding='5px'
            paragraph={true}
            fontWeight='bold'
          >
             Get ready to put your problem-solving skills to the test as you follow the clues to explore your neighborhood, your city, or locations abroad.
          </Typography>
        <GoogleButton
          className='google-button'
          onClick={googleLogin}
        />
        <Typography fontWeight='bold' >
           <InfoOutlinedIcon sx={{paddingTop: '2px'}} />This app works best on mobile
        </Typography>
      </Grid>
    </div>
  )
}

export default Welcome;
