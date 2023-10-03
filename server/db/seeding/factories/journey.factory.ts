import { setSeederFactory } from 'typeorm-extension';
import { Journey } from '../../entities/Journey'

export default setSeederFactory(Journey, (faker) => {
    const journey = new Journey();
    journey.name = faker.company.buzzNoun(),
    journey.description = faker.lorem.sentence(),
    journey.location = { 
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude()
    },
    journey.img_url= faker.image.url()
    return journey;
})