
import dotenv from 'dotenv';
import express from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import passport from 'passport';
import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import session from "express-session";
import authRoutes from './routes/auth';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();
require('./auth/passport')

const app = express();

const port = process.env.port || 8080;
const distPath = path.resolve(__dirname, '..', 'dist');

//generate a secret
let secretKey = uuidv4();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(distPath));

//initialize a user session
app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true },
}));

app.use(passport.initialize());
app.use(passport.authenticate('session'));

//routes
app.use('/auth', authRoutes);

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
