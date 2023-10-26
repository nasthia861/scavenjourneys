import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { myContext } from "./Context";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';

const Achievements = () => {
  //grabs user data from params
  const [userId, setUserId] = useState<number | null>(parseInt(useParams().UserId));
  const [achievements, setAchievements] = useState([]);
  const [earnedAchievements, setEarnedAchievements] = useState([]);
  const [clickedAchievement, setClickedAchievement] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAchievementClick = (achievement: any, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setClickedAchievement(achievement);
    setAnchorEl(event.currentTarget);
  };

  const closeAchievementClick = () => {
    setClickedAchievement(null);
    setAnchorEl(null);
  };

  useEffect(() => {
    axios.get('/achievement')
      .then((response) => {
        const allAchievements = response.data;
        setAchievements(allAchievements);

        axios.get(`/userachievements/byUserId/${userId}`)
          .then((earnedAchievementsResponse) => {
            const userEarnedAchievements = earnedAchievementsResponse.data;
            setEarnedAchievements(userEarnedAchievements);
          })
          .catch((error) => {
            console.error('Error fetching earned achievements:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching achievements:', error);
      });
  }, [userId]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Achievements
      </Typography>
      <Grid container spacing={3}>
        {achievements.map((achievement) => (
          <Grid item key={achievement.id} xs={12} sm={6} md={4} lg={3}>
            <Tooltip title={achievement.conditionText}>
              <Paper
                elevation={3}
                className={`achievement-box ${
                  earnedAchievements.some((earnedAchievement) => earnedAchievement.achievement.id === achievement.id)
                    ? 'earned'
                    : 'unearned'
                }
                `}
              >
                <Avatar
                  alt={achievement.name}
                  src={
                    earnedAchievements.some((earnedAchievement) => earnedAchievement.achievement.id === achievement.id)
                      ? achievement.icon_url
                      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXtj2yTlGQsSFEbsm6qejwdNw0766Z_qfTPA&usqp=CAU'
                  }
                  sx={{ width: 100, height: 100 }}
                  onClick={(event) => handleAchievementClick(achievement, event)}
                />
                <Typography variant="h6">{achievement.name}</Typography>
                <Typography variant="subtitle1">
                  {earnedAchievements.some((earnedAchievement) => earnedAchievement.achievement.id === achievement.id)
                    ? `Achieved on: ${new Date(earnedAchievements.find((earnedAchievement) => earnedAchievement.achievement.id === achievement.id).createdAt).toDateString()}`
                    : 'Not yet achieved'}
                </Typography>
              </Paper>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={closeAchievementClick}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {clickedAchievement && clickedAchievement.conditionText}
      </Popover>
    </Container>
  );
};

export default Achievements;