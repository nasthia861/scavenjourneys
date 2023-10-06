import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Journey } from '../../entities/Journey';

export default class JourneySeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const journeyFactory = factoryManager.get(Journey);

        await journeyFactory.saveMany(20)
    }
}