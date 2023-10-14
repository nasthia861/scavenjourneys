import { setSeederFactory } from 'typeorm-extension';
import { Journey } from '../../entities/Journey'

export default setSeederFactory(Journey, (faker) => {
    const journey = new Journey();
    journey.name = faker.company.buzzNoun();
    journey.description = faker.lorem.sentence();
    // New Orleans seed
    journey.latitude = faker.location.latitude(30.551418, 29.19678, 5);
    journey.longitude = faker.location.longitude(-90.03517586, -91.204131);
    //Baton Rouge seed
    // journey.latitude = faker.location.latitude(30.551418, 30.331198 ,  5);
    // journey.longitude = faker.location.longitude(-91.017364, -91.204131);
    journey.tagId = faker.number.int({min:1, max: 5});
    journey.img_url= faker.image.url();
    return journey;
})