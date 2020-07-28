import { getRepository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import path from 'path';

import IUsersRepository from '../repositories/IUsersRepository';

// Node file system
import fs from 'fs';

import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';

interface Request {
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    constructor(private usersRepository: IUsersRepository) {
        this.usersRepository = usersRepository;
    }

    public async execute({ user_id, avatarFilename }: Request): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError(
                'Only authenticated users can change avatar.',
                401,
            );
        }

        if (user.avatar) {
            // Delete previous avatar

            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );
            const UserAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath,
            );

            if (UserAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;

        await this.usersRepository.save(user);

        delete user.password;

        return user;
    }
}

export default UpdateUserAvatarService;