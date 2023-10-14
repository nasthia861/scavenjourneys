
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import session from "express-session";
import authRoutes from './routes/auth';
import journeyRouter from './routes/journey';
import achievementRouter from './routes/achievements';
import stepRouter from './routes/step';
import userRouter from './routes/users';
import tagRouter from './routes/tag';
import cloudRouter from './routes/cloudinary';
import passport from 'passport';
import { v4 as uuidv4 } from 'uuid';
import { v2 as cloudinary } from 'cloudinary'


dotenv.config();
require('./auth/passport')


const app = express();

const port = process.env.port || 8080;
const distPath = path.resolve(__dirname, '..', 'dist');


//generate a secret
let secretKey = uuidv4();

// app.use(express.json());
app.use(express.json({
  limit: '50mb'
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(distPath));

//initialize a user session
app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.authenticate('session'));




//routes
app.use('/auth', authRoutes);
app.use('/user', userRouter);
app.use('/journey', journeyRouter);
app.use('/step', stepRouter);
app.use('/achievement', achievementRouter);
app.use('/tag', tagRouter);
app.use('/cloud', cloudRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(distPath, 'index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  })
})

app.listen(port, () => {
  console.log(`listening at: http://localhost:${port}`)
})
