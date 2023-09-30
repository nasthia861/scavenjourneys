import express from 'express';
//import dotenv from 'dotenv-webpack';
require("dotenv").config();

const path = require('path');
const app = express();

const port = process.env.port || 8080;
const distPath = path.resolve(__dirname, '..', 'dist');



app.listen(port, () => {
  console.log(`listening at: http://localhost:${port}`)
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(distPath));