import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    createAppointment = new CreateAppointmentService(fakeAppointmentRepository);
  });

  it('should be able to create a new appointmet', async () => {
    fakeAppointmentRepository = new FakeAppointmentRepository();

    createAppointment = new CreateAppointmentService(fakeAppointmentRepository);

    const appointment = await createAppointment.execute({
      date: new Date(),
      user_id: '123',
      provider_id: '1234567',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1234567');
  });

  it('should not be able to create two appointments on the same date', async () => {
    const appointmentDate = new Date(2022, 7, 28, 11);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: '123',
      provider_id: '1234567',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: '123',
        provider_id: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create appointments on the past date', async () => {
    const appointmentDate = new Date('2020-05-08T00:54:49.080Z');

    expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: '123',
        provider_id: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
