import express from 'express';
import { User } from "../db/entities/User";
import AppDataSource from '../db';

const userRouter = express.Router();


export default userRouter;