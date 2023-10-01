import dotenv from 'dotenv';
import express from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import passport from 'passport';
import path from 'path';

import authRoutes from './routes/auth';

dotenv.config();

require('./auth/passport')

const app = express();

const port = process.env.port || 8080;
const distPath = path.resolve(__dirname, '..', 'dist');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(distPath));
app.use('/auth', authRoutes);
app.use(passport.initialize());

app.listen(port, () => {
  console.log(`listening at: http://localhost:${port}`)
})
