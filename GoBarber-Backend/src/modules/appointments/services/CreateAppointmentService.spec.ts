import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;

let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();

        createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
        );
    });
    it('should be able to create a new appointment', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        const appointment = await createAppointment.execute({
            date: new Date(2020, 4, 10, 13),
            provider_id: 'provider_id',
            user_id: 'user_id',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('provider_id');
    });

    it('should not be able to two appointments at the same time', async () => {
        const appointmentDate = new Date(2020, 4, 10, 11);

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 10).getTime();
        });

        await createAppointment.execute({
            date: appointmentDate,
            provider_id: 'provider_id',
            user_id: 'user_id',
        });

        await expect(
            createAppointment.execute({
                date: appointmentDate,
                provider_id: 'provider_id',
                user_id: 'user_id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment in a past date', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 11),
                provider_id: 'provider_id',
                user_id: 'user_id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment with same user and provider', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 13),
                provider_id: 'same_user_and_provider_id',
                user_id: 'same_user_and_provider_id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment outside of working hours (8-18)', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 7),
                provider_id: 'user_id',
                user_id: 'provider_id',
            }),
        ).rejects.toBeInstanceOf(AppError);

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 18),
                provider_id: 'user_id',
                user_id: 'provider_id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
