import 'reflect-metadata';
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


const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database:'scavenjourneys',
  synchronize: true,
  logging: false,
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
  ]
});

AppDataSource.initialize()
  .then(() => {'AppDataSource has been successfully initialized'})
  .catch((err: unknown) => console.error('AppDataSource has not been initialized', err));
  
export default AppDataSource;
