import { setSeederFactory } from 'typeorm-extension';
import { Step } from '../../entities/Step'
export default setSeederFactory(Step, (faker) => {
    const step = new Step();
    step.name = faker.company.buzzNoun();
    step.location = { 
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude()
    };
    step.journey = faker.number.int({min: 1, max: 3});
    step.user = faker.number.int({min: 1, max: 5});
    return step;
})
