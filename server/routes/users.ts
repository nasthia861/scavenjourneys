import express from 'express';
import { User } from "../db/User";
import AppDataSource from '../db';

const userRouter = express.Router();


export default userRouter;