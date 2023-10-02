import 'reflect-metadata';
<<<<<<< HEAD
// eslint-disable-next-line import/no-extraneous-dependencies
// import{ createDatabase } from 'typeorm-extension'
import { DataSource } from 'typeorm';


import { User } from './User'
import { Journey } from './Journey'
import { Step } from './Step'
import { JourneyProgress } from './JourneyProgress'
import { StepProgress } from './StepProgress'
import { JourneyTag } from './JourneyTag'
import { Likes } from './Likes'
import { Achievement } from './Achievement'
import { UserAchievement } from './UserAchievement'
=======
import { DataSource, DataSourceOptions } from 'typeorm';
// eslint-disable-next-line import/no-extraneous-dependencies


>>>>>>> 8c1054a674fa56f62f9505853d599e86383ec159

import { User } from './entities/User'
import { Journey } from './entities/Journey'
import { Step } from './entities/Step'
import { JourneyProgress } from './entities/JourneyProgress'
import { StepProgress } from './entities/StepProgress'
import { Tag } from './entities/Tag'
import { Likes } from './entities/Likes'
import { Achievement } from './entities/Achievement'
import { UserAchievement } from './entities/UserAchievement'

  const options: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database:'journeys',
  synchronize: true,
  logging: false,
  entities: [
    User,
    Journey,
    Step,
    JourneyProgress,
    StepProgress,
    Tag,
    Likes,
    Achievement,
    UserAchievement
  ]};

<<<<<<< HEAD
AppDataSource.initialize()
  .then(() => {'AppDataSource has been successfully initialized'})
  .catch((err: unknown) => console.error('AppDataSource has not been initialized', err));
  
=======
  const AppDataSource = new DataSource(options);
  AppDataSource.initialize()
    .then(() => {'AppDataSource has been successfully initialized'})
      

>>>>>>> 8c1054a674fa56f62f9505853d599e86383ec159
export default AppDataSource;
