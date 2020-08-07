import User from '@modules/users/infra/typeorm/entities/User';

import { differenceInHours } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokenRepository from '@modules/users/repositories/IUserTokensRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import { injectable, inject } from 'tsyringe';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokenRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    // public async execute({ email }: IRequest): Promise<void> {}
    public async execute({ token, password }: IRequest): Promise<void> {
        console.log('request for reset password service ');

        console.log(token, password);
        const userToken = await this.userTokensRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('User token does not exist.');
        }
        const user = await this.usersRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError('User does not exist.');
        }

        const tokenCreatedAt = userToken.created_at;

        const now = new Date(Date.now());

        if (differenceInHours(now, tokenCreatedAt) > 2) {
            throw new AppError('Token expired');
        }

        user.password = await this.hashProvider.generateHash(password);

        await this.usersRepository.save(user);
    }
}

export default ResetPasswordService;
