import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';

describe('AuthenticateUser', () => {
    it('should be able to authenticate', async () => {
        const fakeUsersRepository = new FakeUsersRepository();

        const createUserService = new CreateUserService(fakeUsersRepository);
        const authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
        );

        await createUserService.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const response = await authenticateUser.execute({
            email: 'johndoe@example.com',
            password: '123456',
        });

        expect(response).toHaveProperty('token');
    });
});
