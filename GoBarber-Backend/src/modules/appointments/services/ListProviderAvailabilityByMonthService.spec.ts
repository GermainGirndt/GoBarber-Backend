import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProviderAvailabilityByMonthService from './ListProviderAvailabilityByMonthService';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

let listProviderAvailabilityByMonthService: ListProviderAvailabilityByMonthService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderAvailabilityByMonth', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();

        listProviderAvailabilityByMonthService = new ListProviderAvailabilityByMonthService(
            fakeAppointmentsRepository,
        );
    });

    it('should be able to list the providers availability by Month', async () => {
        fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: '123123',
            date: new Date(2020, 4, 20, 8, 0, 0),
        });

        fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: '123123',
            date: new Date(2020, 4, 20, 9, 0, 0),
        });

        fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: '123123',
            date: new Date(2020, 4, 20, 10, 0, 0),
        });

        fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: '123123',
            date: new Date(2020, 4, 20, 11, 0, 0),
        });

        fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: '123123',
            date: new Date(2020, 4, 20, 12, 0, 0),
        });

        fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: '123123',
            date: new Date(2020, 4, 20, 13, 0, 0),
        });

        fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: '123123',
            date: new Date(2020, 4, 20, 14, 0, 0),
        });

        fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: '123123',
            date: new Date(2020, 4, 20, 15, 0, 0),
        });

        fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: '123123',
            date: new Date(2020, 4, 20, 16, 0, 0),
        });

        fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: '123123',
            date: new Date(2020, 4, 20, 17, 0, 0),
        });

        fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: '123123',
            date: new Date(2020, 4, 20, 10, 0, 0),
        });

        fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: '123123',
            date: new Date(2020, 4, 21, 8, 0, 0),
        });

        const availability = await listProviderAvailabilityByMonthService.execute(
            { providerId: 'user', year: 2020, month: 5 },
        );

        expect(availability).toEqual(
            expect.arrayContaining([
                {
                    day: 19,
                    available: true,
                },
                {
                    day: 20,
                    available: false,
                },
                {
                    day: 21,
                    available: true,
                },
                {
                    day: 22,
                    available: true,
                },
            ]),
        );
    });
});
