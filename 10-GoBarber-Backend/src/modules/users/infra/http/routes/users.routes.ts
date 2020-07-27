import { Router } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import multer from 'multer';

import uploadConfig from '@config/upload';

const usersRouter = Router();

const upload = multer(uploadConfig);

/**
 * Repositories
 * Services
 *
 */

// route gets '/appointments' from index.ts
usersRouter.post('/', async (request, response) => {
    try {
        console.log('request incoming');
        console.log(request.body);
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        //deletes internally
        delete user.password;

        return response.json(user);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

// patch for a updating few informations

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        // logs file's metadata
        const updateUserAvatar = new UpdateUserAvatarService();
        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });

        return response.json(user);
    },
);
export default usersRouter;
