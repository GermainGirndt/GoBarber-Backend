import { Router } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
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

        const usersRepository = new UsersRepository();
        const createUser = new CreateUserService(usersRepository);

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        //deletes internally
        if (user) {
            delete user.password;
        }

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
        const usersRepository = new UsersRepository();
        const updateUserAvatar = new UpdateUserAvatarService(usersRepository);
        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });

        return response.json(user);
    },
);
export default usersRouter;
