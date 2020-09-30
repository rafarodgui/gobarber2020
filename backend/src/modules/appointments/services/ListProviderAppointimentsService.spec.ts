// import AppError from '@shared/errors/AppError';
import ListProviderAppointments from './ListProviderAppointimentsService';
import FakeAppointsmentRepository from '../repositories/fakes/FakeAppointmentsRepository';

let listProviderAppointments: ListProviderAppointments;
let fakeAppointsmentRepository: FakeAppointsmentRepository;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeAppointsmentRepository = new FakeAppointsmentRepository();
    listProviderAppointments = new ListProviderAppointments(
      fakeAppointsmentRepository,
    );
  });

  it('should be able to list all appointments of the provider', async () => {
    await fakeAppointsmentRepository.create({
      provider_id: 'user',
      user_id: '123',
      date: new Date(2022, 4, 20, 8, 0, 0),
    });

    const appointmentsFromProvider = await listProviderAppointments.execute({
      provider_id: 'provider_id',
      day: 30,
      month: 9,
      year: 2020,
    });

    expect(appointmentsFromProvider).toEqual(
      expect.arrayContaining([{ provider_id: 'provider_id' }]),
    );
  });
});
