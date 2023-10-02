import express from 'express';
import { Step } from "../db/Step";
import AppDataSource from '../db';
const router = express.Router();

const stepRepo = AppDataSource.getRepository(Step);
const Steps = express.Router();



export default router;