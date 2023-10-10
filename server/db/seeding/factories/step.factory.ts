import { setSeederFactory } from 'typeorm-extension';
import { Step } from '../../entities/Step'
export default setSeederFactory(Step, (faker) => {
    const step = new Step();
    step.name = faker.company.buzzNoun();
    step.hint = faker.company.buzzNoun();
    step.location = {
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude()
    };
    step.journeyId = faker.number.int({min: 1, max: 20});
    //step.userId = faker.number.int({min: 1, max: 5});
    return step;
})
