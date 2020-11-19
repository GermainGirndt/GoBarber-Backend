import { container } from 'tsyringe';

import ListProviderAvailabilityByDayService from '@modules/appointments/services/ListProviderAvailabilityByDayService';

import { Request, Response } from 'express';

export default class ProviderDayAvailabilityController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        console.log(`Incoming request:`);
        console.log(request.method);
        console.log(request.body);

        const { provider_id } = request.params;

        const { day, month, year } = request.body;

        // for using the service and injecting the repository directly in it
        const listProviderAvailabilityByDayService = container.resolve(
            ListProviderAvailabilityByDayService,
        );

        const availability = await listProviderAvailabilityByDayService.execute(
            {
                providerId: provider_id,
                day,
                month,
                year,
            },
        );

        return response.json(availability);
    }
}
