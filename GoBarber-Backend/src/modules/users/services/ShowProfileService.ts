import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

interface Request {
    userId: string;
}

@injectable()
class ShowProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {
        this.usersRepository = usersRepository;
    }

    public async execute({ userId }: Request): Promise<User> {
        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new AppError('User not found');
        }

        return user;
    }
}

export default ShowProfileService;
