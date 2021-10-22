import { User } from '../../users/user.entity';

const stubUser = new User();
stubUser.id = 1;
stubUser.email = 'test@test.com';
stubUser.password = 'password';
stubUser.name = 'test';

export { stubUser };
