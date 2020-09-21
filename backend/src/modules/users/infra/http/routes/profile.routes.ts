import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import UpdateProfileController from '../controllers/UpdateProfileController';

const updateProfileRouter = Router();
const updateProfileController = new UpdateProfileController();

updateProfileRouter.use(ensureAuthenticated);

updateProfileRouter.put('/update-profile', updateProfileController.update);

export default updateProfileRouter;
