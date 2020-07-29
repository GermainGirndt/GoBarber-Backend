import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import { Request, Response } from 'express';

export default class AppointmentController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        console.log(`Incoming request:`);
        console.log(request.method);
        console.log(request.body);
        const { provider_id, date } = request.body;

        // parseISO converts String to Date (JS)
        const parsedDate = parseISO(date);

        // for using the service and injecting the repository directly in it
        const createAppointment = container.resolve(CreateAppointmentService);

        const appointment = await createAppointment.execute({
            date: parsedDate,
            provider_id,
        });

        return response.json(appointment);
    }
}
