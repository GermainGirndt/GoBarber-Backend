import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import { injectable, inject } from 'tsyringe';

interface Request {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {
        this.usersRepository = usersRepository;
    }

    public async execute({
        name,
        email,
        password,
    }: Request): Promise<User | undefined> {
        // Creates a new repository directly from the databank

        const checkUserExists = await this.usersRepository.findByEmail(email);

        // Internal error: generates no http response
        if (checkUserExists) {
            throw new AppError('Email address already exists');
        }

        const hashedPassword = await hash(password, 8);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return user;
    }
}

export default CreateUserService;
