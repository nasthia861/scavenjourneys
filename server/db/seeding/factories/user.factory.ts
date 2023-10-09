import { setSeederFactory } from 'typeorm-extension';
import { User } from '../../entities/User'

export default setSeederFactory(User, (faker) => {
    const user = new User();
    user.username = faker.internet.userName();
    user.img_url = faker.image.url();
    user.google_id = faker.internet.password();
    return user;
})