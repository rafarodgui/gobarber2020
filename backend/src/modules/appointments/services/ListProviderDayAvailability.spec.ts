// import AppError from '@shared/errors/AppError';
import ListProviderDayAvailability from './ListProviderDayAvailability';
import FakeAppointsmentRepository from '../repositories/fakes/FakeAppointmentsRepository';

let listProviderDayAvailability: ListProviderDayAvailability;
let fakeAppointsmentRepository: FakeAppointsmentRepository;

describe('List provider day availability', () => {
  beforeEach(() => {
    fakeAppointsmentRepository = new FakeAppointsmentRepository();
    listProviderDayAvailability = new ListProviderDayAvailability(
      fakeAppointsmentRepository,
    );
  });

  it('should be able to list all the day availability of the provider', async () => {
    await fakeAppointsmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointsmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    const avaliability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(avaliability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ]),
    );
  });
});
