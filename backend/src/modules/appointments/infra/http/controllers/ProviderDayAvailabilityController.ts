import { container } from 'tsyringe';
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';
import { Request, Response } from 'express';

export default class ProviderDayAvailabilityController {
  public async execute(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listProviderDayAvailabilityService = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const { provider_id } = request.params;
    const { day, month, year } = request.body;

    const listDayAvailability = await listProviderDayAvailabilityService.execute(
      {
        provider_id,
        day,
        month,
        year,
      },
    );

    return response.json(listDayAvailability);
  }
}
