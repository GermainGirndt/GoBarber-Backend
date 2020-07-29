// RESTFull Controllers: max: index, show, create, update, delete
import { Request, Response } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

import { container } from 'tsyringe';

export default class SessionsController {
    async create(request: Request, response: Response): Promise<Response> {
        console.log('Incomming session request');
        console.log(request.body);
        const { email, password } = request.body;

        const authenticateUser = container.resolve(AuthenticateUserService);

        const { user, token } = await authenticateUser.execute({
            email,
            password,
        });

        delete user.password;

        return response.json({ user, token });
    }
}
