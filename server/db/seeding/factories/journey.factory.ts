import { setSeederFactory } from 'typeorm-extension';
import { Journey } from '../../entities/Journey'

export default setSeederFactory(Journey, (faker) => {
    const journey = new Journey();
    journey.name = faker.company.buzzNoun();
    journey.description = faker.lorem.sentence();
    journey.location = { 
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude()
    };
    journey.tagId = faker.number.int({min:1, max: 5})
    journey.img_url= faker.image.url();
    journey.userId = faker.number.int({min: 1, max: 5})
    return journey;
})