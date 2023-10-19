import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid/Grid';
import axios from 'axios'
import React from 'react'

const Logout = () => {

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
      >
        <p>
          Thanks for playing. Hope you had a great time and created awesome memories!
        </p>
        <Button
          variant='outlined'
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