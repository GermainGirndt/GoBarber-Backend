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

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokenRepository,
    ) {}

    // public async execute({ email }: IRequest): Promise<void> {}
    public async execute({ email }: IRequest): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User does not exist.');
        }

        console.log(`User found:`);
        console.log(user);

        const { token } = await this.userTokensRepository.generate(user.id);

        console.log('generated user id');

        await this.mailProvider.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[GoBarber] Recuperação de Senha',
            templateData: {
                template: 'Olá, {{name}}: {{token}}',
                contextVariables: {
                    name: user.name,
                    token,
                },
            },
        });
    }
}

export default SendEmailForPasswordRecoveryService;
