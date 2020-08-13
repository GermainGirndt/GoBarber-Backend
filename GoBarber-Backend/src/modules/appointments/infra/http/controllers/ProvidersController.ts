import { container } from 'tsyringe';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

import { Request, Response } from 'express';

export default class AppointmentController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        console.log(`Incoming request:`);
        console.log(request.method);
        console.log(request.body);

        const user_id = request.user.id;

        // for using the service and injecting the repository directly in it
        const listProvidersService = container.resolve(ListProvidersService);

        const providers = await listProvidersService.execute({
            except_user_id: user_id,
        });

        return response.json(providers);
    }
}
