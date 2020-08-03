import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';

import AppError from '@shared/errors/AppError';

describe('UpdateUserAvatar', () => {
    it('should be able to upload a new avatar', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const updateUserAvatarService = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider,
        );

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const userWithAvatar = await updateUserAvatarService.execute({
            user_id: user.id,
            avatarFilename: 'avatar.jpg',
        });

        expect(userWithAvatar).toHaveProperty('avatar');
        expect(userWithAvatar.avatar).toBe('avatar.jpg');
    });

    it('should not be able to upload a new avatar for a not existing user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const updateUserAvatarService = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider,
        );
        await expect(
            updateUserAvatarService.execute({
                user_id: 'not existing user',
                avatarFilename: 'avatar.jpg',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should delete old avatar when updating new one', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        // spies if the deleteFile method was executed
        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const updateUserAvatarService = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider,
        );

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const userWithAvatar = await updateUserAvatarService.execute({
            user_id: user.id,
            avatarFilename: 'avatar.jpg',
        });

        const firstAvatar = userWithAvatar.avatar;

        const userWithSecondAvatar = await updateUserAvatarService.execute({
            user_id: user.id,
            avatarFilename: 'avatar2.jpg',
        });

        const secondAvatar = userWithSecondAvatar.avatar;

        expect(firstAvatar).not.toEqual(secondAvatar);
        expect(deleteFile).toHaveBeenCalledWith(firstAvatar);
        expect(userWithSecondAvatar.avatar).toBe(secondAvatar);
    });
});
