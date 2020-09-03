import { Router } from 'express';

import ForgotPasswordController from '@modules/users/infra/http/controllers/ForgotPasswordController';
import ResetPasswordController from '@modules/users/infra/http/controllers/ResetPasswordController';

const forgotPasswordsRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

forgotPasswordsRouter.post('/forgot', forgotPasswordController.create);
forgotPasswordsRouter.post('/forgot', resetPasswordController.create);

export default forgotPasswordsRouter;
