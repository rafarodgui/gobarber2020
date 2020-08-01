import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Jhon Doe',
      email: 'jd@hotmail.com',
      password: '123',
    });

    expect(user).toHaveProperty('id');

    return user;
  });

  it('should not be ablle to create a new user with the same e-mail from another', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Jhon Doe',
      email: 'jd@hotmail.com',
      password: '123',
    });

    expect(
      createUser.execute({
        name: 'Jhon Doe',
        email: 'jd@hotmail.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);

    return user;
  });
});
