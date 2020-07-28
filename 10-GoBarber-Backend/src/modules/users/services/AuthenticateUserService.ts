import User from '@modules/users/infra/typeorm/entities/User';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

import IUsersRepository from '../repositories/IUsersRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

class AuthenticateUserService {
    constructor(private usersRepository: IUsersRepository) {
        this.usersRepository = usersRepository;
    }

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        // user.password - encrypted password
        // password - not encrypted password

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        // if authentication succeded, do the following:

        // TOKEN

        // FIRST PARAMETER: payload with  token informations.
        // encripted, but NOT secure!

        // SECOND PARAMETER:
        // Secret key (any random string... you could use hashed algorithms)

        // THIRD PARAMETER:
        // token configurations
        // subject: user id -> the user that has the token
        // experesIn: token expiration

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return {
            user,
            token,
        };
    }
}

export default AuthenticateUserService;
