import { setSeederFactory } from 'typeorm-extension';
import { Step } from '../../entities/Step'
export default setSeederFactory(Step, (faker) => {
    const step = new Step();
    step.name = faker.company.buzzNoun();
    step.hint = faker.lorem.sentence();
    //New Orleans seed
    step.latitude = faker.location.latitude(30.551418, 29.19678, 5);
    step.longitude = faker.location.longitude(-90.03517586, -91.204131);
    //Baton Rouge seed
    // step.latitude = faker.location.latitude(30.551418, 30.331198 ,  5);
    // step.longitude = faker.location.longitude(-91.017364, -91.204131);
    step.journeyId = faker.number.int({min:1, max: 20})
    return step;
})
