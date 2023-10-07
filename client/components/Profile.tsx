import React, { useEffect, useState, useContext } from "react";
import {
  Avatar,
  Container,
  Stack,
  TextField,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { Box } from "@mui/system";
import axios from "axios";
import { User } from '../types/User'
import { myContext } from "./Context";


const Profile = () => {

  const userObj = useContext(myContext);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    setUser(userObj);
  });

  axios.get('/step/')


  // update user information
  const updateUsername = () => {
    axios.patch("/user/" + user.id, {username: user.username} )
    .then((res) => {
      setUser(res.data);
    })
    .catch((err) => {
      console.error('Could not Axios patch', err)
    });
  };



  return (
    <Container>
      <Stack spacing={1}>
      <Typography variant="h5" gutterBottom>
        {user.username}
      </Typography>


      {/* For other variants, adjust the size with `width` and `height` */}
      <Avatar
      sx={{ bgcolor: deepPurple[500],
      width: 56, height: 56 }}
      src={user.img_url}
      ></Avatar>
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
          // onChange={(e) => setUser(e.target.value)}
        />
      </Box>
      <List component="nav" aria-label="mailbox folders">
  <ListItem button>
    <ListItemText primary="Journey 1 Achievements" />
  </ListItem>
  <Divider />
  <ListItem button divider>
    <ListItemText primary="Journey 2 Achievements" />
  </ListItem>
  <ListItem button>
    <ListItemText primary="Journey 3 Achievements" />
  </ListItem>
  <Divider light />
  <ListItem button>
    <ListItemText primary="Journey 4 Achievements" />
  </ListItem>
</List>
      <Button
      variant="contained"
      size="medium"
      onClick={() => {
        updateUsername();
      }}
      >
          Update Username
        </Button>
    </Stack>
    </Container>
  )
}

export default Profile;
