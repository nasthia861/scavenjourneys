import express from 'express';
import { Achievement } from '../db/entities/Achievement';
import AppDataSource from '../db';

const achievementRouter = express.Router();

export default achievementRouter;