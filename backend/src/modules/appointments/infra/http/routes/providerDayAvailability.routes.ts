import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderDayAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderDayAvailabilityController';

const providerDayAvailabilityRouter = Router();

providerDayAvailabilityRouter.use(ensureAuthenticated);

const providerDayAvailabilityController = new ProviderDayAvailabilityController();

providerDayAvailabilityRouter.get(
  '/',
  providerDayAvailabilityController.execute,
);

export default providerDayAvailabilityRouter;
