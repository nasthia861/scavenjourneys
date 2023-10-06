import React, { useEffect, useState } from "react";
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

//need to create state for userID
const userId = "1"

const Profile = () => {

  const [user, setUser] = useState({})
  const [username, setUsername] = useState("ddmcdona1906")

  // Fetch user by id
  const getUser = (userId: string) => {
    axios.get('/user' + userId)
    .then((res) => {
      setUser(res.data);
  })
  .catch((err)=> {
    console.error('Could not Axios get user', err)
  });
}

//update user information
const updateUsername = () => {
  axios.patch("/user" + userId, {username: username} )
  .then((res) => {
      setUser(res.data);
    })
    .catch((err) => {
      console.error('Could not Axios patch', err)
    });
  };

  useEffect(() => {
    getUser(userId);
  })

  return (

    <Container>
      <Stack spacing={1}>
        <Typography variant="h5" gutterBottom>
          {username} Profile
        </Typography>
        <Avatar
        sx={{ bgcolor: deepPurple[500], width: 56, height: 56 }}
        // src={user.img_url}
        />
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
          id="outlined-basic"
          label="Username"
          onChange={(e) => setUsername(e.target.value)}
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
        <Button
        variant="contained"
        size="medium"
        onClick={() => { updateUsername() }}
        >
          Update Username
        </Button>
      </Stack>
    </Container>
  );
};

export default Profile;
