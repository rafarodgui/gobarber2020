// import AppError from '@shared/errors/AppError';
import ListProviderDayAvailability from './ListProviderDayAvailability';
import FakeAppointsmentRepository from '../repositories/fakes/FakeAppointmentsRepository';

let listProviderDayAvailability: ListProviderDayAvailability;
let fakeAppointsmentRepository: FakeAppointsmentRepository;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeAppointsmentRepository = new FakeAppointsmentRepository();
    listProviderDayAvailability = new ListProviderDayAvailability(
      fakeAppointsmentRepository,
    );
  });

  it('should be able to list all appointments of the day from the provider', async () => {
    await fakeAppointsmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    const avaliability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      day: 20,
      month: 4,
      year: 2020,
    });

    expect(avaliability).toEqual(
      expect.arrayContaining([
        { day: 20, hour: 8, available: false },
        { day: 20, hour: 9, available: true },
        { day: 20, hour: 10, available: true },
      ]),
    );
  });
});
