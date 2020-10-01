import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';
import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController';

const appointimetsRouter = Router();

appointimetsRouter.use(ensureAuthenticated);

const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointimetsRouter.post('/', appointmentsController.create);
appointimetsRouter.get('/me', providerAppointmentsController.index);

export default appointimetsRouter;
