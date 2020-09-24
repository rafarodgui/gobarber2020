import { container } from 'tsyringe';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailability';
import { Request, Response } from 'express';

export default class AvailabilityController {
  public async execute(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listProviderMonthAvailabilityService = container.resolve(
      ListProviderMonthAvailabilityService,
    );

    const provider_id = request.user.id;
    const { month, year } = request.body;

    const listAvailability = await listProviderMonthAvailabilityService.execute(
      { provider_id, month, year },
    );

    return response.json(listAvailability);
  }
}
