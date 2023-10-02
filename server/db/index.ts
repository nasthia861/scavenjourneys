import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
// eslint-disable-next-line import/no-extraneous-dependencies
import{ createDatabase, runSeeders, SeederOptions, dropDatabase } from 'typeorm-extension'


import { User } from './entities/User'
import { Journey } from './entities/Journey'
import { Step } from './entities/Step'
import { JourneyProgress } from './entities/JourneyProgress'
import { StepProgress } from './entities/StepProgress'
import { JourneyTag } from './entities/JourneyTag'
import { Likes } from './entities/Likes'
import { Achievement } from './entities/Achievement'
import { UserAchievement } from './entities/UserAchievement'
import UserSeeder from './seeding/seeds/user.seeder'
import UserFactory from './seeding/factories/user.factory';

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
  ]
};
  
  const AppDataSource = new DataSource(options);
  dropDatabase({options})
    .then(() => createDatabase({options}))
    .then(() => {AppDataSource.initialize()})
    .then(() => runSeeders(AppDataSource, {
      seeds: [UserSeeder],
      factories: [UserFactory]
    }))
    .then(() => {'AppDataSource has been successfully initialized'})
      
// createDatabase({ifNotExist: true})
//   .then(() => {AppDataSource.initialize()})
//   .then(() => {'AppDataSource has been successfully initialized'})
//   .catch((err: unknown) => console.error('AppDataSource has not been initialized', err))

export default AppDataSource;
