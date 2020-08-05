// RESTFull Controllers: max: index, show, create, update, delete
import { Request, Response } from 'express';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

import { container } from 'tsyringe';

export default class ResetPasswordController {
    async create(request: Request, response: Response): Promise<Response> {
        console.log('Incoming reset password request');

        const { token, password } = request.body;

        const resetPasswordService = container.resolve(ResetPasswordService);

        await resetPasswordService.execute({
            token,
            password,
        });

        return response.status(204).json();
    }
}
