import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import UpdateProfileService from './UpdateProfileService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'jhon@doe.com',
      password: '123456',
    });

    if (!user) {
      throw new AppError('User not found');
    }

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jhon Tre',
      email: 'jhon@tre.com',
    });

    expect(updatedUser.name).toBe('Jhon Tre');
    expect(updatedUser.email).toBe('jhon@tre.com');
  });

  it('should not be able to change e-mail if is another user with it', async () => {
    await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'jhon@doe.com',
      password: '123456',
    });

    const user = await fakeUserRepository.create({
      name: 'Test',
      email: 'test@test.com',
      password: '123456',
    });

    if (!user) {
      throw new AppError('User does not exist');
    }

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Test',
        email: 'jhon@doe.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to reset password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'jhon@doe.com',
      password: 'currentPassword',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jhon Doe',
      email: 'jhon@doe.com',
      oldPassword: 'currentPassword',
      password: 'newPassword',
    });

    expect(updatedUser.password).toBe('newPassword');
  });

  it('should not be able to reset password without provide the old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'jhon@doe.com',
      password: 'currentPassword',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jhon Doe',
        email: 'jhon@doe.com',
        password: 'newPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
