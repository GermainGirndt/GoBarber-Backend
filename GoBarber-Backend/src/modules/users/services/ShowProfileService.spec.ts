import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

import AppError from '@shared/errors/AppError';
import { uuid } from 'uuidv4';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('Update Profile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();

        showProfileService = new ShowProfileService(fakeUsersRepository);
    });

    it('should be able to show the profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const userProfile = await showProfileService.execute({
            userId: user.id,
        });

        expect(userProfile.name).toBe(user.name);
        expect(userProfile.email).toBe(user.email);
    });

    it('should not be able to show the profile of a non-existing user', async () => {
        await expect(
            showProfileService.execute({
                userId: uuid(),
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
