import express from 'express'
// eslint-disable-next-line import/no-extraneous-dependencies
import session from "express-session";

const app = express();

app.use(session({
  secret: '',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}));

