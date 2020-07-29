// RESTFull Controllers: max: index, show, create, update, delete
import { Request, Response } from 'express';

import CreateUserService from '@modules/users/services/CreateUserService';

import { container } from 'tsyringe';

export default class UsersController {
    async create(request: Request, response: Response): Promise<Response> {
        try {
            const { name, email, password } = request.body;

            const createUser = container.resolve(CreateUserService);

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
    }
}
