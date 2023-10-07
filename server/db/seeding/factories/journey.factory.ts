import { setSeederFactory } from 'typeorm-extension';
import { Journey } from '../../entities/Journey'

export default setSeederFactory(Journey, (faker) => {
    const journey = new Journey();
    journey.name = faker.company.buzzNoun();
    journey.description = faker.lorem.sentence();
    journey.latitude = faker.location.latitude(30.03526000, 29.19678, 5);
    journey.longitude = faker.location.longitude(-90.03517586, -90.15188);
    journey.tagId = faker.number.int({min:1, max: 5});
    journey.img_url= faker.image.url();
    journey.userId = faker.number.int({min: 1, max: 5});
    return journey;
})