import { getRepository } from 'typeorm';
import User from '../models/User';
import path from 'path';

// Node file system
import fs from 'fs';

import uploadConfig from '../config/upload';

import AppError from '../errors/AppError';

interface Request {
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne(user_id);

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

        await usersRepository.save(user);

        delete user.password;

        return user;
    }
}

export default UpdateUserAvatarService;
