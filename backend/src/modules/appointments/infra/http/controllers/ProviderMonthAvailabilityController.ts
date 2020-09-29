import { container } from 'tsyringe';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';
import { Request, Response } from 'express';

export default class ProviderMonthAvailabilityController {
  public async execute(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listProviderMonthAvailabilityService = container.resolve(
      ListProviderMonthAvailabilityService,
    );

    const { provider_id } = request.params;
    const { month, year } = request.body;

    const listMonthAvailability = await listProviderMonthAvailabilityService.execute(
      { provider_id, month, year },
    );

    return response.json(listMonthAvailability);
  }
}
