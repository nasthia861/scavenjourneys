import express from 'express';
import { Achievement } from '../db/entities/Achievement';
import AppDataSource from '../db';

const achievementRouter = express.Router();

// get all achievements
achievementRouter.get('/', async (req, res) => {
  try {
    const achievements = await AppDataSource.getRepository(Achievement).find();
    res.json(achievements);
  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get achievement by id:
achievementRouter.get('/:id', async (req, res) => {
  const achievementId = parseInt(req.params.id);

  if (isNaN(achievementId)) {
    return res.status(400).json({ error: 'Invalid achievement ID' });
  }

  try {
    const achievement = await AppDataSource.getRepository(Achievement).findOne({ where: { id: achievementId } });

    if (!achievement) {
      return res.status(404).json({ error: 'Achievement not found' });
    }

    res.json(achievement);
  } catch (error) {
    console.error('Error fetching achievement:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get achievement by name
achievementRouter.get('/name/:name', async (req, res) => {
  const achievementName = req.params.name;

  if (!achievementName) {
    return res.status(400).json({ error: 'Invalid achievement name' });
  }

  try {
    const achievement = await AppDataSource.getRepository(Achievement).findOne({ where: { name: achievementName } });

    if (!achievement) {
      return res.status(404).json({ error: 'Achievement not found' });
    }

    res.json(achievement);
  } catch (error) {
    console.error('Error fetching achievement by name:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default achievementRouter;