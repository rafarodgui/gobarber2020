import { startOfHour, isBefore } from 'date-fns';
import AppError from '@shared/errors/AppError';

import { injectable, inject } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

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
  ) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentsInSameDate = await this.appointmentsRepository.findByDate(
      { date: appointmentDate, provider_id },
    );

    console.log(findAppointmentsInSameDate);

    if (findAppointmentsInSameDate) {
      throw new AppError('This date is occuped', 401);
    }

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('past dates are not permitted');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: new Date(),
    });

    return appointment;
  }
}

export default CreateAppointmentService;
