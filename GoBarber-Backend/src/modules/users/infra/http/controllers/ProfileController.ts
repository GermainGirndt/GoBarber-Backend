// RESTFull Controllers: max: index, show, create, update, delete
import { Request, Response } from 'express';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

import { container } from 'tsyringe';

export default class ProfileController {
    public async show(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;

        const showProfileService = container.resolve(ShowProfileService);

        const userProfile = await showProfileService.execute({
            userId: user_id,
        });

        delete userProfile.password;

        return response.json(userProfile);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        try {
            // obtaining logged user's id
            const user_id = request.user.id;

            const { name, email, password, oldPassword } = request.body;

            const createUser = container.resolve(UpdateProfileService);

            const user = await createUser.execute({
                userId: user_id,
                name,
                email,
                password,
                oldPassword,
            });

            //deletes internally
            if (user) {
                delete user.password;
            }

            return response.json(user);
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    }
}
