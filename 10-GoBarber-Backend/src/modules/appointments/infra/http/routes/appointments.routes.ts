import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

// const appointmentsRepository = new AppointmentsRepository();

// use middleware that we created
appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//     console.log(request.user);

//     const appointments = await appointmentsRepository.find();

//     return response.json(appointments);
// });

// route gets '/appointments' from index.ts
appointmentsRouter.post('/', async (request, response) => {
    console.log(`Incoming request:`);
    console.log(request.method);
    console.log(request.body);
    const { provider_id, date } = request.body;

    // parseISO converts String to Date (JS)
    const parsedDate = parseISO(date);

    const appointmentsRepository = new AppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
        appointmentsRepository,
    );

    const appointment = await createAppointment.execute({
        date: parsedDate,
        provider_id,
    });

    return response.json(appointment);
});

export default appointmentsRouter;
