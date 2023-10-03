import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../entities/User';
import { Journey } from '../../entities/Journey';

export default class UserSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const userFactory = await factoryManager.get(User)
        //const JourneyFactory = await factoryManager.get(Journey);

        await userFactory.saveMany(5)
        .then((user) => user.map(async (user) => {
          Journey.user_id = users[Math.floor(Math.random() * users.length)];
          return post;
        })
        .createMany(100);
        )
        await JourneyFactory.saveMany(5);

    }
}