import express from 'express';
import { Achievement } from '../db/Achievement';
import AppDataSource from '../db';

const achievementRouter = express.Router();

export default achievementRouter;