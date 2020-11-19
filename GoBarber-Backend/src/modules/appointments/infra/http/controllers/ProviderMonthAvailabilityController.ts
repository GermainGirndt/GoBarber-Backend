import { container } from 'tsyringe';

import ListProviderAvailabilityByMonthService from '@modules/appointments/services/ListProviderAvailabilityByMonthService';

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

        const { month, year } = request.body;

        // for using the service and injecting the repository directly in it
        const listProviderAvailabilityByMonthService = container.resolve(
            ListProviderAvailabilityByMonthService,
        );

        const availability = await listProviderAvailabilityByMonthService.execute(
            {
                providerId: provider_id,
                month,
                year,
            },
        );

        return response.json(availability);
    }
}
