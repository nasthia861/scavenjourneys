import React, { useState, MouseEvent } from 'react';
import GoogleButton from 'react-google-button'
import Grid from '@mui/material/Grid';
import Image from 'mui-image';
import logo from '../styling/scvnjrny_logo_stacked.svg';
import map from '../styling/pinkMap.png'
import Typography from '@mui/material/Typography';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Popover from '@mui/material/Popover';

const Welcome: React.FC = () => {

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handlePopoverClose = () => {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);

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

          <Image src={logo} width='200px' sx={{paddingBottom: '10px'}} />
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
        <Typography fontWeight='bold'
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          padding='10px'
         >
           <InfoOutlinedIcon sx={{paddingTop: '2px'}} />This app works best on mobile
        </Typography>
        <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>Due to browser compatibility and location services</Typography>
      </Popover>
      <GoogleButton
          className='google-button'
          onClick={googleLogin}
        />
      </Grid>
    </div>
  )
}

export default Welcome;
