import { Router } from 'express';

import uploadConfig from '@config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';
import multer from 'multer';

const usersRouter = Router();

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRouter.post('/', usersController.create);

// patch for a updating few informations
usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    userAvatarController.update,
);
export default usersRouter;
