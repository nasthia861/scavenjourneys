import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

import { User } from './entities/User'
import { Journey } from './entities/Journey'
import { Step } from './entities/Step'
import { JourneyProgress } from './entities/JourneyProgress'
import { StepProgress } from './entities/StepProgress'
import { Tag } from './entities/Tag'
import { Likes } from './entities/Likes'
import { Achievement } from './entities/Achievement'
import { UserAchievement } from './entities/UserAchievement'
import { UserData } from './entities/UserData';
import { JourneyTag } from './entities/JourneyTag';
  const options: DataSourceOptions = {
  type: 'mysql',
  host: '127.0.0.1',
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
    UserAchievement,
    UserData,
    JourneyTag,
  ]};
  const AppDataSource = new DataSource(options);
  AppDataSource.initialize()
    .then(() => {'AppDataSource has been successfully initialized'})
export default AppDataSource;