import 'reflect-metadata';
import { DataSource } from 'typeorm';
// eslint-disable-next-line import/no-extraneous-dependencies
import{ createDatabase } from 'typeorm-extension';


const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 4000,
  username: 'root',
  password: '',
  database:'scavenjourneys'
});

createDatabase()
AppDataSource.initialize()
.then(async () => {await createDatabase({ifNotExist: true})})
.then(() => {'AppDataSource has been successfully initialized'})
.catch((err: unknown) => console.error('AppDataSource has not been initialized', err))

