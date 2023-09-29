import express from 'express';
import dotenv from 'dotenv-webpack';


const app = express();

const port = process.env.port || 8080;


app.listen(port, () => {
  console.log(`listening at:${port}`)
})