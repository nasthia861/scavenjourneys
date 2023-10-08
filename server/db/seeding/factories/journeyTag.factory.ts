import { setSeederFactory } from 'typeorm-extension';
import { JourneyTag } from '../../entities/Journey_Tag'

export default setSeederFactory(JourneyTag, (faker) => {
    const journeyTag = new JourneyTag();
    journeyTag.journeyId = faker.number.int({min: 1, max: 20});
    journeyTag.tagId = faker.number.int({min: 1, max: 5});
    return journeyTag;
})