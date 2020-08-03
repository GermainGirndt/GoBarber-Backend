import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokenRepository from '@modules/users/repositories/IUserTokensRepository';

import { injectable, inject } from 'tsyringe';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

interface IRequest {
    email: string;
}

@injectable()
class SendEmailForPasswordRecoveryService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('UserTokenRepository')
        private userTokensRepository: IUserTokenRepository,
    ) {}

    // public async execute({ email }: IRequest): Promise<void> {}
    public async execute({ email }: IRequest): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User does not exist.');
        }

        await this.userTokensRepository.generate(user.id);

        this.mailProvider.sendMail(
            email,
            'Pedido de recuperação de senha recebido.',
        );
    }
}

export default SendEmailForPasswordRecoveryService;
