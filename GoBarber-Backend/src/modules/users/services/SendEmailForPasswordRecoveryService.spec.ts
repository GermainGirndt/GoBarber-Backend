import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakerUserTokensRepository';
import SendEmailForPasswordRecoveryService from './SendEmailForPasswordRecoveryService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

// test globals

let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let sendEmailForPasswordRecoveryService: SendEmailForPasswordRecoveryService;

describe('SendEmailForForgottenPassword', () => {
    beforeEach(() => {
        fakeUserTokensRepository = new FakeUserTokensRepository();
        fakeUsersRepository = new FakeUsersRepository();
        fakeMailProvider = new FakeMailProvider();

        sendEmailForPasswordRecoveryService = new SendEmailForPasswordRecoveryService(
            fakeUsersRepository,
            fakeMailProvider,
            fakeUserTokensRepository,
        );
    });

    it('should be able to recover the password using the email', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await sendEmailForPasswordRecoveryService.execute({
            email: 'johndoe@example.com',
        });

        expect(sendMail).toHaveBeenCalled();
    });

    it('should not be able to recover the password of a non-existing user email', async () => {
        await expect(
            sendEmailForPasswordRecoveryService.execute({
                email: 'johndoe@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should generate a forgot password token', async () => {
        const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await sendEmailForPasswordRecoveryService.execute({
            email: 'johndoe@example.com',
        });

        expect(generateToken).toHaveBeenCalledWith(user.id);
    });
});
