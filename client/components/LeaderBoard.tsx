import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid/Grid';
import Stack from '@mui/material/Stack/Stack';

const Leaderboard = () => {
  const [userData, setUserData] = useState([]);
  const [orderBy, setOrderBy] = useState('journeys'); // Default order by journeys

  useEffect(() => {
    // Fetch user data ordered by the selected criterion (journeys, steps, journeysTaken, or stepsTaken)
    axios
      .get(`/userdata/userdata?orderBy=${orderBy}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching leaderboard data:', error);
      });
  }, [orderBy]);

  // Function to update the order and re-fetch data
  const handleOrderBy = (order: React.SetStateAction<string>) => {
    setOrderBy(order);
  };

  const handleChange = (event: React.MouseEvent, nextOrder: string) => {
    setOrderBy(nextOrder);
  }

  return (
    <Grid justifyContent='center' p='10px'>
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        Leaderboard
      </Typography>
      <Grid
            container
            spacing={1}
            direction="column"
            alignItems="center"
            justifyContent="center"
            padding='20px'
      >
        <ToggleButtonGroup
          exclusive
          value={orderBy}
          onChange={handleChange}
          color='secondary'
          aria-label="Small sizes"
          size='small'
          fullWidth={true}
          >
          <ToggleButton value={'journeys'}>
            Jrnys Launched
          </ToggleButton>
          <ToggleButton value={'steps'}>
            Steps Created
          </ToggleButton>
          <ToggleButton value={'journeysTaken'}>
            Jrnys Started
          </ToggleButton>
          <ToggleButton value={'stepsTaken'}>
            Steps Solved
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      {userData.map((user, index) => (
        <Box
          key={user.id}
          width="100%"
          p={2}
          border="1px solid #ccc"
          borderRadius={4}
          marginBottom={2}
          sx={{backgroundColor:'#f8e5c8'}}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar
                src={user.user?.img_url || 'default-avatar-url'}
                alt={user.user?.username || 'User Avatar'}
                sx={{height: '60px', width: 'auto'}}
              />
              <Stack>
                <Typography variant="body1">
                  {user.user?.username || 'User Name'}
                </Typography>
                <b/>
                <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '30px' }}>
                  {(() => {
                    if ((index + 1) === 1) {
                      return <img src='https://cdn.peterbarnum.com/img/bananas/mushroom-strut-banana.gif' height='50px' width='auto' style={{padding: '-30px'}}/>
                    } else {
                      return index + 1;
                    }
                  })()}
                </Typography>
              </Stack>
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {orderBy === 'journeys' ? `${user.journeysCreated}` : null}
                {orderBy === 'steps' ? `${user.stepsCreated}` : null}
                {orderBy === 'journeysTaken' ? `${user.journeysTaken}` : null}
                {orderBy === 'stepsTaken' ? `${user.stepsTaken}` : null}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Grid>
  );
};

export default Leaderboard;