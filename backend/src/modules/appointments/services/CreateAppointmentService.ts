import { startOfHour, isBefore, getHours, format } from 'date-fns';
import AppError from '@shared/errors/AppError';

import { injectable, inject } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

interface IRequest {
  date: Date;
  provider_id: string;
  user_id: string;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (user_id === provider_id) {
      throw new AppError('You cant book with yourself');
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError('You can book only between 8am and 5pm');
    }

    const findAppointmentsInSameDate = await this.appointmentsRepository.findByDate(
      { date: appointmentDate, provider_id },
    );

    if (findAppointmentsInSameDate) {
      throw new AppError('This date is occuped', 401);
    }

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('past dates are not permitted');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const formatDate = format(appointmentDate, "dd/MM/yyyy at' HH:mm");

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Hello, you have a new appointment at ${formatDate}`,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
