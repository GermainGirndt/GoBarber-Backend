import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

interface Request {
    userId: string;
    name: string;
    email: string;
    oldPassword?: string;
    password?: string;
}

@injectable()
class UpdateProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {
        this.usersRepository = usersRepository;
    }

    public async execute({
        userId,
        name,
        email,
        password,
        oldPassword,
    }: Request): Promise<User> {
        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new AppError('User not found');
        }

        const userWithUpdatedEmail = await this.usersRepository.findByEmail(
            email,
        );

        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== userId) {
            throw new AppError('Email already beeing used.');
        }

        if (password && !oldPassword) {
            throw new AppError(
                'To set a new password you should inform the old one.',
            );
        }

        if (password && oldPassword) {
            const checkPasswordMatch = await this.hashProvider.compareHash(
                oldPassword,
                user.password,
            );

            if (!checkPasswordMatch) {
                throw new AppError('Passwords do not match!');
            }
        }

        if (password) {
            user.password = await this.hashProvider.generateHash(password);
        }

        user.name = name;
        user.email = email;

        await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateProfileService;
