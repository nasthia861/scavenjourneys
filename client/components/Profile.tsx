import React from 'react';
import { Avatar, Container, Stack, TextField, Typography, Button, List, ListItem, ListItemText, Divider} from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { Box } from '@mui/system';
import axios from 'axios';

const Profile = () => {

  const updateUsername = () => {
    axios.patch('')
  }

  axios.get('/step/')

  return (
    <Container>
      <Stack spacing={1}>
      <Typography variant="h5" gutterBottom>
        Profile
      </Typography>


      {/* For other variants, adjust the size with `width` and `height` */}
      <Avatar sx={{ bgcolor: deepPurple[500],  width: 56, height: 56 }}>H</Avatar>
      <Box
       component='form'
       sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
       >
      <TextField
          id="outlined-basic"
          label="Username"
        />
      </Box>
      <List component="nav" aria-label="mailbox folders">
  <ListItem button>
    <ListItemText primary="Journey 1" />
  </ListItem>
  <Divider />
  <ListItem button divider>
    <ListItemText primary="Journey 2" />
  </ListItem>
  <ListItem button>
    <ListItemText primary="Journey 3" />
  </ListItem>
  <Divider light />
  <ListItem button>
    <ListItemText primary="Journey 4" />
  </ListItem>
</List>
      <Button variant="contained" size="medium">
          Update Username
        </Button>
    </Stack>
    </Container>
  )
}

export default Profile;