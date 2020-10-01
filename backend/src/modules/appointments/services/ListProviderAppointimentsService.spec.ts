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
    const appointment1 = await fakeAppointsmentRepository.create({
      provider_id: 'provider_id',
      user_id: '123',
      date: new Date(2020, 9, 1, 8, 0, 0),
    });

    const appointment2 = await fakeAppointsmentRepository.create({
      provider_id: 'provider_id',
      user_id: '123',
      date: new Date(2020, 9, 1, 10, 0, 0),
    });

    const appointment3 = await fakeAppointsmentRepository.create({
      provider_id: 'provider_id',
      user_id: '123',
      date: new Date(2020, 9, 1, 16, 0, 0),
    });

    const appointmentsFromProvider = await listProviderAppointments.execute({
      provider_id: 'provider_id',
      day: 1,
      month: 10,
      year: 2020,
    });

    expect(appointmentsFromProvider).toEqual([
      appointment1,
      appointment2,
      appointment3,
    ]);
  });
});
