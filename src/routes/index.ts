import { Router } from 'express';
import appointimetsRouter from './appointments.routes';

const routes = Router();

routes.use('/appointimetsRouter', appointimetsRouter);

export default routes;
