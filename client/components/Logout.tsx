import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid/Grid';
import axios from 'axios'
import React from 'react'
import Carousel from 'react-material-ui-carousel'
import Item from './Item';

const Logout = () => {

  let items = [
    {photo: 'This is photo 1'},
    {photo: 'This is photo 2'},
    {photo: 'This is photo 3'},
    {photo: 'This is photo 4'},
    {photo: 'This is photo 5'},
    {photo: 'This is photo 6'},

  ]

  const logUserOut = () => {
    axios.post('/auth/logout');
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
        <p>
          Thanks for playing. Hope you had a great time and created awesome memories!
        </p>
        <Carousel
          indicatorContainerProps={{style: {marginTop: '20px'}}}
        >
            {
                items.map( (item: any, i) => <Item key={i} item={item} /> )
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