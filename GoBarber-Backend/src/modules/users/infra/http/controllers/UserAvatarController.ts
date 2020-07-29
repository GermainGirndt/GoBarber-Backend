// RESTFull Controllers: max: index, show, create, update, delete
import { Request, Response } from 'express';

import CreateUserService from '@modules/users/services/CreateUserService';

import { container } from 'tsyringe';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UsersAvatarController {
    async update(request: Request, response: Response): Promise<Response> {
        // logs file's metadata
        const updateUserAvatar = container.resolve(UpdateUserAvatarService);
        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });

        return response.json(user);
    }
}
