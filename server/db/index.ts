import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
// eslint-disable-next-line import/no-extraneous-dependencies
import{ createDatabase } from 'typeorm-extension'


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
  logging: true,
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
  ]
};
  
  const AppDataSource = new DataSource(options);
  AppDataSource.initialize()
    .then(() => {'AppDataSource has been successfully initialized'})
      
// createDatabase({ifNotExist: true})
//   .then(() => {AppDataSource.initialize()})
//   .then(() => {'AppDataSource has been successfully initialized'})
//   .catch((err: unknown) => console.error('AppDataSource has not been initialized', err))

export default AppDataSource;
