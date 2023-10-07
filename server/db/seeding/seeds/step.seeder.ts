import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Step } from '../../entities/Step';


export default class StepSeeder implements Seeder {
  public async run(
      dataSource: DataSource,
      factoryManager: SeederFactoryManager
  ): Promise<any> {
      const stepFactory = factoryManager.get(Step);

      await stepFactory.saveMany(100)
  }
}