import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card/Card';

type IHeaderProps = {
  userId: number
};

const Achievements: React.FC<IHeaderProps> = ({userId}) => {
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
    <Grid>
      <Typography variant="h6" gutterBottom fontWeight='bold' >
        Badges
      </Typography>
      <Grid container spacing={3}>
        {achievements.map((achievement) => (
          <Grid item key={achievement.id} xs={12} sm={6} md={4} lg={3} >
            <Tooltip title={achievement.conditionText}>
                <Card
                  elevation={3}
                  onClick={(event) => handleAchievementClick(achievement, event)}
                  sx={{padding: '10px', background: '#f8e5c8'}}
                  className={`achievement-box ${
                    earnedAchievements.some((earnedAchievement) => earnedAchievement.achievement.id === achievement.id)
                      ? 'earned'
                      : 'unearned'
                  }
                  `}
                >
                  <Grid
                    container
                    direction='column'
                    justifyContent="space-evenly"
                    alignItems="center"
                  >
                  <Avatar
                    alt={achievement.name}
                    src={
                      earnedAchievements.some((earnedAchievement) => earnedAchievement.achievement.id === achievement.id)
                        ? achievement.icon_url
                        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXtj2yTlGQsSFEbsm6qejwdNw0766Z_qfTPA&usqp=CAU'
                    }
                    sx={{ width: 90, height: 90 }}
                    onClick={(event) => handleAchievementClick(achievement, event)}
                  />
                  <Typography variant="body2" fontWeight='bold' >{achievement.name}</Typography>
                  {/* <Typography variant="subtitle1">
                    {earnedAchievements.some((earnedAchievement) => earnedAchievement.achievement.id === achievement.id)
                      ? `Achieved on: ${new Date(earnedAchievements.find((earnedAchievement) => earnedAchievement.achievement.id === achievement.id).createdAt).toDateString()}`
                      : 'Not yet achieved'}
                  </Typography> */}
                  </Grid>
                </Card>
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
    </Grid>
  );
};

export default Achievements;