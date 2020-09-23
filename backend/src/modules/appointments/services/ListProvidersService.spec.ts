// import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUserRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeUserRepository);
  });

  it('should be able to list all Providers', async () => {
    await fakeUserRepository.create({
      name: 'User1',
      email: 'user@1.com',
      password: '123',
    });

    await fakeUserRepository.create({
      name: 'User2',
      email: 'user@2.com',
      password: '123',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'jhon@doe.com',
      password: '123',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toBeInstanceOf(Array);
  });

  it('should not list the logged user at provider list', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123',
    });

    const user2 = await fakeUserRepository.create({
      name: 'Jhon tre',
      email: 'jhontre@example.com',
      password: '123',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'Jhon Qua',
      email: 'jhonqua@example.com',
      password: '123',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
