// RESTFull Controllers: max: index, show, create, update, delete
import { Request, Response } from 'express';

import SendEmailForPasswordRecoveryService from '@modules/users/services/SendEmailForPasswordRecoveryService';

import { container } from 'tsyringe';

export default class ForgotPasswordController {
    async create(request: Request, response: Response): Promise<Response> {
        console.log('Incomming send email for password recovery  request');
        console.log(request.body);
        const { email } = request.body;

        const sendEmailForPasswordRecoveryService = container.resolve(
            SendEmailForPasswordRecoveryService,
        );

        await sendEmailForPasswordRecoveryService.execute({
            email,
        });

        return response.status(204).json();
    }
}
