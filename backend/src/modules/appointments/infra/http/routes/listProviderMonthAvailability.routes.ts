import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AvailabilityController from '@modules/appointments/infra/http/controllers/AvailabilityController';

const availabilityRouter = Router();

availabilityRouter.use(ensureAuthenticated);

const availabilityController = new AvailabilityController();

availabilityRouter.get('/', availabilityController.execute);

export default availabilityRouter;
