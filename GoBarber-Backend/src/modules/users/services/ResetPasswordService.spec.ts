import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakerUserTokensRepository';
import SendEmailForPasswordRecoveryService from './SendEmailForPasswordRecoveryService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import ResetPasswordService from './ResetPasswordService';
// test globals

let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let sendEmailForPasswordRecoveryService: SendEmailForPasswordRecoveryService;
let resetPasswordService: ResetPasswordService;

describe('SendEmailForForgottenPassword', () => {
    beforeEach(() => {
        fakeUserTokensRepository = new FakeUserTokensRepository();
        fakeUsersRepository = new FakeUsersRepository();
        fakeMailProvider = new FakeMailProvider();

        resetPasswordService = new ResetPasswordService(
            fakeUsersRepository,
            fakeUserTokensRepository,
        );
    });

    it('should be able to reset the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const { token } = await fakeUserTokensRepository.generate(user.id);

        await resetPasswordService.execute({
            password: '123123',
            token,
        });

        console.log(user);

        const updatedUser = await fakeUsersRepository.findById(user.id);

        expect(updatedUser?.password).toBe('123123');
    });
});
