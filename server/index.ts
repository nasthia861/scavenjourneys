import express from 'express';
// import dotenv from 'dotenv-webpack';
import journeyRouter from './routes/journey';
import achievementRouter from './routes/achievements';
import stepRouter from './routes/step';
import userRouter from './routes/users';



import path from 'path';
const app = express();

const port = process.env.port || 8080;
const distPath = path.resolve(__dirname, '..', 'dist');



app.listen(port, () => {
  console.log(`listening at: http://localhost:${port}`)
})

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(distPath));

//routes
app.use('/journey', journeyRouter);
app.use('/step', stepRouter);
app.use('/user', userRouter);
app.use('/achievement', achievementRouter);