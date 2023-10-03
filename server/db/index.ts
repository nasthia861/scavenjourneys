import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
// eslint-disable-next-line import/no-extraneous-dependencies
import{ createDatabase, SeederOptions } from 'typeorm-extension'


import { User } from './User'
import { Journey } from './Journey'
import { Step } from './Step'
import { JourneyProgress } from './JourneyProgress'
import { StepProgress } from './StepProgress'
import { JourneyTag } from './JourneyTag'
import { Likes } from './Likes'
import { Achievement } from './Achievement'
import { UserAchievement } from './UserAchievement'
// import { create } from 'axios';

  const options: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database:'scavenjourneys',
  synchronize: true,
  logging: true,
  entities: [
    User,
    Journey,
    Step,
    JourneyProgress,
    StepProgress,
    JourneyTag,
    Likes,
    Achievement,
    UserAchievement
  ]};

  const AppDataSource = new DataSource(options);
  createDatabase({options})
    .then(() => {AppDataSource.initialize()})
    .then(() => {'AppDataSource has been successfully initialized'})
    .catch((err: unknown) => console.error('AppDataSource has not been initialized', err))
      
// createDatabase({ifNotExist: true})
//   .then(() => {AppDataSource.initialize()})
//   .then(() => {'AppDataSource has been successfully initialized'})
//   .catch((err: unknown) => console.error('AppDataSource has not been initialized', err))

export default AppDataSource;
