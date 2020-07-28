import { Router } from 'express';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';

import usersRouter from '@modules/users/infra/http/routes/sessions.routes';
import sessionsRouter from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

// use = any route
// use appointments in any route in appointmentsRouter
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
export default routes;
