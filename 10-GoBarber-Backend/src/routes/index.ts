import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

import usersRouter from './users.routes';

const routes = Router();

// use = any route
// use appointments in any route in appointmentsRouter
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);

export default routes;
