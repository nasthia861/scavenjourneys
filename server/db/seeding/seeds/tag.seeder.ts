import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Tag } from '../../entities/Tag';

export default class TagSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const repository = dataSource.getRepository(Tag);
        await repository.insert([
            {name: 'All'},
            {name: 'Family Friendly'},
            {name: 'Drinking'},
            {name: 'Nature'},
            {name: 'Holiday'},
            {name: 'Solo'},
        ])
        // const tagFactory = factoryManager.get(Tag);

        // await tagFactory.saveMany(10)

    }
}