import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

import AppError from '@shared/errors/AppError';
import { uuid } from 'uuidv4';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let updateProfileService: UpdateProfileService;

describe('Update Profile', () => {
    beforeEach(() => {
        fakeHashProvider = new FakeHashProvider();
        fakeUsersRepository = new FakeUsersRepository();

        updateProfileService = new UpdateProfileService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    it('should be able to update the profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const updatedUser = await updateProfileService.execute({
            userId: user.id,
            name: 'John Trê',
            email: 'johntre@example.com',
            oldPassword: '123456',
        });

        expect(updatedUser.name).toBe('John Trê');
        expect(updatedUser.email).toBe('johntre@example.com');
    });

    it('should not be able to update the profile of a non-existing user', async () => {
        await expect(
            updateProfileService.execute({
                userId: uuid(),
                name: 'John Trê',
                email: 'johntre@example.com',
                oldPassword: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to reuse a previous email', async () => {
        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const user = await fakeUsersRepository.create({
            name: 'John Trê',
            email: 'johntre@example.com',
            password: '123456',
        });

        await expect(
            updateProfileService.execute({
                userId: user.id,
                name: 'John Três',
                email: 'johndoe@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const updatedUser = await updateProfileService.execute({
            userId: user.id,
            name: 'John Trê',
            email: 'johntre@example.com',
            oldPassword: '123456',
            password: '123123',
        });

        expect(updatedUser.password).toBe('123123');
    });

    it('should not be update the password without confirming the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await expect(
            updateProfileService.execute({
                userId: user.id,
                name: 'John Trê',
                email: 'johntre@example.com',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be update the password with wrong confirming password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await expect(
            updateProfileService.execute({
                userId: user.id,
                name: 'John Trê',
                email: 'johntre@example.com',
                password: '123123',
                oldPassword: '987654',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
