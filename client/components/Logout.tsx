import Grid from '@mui/material/Grid/Grid';
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import GoogleButton from 'react-google-button';
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography';
import map from '../styling/pinkMap.png'

type IHeaderProps = {
  setLoggedOut: (loggedOut: boolean) => void;
};

const Logout: React.FC<IHeaderProps> = ({setLoggedOut}) => {
  const [userId, setUserId] = useState<number>(+window.location.pathname.split('/')[2]);
  const [pictures, setPictures] = useState([]);
  //const [loggedOut, setLoggedOut] = useState<boolean | null>(false);

  //change axios request to grab user photos instead
  const getPictures = () => {
    axios.get(`/step/progress/user/${userId}`)
      .then((response) => setPictures(response.data))
      .catch((error) => console.error('could not get pictures', error))
  }

  const googleLogin = () => {
    window.open('/auth/google', '_self');
  }

  const logUserOut = () => {

    axios.post('/auth/logout')
    .then((data) => {
      if(data.data === 'loggedOut') {
        setLoggedOut(true)
      }
    })
    .catch((err) => {console.error('failed to logout', err)})
  }

  useEffect(() => {
    getPictures();
    logUserOut();
  }, [])

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
      <Box
        sx={{
          padding: '10px',
          alignContent: 'center',
          paddingTop:'100px'
        }}
      >
        <p
          style={{
            fontFamily: 'Secular One',
            fontSize: '20px',
            color: '#9e5528',
            textAlign: 'center'
          }}
        >
          <b>Thanks for playing. Hope you had a great time and created awesome memories!</b>
        </p>
        <Carousel
          sx={{
            padding: '10px',
            textAlign: 'center'
          }}
        >
            {
              pictures.map((photoData) => {
                return <img src={photoData.image_url} height='200px' width='auto' key={photoData.id}/>
              })
            }
        </Carousel>
      </Box>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        alignContent="center"
        padding='30px'
        width='100%'
      >
        <Typography>
          Still exploring?
        </Typography>
        <GoogleButton
          className='google-button'
          onClick={googleLogin}
          />
      </Grid>
    </div>
  )
}

export default Logout