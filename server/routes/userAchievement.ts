import express from 'express';
import { UserAchievement } from '../db/entities/UserAchievement';
import AppDataSource from '../db';
import { error } from 'console';

const userAchievementsRouter = express.Router();

// Create a new user achievement
userAchievementsRouter.post('/', async (req, res) => {
  try {
    // const { userID, achievementID } = req.body;

    // // Check if a user achievement with the same userID and achievementID already exists
    // const existingUserAchievement = await AppDataSource.getRepository(UserAchievement).findOne({
    //   where: {
    //     user: { id: userID },
    //     achievement: { id: achievementID },
    //   },
    // });

    // if (existingUserAchievement) {
    //   console.error("woah there bucko, they already have that achievement: ", existingUserAchievement, req.body, error)
    //   // Return the existing achievement if found
    //   res.json(existingUserAchievement);
    // } else {
      // Create a new user achievement if it doesn't exist
      const newUserAchievement = AppDataSource.getRepository(UserAchievement).create(req.body);
      const result = await AppDataSource.getRepository(UserAchievement).save(newUserAchievement);
      res.json(result);
    // }
  } catch (error) {
    console.error('Error creating user achievement:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all user achievements
userAchievementsRouter.get('/', async (req, res) => {
  try {
    const userAchievements = await AppDataSource.getRepository(UserAchievement).find();
    res.json(userAchievements);
  } catch (error) {
    console.error('Error fetching user achievements:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a user achievement by ID
userAchievementsRouter.get('/:id', async (req, res) => {
  const userAchievementId = parseInt(req.params.id);

  if (isNaN(userAchievementId)) {
    return res.status(400).json({ error: 'Invalid user achievement ID' });
  }

  try {
    const userAchievement = await AppDataSource.getRepository(UserAchievement).findOne({ where: { id: userAchievementId } });

    if (!userAchievement) {
      return res.status(404).json({ error: 'User achievement not found' });
    }

    res.json(userAchievement);
  } catch (error) {
    console.error('Error fetching user achievement:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// // Update a user achievement by ID
// userAchievementsRouter.put('/:id', async (req, res) => {
//   const userAchievementId = parseInt(req.params.id);

//   if (isNaN(userAchievementId)) {
//     return res.status(400).json({ error: 'Invalid user achievement ID' });
//   }

//   try {
//     const userAchievementRepository = AppDataSource.getRepository(UserAchievement);
//     const existingUserAchievement = await userAchievementRepository.findOne({ where: { id: userAchievementId } });

//     if (!existingUserAchievement) {
//       return res.status(404).json({ error: 'User achievement not found' });
//     }

//     // Update the user achievement properties based on req.body
//     userAchievementRepository.merge(existingUserAchievement, req.body);
//     const updatedUserAchievement = await userAchievementRepository.save(existingUserAchievement);
//     res.json(updatedUserAchievement);
//   } catch (error) {
//     console.error('Error updating user achievement:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// Delete a user achievement by ID
userAchievementsRouter.delete('/:id', async (req, res) => {
  const userAchievementId = parseInt(req.params.id);

  if (isNaN(userAchievementId)) {
    return res.status(400).json({ error: 'Invalid user achievement ID' });
  }

  try {
    const userAchievementRepository = AppDataSource.getRepository(UserAchievement);
    const existingUserAchievement = await userAchievementRepository.findOne({ where: { id: userAchievementId } });

    if (!existingUserAchievement) {
      return res.status(404).json({ error: 'User achievement not found' });
    }

    await userAchievementRepository.remove(existingUserAchievement);
    res.json({ message: 'User achievement deleted successfully' });
  } catch (error) {
    console.error('Error deleting user achievement:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all user achievements associated with a specific userID
userAchievementsRouter.get('/byUserId/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId);

  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const userAchievements = await AppDataSource.getRepository(UserAchievement).find({
      relations: ["user", "achievement"],
      where: { user: { id: userId} },
    });
    res.json(userAchievements);
  } catch (error) {
    console.error('Error fetching user achievements by userID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all user achievements associated with a specific achievementID
userAchievementsRouter.get('/byAchievementId/:achievementId', async (req, res) => {
  const achievementId = parseInt(req.params.achievementId);

  if (isNaN(achievementId)) {
    return res.status(400).json({ error: 'Invalid achievement ID' });
  }

  try {
    const userAchievements = await AppDataSource.getRepository(UserAchievement).find({
      where: { achievement: { id: achievementId} },
    });
    res.json(userAchievements);
  } catch (error) {
    console.error('Error fetching user achievements by achievementID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default userAchievementsRouter;
