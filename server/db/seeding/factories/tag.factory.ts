import { setSeederFactory } from 'typeorm-extension';
import { Tag } from '../../entities/Tag'

export default setSeederFactory(Tag, (faker) => {
    const tag = new Tag();
    tag.name = faker.company.buzzVerb();
    return tag;
})