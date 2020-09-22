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

  it('should not be able to update profile of a non-existing user', async () => {
    expect(
      updateProfile.execute({
        user_id: 'non-existing-user',
        name: 'Jhon Tre',
        email: 'jhon@tre.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
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
      password: 'current-password',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jhon Doe',
      email: 'jhon@doe.com',
      old_password: 'current-password',
      password: 'new-password',
    });

    expect(updatedUser.password).toBe('new-password');
  });

  it('should not be able to reset password without provide the old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'jhon@doe.com',
      password: 'current-password',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jhon Doe',
        email: 'jhon@doe.com',
        password: 'new-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password if the old one provided is wrong', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'jhon@doe.com',
      password: 'old-password',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jhon Doe',
        email: 'jhon@doe.com',
        old_password: 'wrong-old-password',
        password: 'new-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
