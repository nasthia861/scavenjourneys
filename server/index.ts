import express from 'express';
<<<<<<< HEAD
import dotenv from 'dotenv-webpack';
//require("dotenv").config();
=======
// import dotenv from 'dotenv-webpack';

import path from 'path';
>>>>>>> 018a4de37b6bd7d4e8b56b3d1b282d7d047c416e
const app = express();

const port = process.env.port || 8080;
const distPath = path.resolve(__dirname, '..', 'dist');



app.listen(port, () => {
  console.log(`listening at: http://localhost:${port}`)
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(distPath));