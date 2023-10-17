import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Leaderboard = () => {
  const [userData, setUserData] = useState([]);
  const [orderBy, setOrderBy] = useState('journeys'); // Default order by journeys

  useEffect(() => {
    // Fetch user data ordered by the selected criterion (journeys or steps)
    axios
      .get(`/userdata?orderBy=${orderBy}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching leaderboard data:', error);
      });
  }, [orderBy]);

  return (
    <Box p={4}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        Leaderboard
      </Typography>
      <Box display="flex" alignItems="center" justifyContent="center" gap={2} marginBottom={2}>
        <Button
          variant="contained"
          onClick={() => setOrderBy('journeys')}
        >
          Order by Journeys Created
        </Button>
        <Button
          variant="contained"
          onClick={() => setOrderBy('steps')}
        >
          Order by Steps Created
        </Button>
      </Box>
      {userData.reverse().map((user, index) => (
        <Box
          key={user.id}
          width="100%"
          p={2}
          border="1px solid #ccc"
          borderRadius={4}
          marginBottom={2}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {index + 1}.{' '}
              </Typography>
              <Avatar
                src={user.user?.img_url || 'default-avatar-url'}
                alt={user.user?.username || 'User Avatar'}
              />
              <Typography variant="body1">
                {user.user?.username || 'User Name'}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {orderBy === 'journeys' ? `Journeys Created: ${user.journeysCreated}` : null}
                {orderBy === 'steps' ? `Steps Created: ${user.stepsCreated}` : null}
              </Typography>

            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Leaderboard;