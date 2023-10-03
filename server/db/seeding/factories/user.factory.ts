import { setSeederFactory } from 'typeorm-extension';
import { User } from '../../entities/User'

export default setSeederFactory(User, (faker) => {
    const user = new User();
    user.username = faker.person.firstName();
    user.img_url = faker.image.url()
    return user;
})