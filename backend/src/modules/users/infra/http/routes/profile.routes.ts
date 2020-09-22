import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import UpdateProfileController from '../controllers/ProfileController';

const updateProfileRouter = Router();
const updateProfileController = new UpdateProfileController();

updateProfileRouter.use(ensureAuthenticated);

updateProfileRouter.put('/update', updateProfileController.update);

updateProfileRouter.get('/show', updateProfileController.show);

export default updateProfileRouter;
