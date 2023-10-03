import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Journey } from '../../entities/Journey';

export default class JourneySeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const JourneyFactory = await factoryManager.get(Journey);

        await factoryManager(User)()
        .map(async (user) => {
          user.journey = users[Math.floor(Math.random() * users.length)];
          return post;
        })
        .createMany(100);

        await JourneyFactory.saveMany(5);
    }
}