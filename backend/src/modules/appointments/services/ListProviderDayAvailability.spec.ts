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
      date: new Date(2020, 4, 20, 13, 0, 0),
    });

    await fakeAppointsmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 16, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
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
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 12, available: true },
        { hour: 13, available: false },
        { hour: 16, available: false },
      ]),
    );
  });
});
