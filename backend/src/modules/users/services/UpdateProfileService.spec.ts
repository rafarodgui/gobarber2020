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

    const updatedUse = await updateProfile.execute({
      user_id: user.id,
      name: 'Jhon Tre',
      email: 'jhon@tre.com',
    });

    expect(updatedUse.name).toBe('Jhon Tre');
    expect(updatedUse.email).toBe('jhon@tre.com');
  });
});
