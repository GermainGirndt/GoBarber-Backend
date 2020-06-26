import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();

// use = any route
// use appointments in any route in appointmentsRouter
routes.use('/appointments', appointmentsRouter);

export default routes;
