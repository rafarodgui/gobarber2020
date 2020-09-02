import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
// import AppError from '@shared/errors/AppError';
import ResetPasswordService from './ResetPasswordService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeUserRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    resetPassword = new ResetPasswordService(
      fakeUserRepository,
      fakeUserTokensRepository,
    );
  });

  it('should be able to reset password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Test',
      email: 'test@test.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    await resetPassword.execute({
      password: '123123',
      token,
    });

    const updatedUser = await fakeUserRepository.findById(user.id);

    expect(updatedUser?.password).toBe('123123');
  });
});
