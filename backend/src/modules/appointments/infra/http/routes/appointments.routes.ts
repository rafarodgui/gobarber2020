import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';

const appointimetsRouter = Router();

appointimetsRouter.use(ensureAuthenticated);

const appointmentsController = new AppointmentsController();

appointimetsRouter.post('/', appointmentsController.create);

export default appointimetsRouter;
