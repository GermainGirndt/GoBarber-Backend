import { Router } from 'express';

import PasswordRecoveryController from '../controllers/PasswordRecoveryController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();

const passwordRecoveryController = new PasswordRecoveryController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot', passwordRecoveryController.create);
passwordRouter.post('/reset', resetPasswordController.create);

export default passwordRouter;
