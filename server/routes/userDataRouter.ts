import express from 'express';
import { UserData } from '../db/entities/UserData';
import AppDataSource from '../db';

const userDataRouter = express.Router();

// Create new user data
userDataRouter.post('/', async (req, res) => {
  try {
    const newUserData = AppDataSource.getRepository(UserData).create(req.body);
    const result = await AppDataSource.getRepository(UserData).save(newUserData);
    res.json(result);
  } catch (error) {
    console.error('Error creating user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all user data
userDataRouter.get('/', async (req, res) => {
  try {
    const userData = await AppDataSource.getRepository(UserData).find({
      relations: {
        user: true
      }
    });
    res.json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get user data by userID
userDataRouter.get('/byUserId/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId);

  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const userData = await AppDataSource.getRepository(UserData).findOne({ where: { user: { id: userId} } });

    if (!userData) {
      return res.status(404).json({ error: 'User data not found' });
    }

    res.json(userData);
  } catch (error) {
    console.error('Error fetching user data by userID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get user data by ID
userDataRouter.get('/id/:id', async (req, res) => {
  const userDataId = parseInt(req.params.id);

  if (isNaN(userDataId)) {
    return res.status(400).json({ error: 'Invalid user data ID' });
  }

  try {
    const userData = await AppDataSource.getRepository(UserData).findOne({ where: { id: userDataId } });

    if (!userData) {
      return res.status(404).json({ error: 'User data not found' });
    }

    res.json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get user data with optional sorting
userDataRouter.get('/userdata', async (req, res) => {
  const orderBy = req.query.orderBy || 'default';

  // Add logic to handle different sorting criteria
  try {
    let userData;
    if (orderBy === 'journeys') {
      userData = await AppDataSource.getRepository(UserData).find({
        relations: {
          user: true
        },
        order: {
          journeysCreated: 'DESC',
        },
      });
    } else if (orderBy === 'steps') {
      userData = await AppDataSource.getRepository(UserData).find({
        relations: {
          user: true
        },
        order: {
          stepsCreated: 'DESC',
        },
      });
    } else if (orderBy === 'journeysTaken') {
      userData = await AppDataSource.getRepository(UserData).find({
        relations: {
          user: true
        },
        order: {
          journeysTaken: 'DESC',
        },
      });
    } else if (orderBy === 'stepsTaken') {
      userData = await AppDataSource.getRepository(UserData).find({
        relations: {
          user: true
        },
        order: {
          stepsTaken: 'DESC',
        },
      });
    } else {
      // Handle the default sorting or invalid values
      userData = await AppDataSource.getRepository(UserData).find({
        relations: {
          user: true
        },
      });
    }
    if (!userData) {
      return res.status(404).json({ error: 'User data not found' });
    }

    res.json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Update user data by ID
userDataRouter.put('/:id', async (req, res) => {
  const userDataId = parseInt(req.params.id);

  if (isNaN(userDataId)) {
    return res.status(400).json({ error: 'Invalid user data ID' });
  }

  try {
    const userDataRepository = AppDataSource.getRepository(UserData);
    const existingUserData = await userDataRepository.findOne({ where: { id: userDataId } });

    if (!existingUserData) {
      return res.status(404).json({ error: 'User data not found' });
    }

    userDataRepository.merge(existingUserData, req.body);
    const updatedUserData = await userDataRepository.save(existingUserData);
    res.json(updatedUserData);
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default userDataRouter;