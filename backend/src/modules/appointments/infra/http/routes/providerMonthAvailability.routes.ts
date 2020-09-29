import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderMonthAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderMonthAvailabilityController';

const providerMonthAvailabilityRouter = Router();

providerMonthAvailabilityRouter.use(ensureAuthenticated);

const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();

providerMonthAvailabilityRouter.get(
  '/',
  providerMonthAvailabilityController.execute,
);

export default providerMonthAvailabilityRouter;
