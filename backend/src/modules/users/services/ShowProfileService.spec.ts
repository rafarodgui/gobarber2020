import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProviderService from './ShowProfileService';

let fakeUserRepository: FakeUsersRepository;
let showProfile: ShowProviderService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    showProfile = new ShowProviderService(fakeUserRepository);
  });

  it('should be able to show a profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'jhon@doe.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Jhon Doe');
    expect(profile.email).toBe('jhon@doe.com');
  });

  it('should not be able to show a profile of a non-existing user', async () => {
    expect(
      showProfile.execute({
        user_id: 'non-existing-token',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
