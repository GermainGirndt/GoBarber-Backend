// import User from '@modules/users/infra/typeorm/entities/User';

// import IUsersRepository from '@modules/users/repositories/IUsersRepository';
// import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import { getDaysInMonth, getDate } from 'date-fns';

interface IRequest {
    userId: string;
    month: number;
    year: number;
}

type IResponse = Array<{
    day: number;
    available: boolean;
}>;

@injectable()
class ListProviderAvailabilityByMonthService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        userId,
        month,
        year,
    }: IRequest): Promise<IResponse> {
        const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
            {
                provider_id: userId,
                year,
                month,
            },
        );

        console.log(appointments);

        const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

        const eachDayArray = Array.from(
            { length: numberOfDaysInMonth },
            (_value, index) => index + 1,
        );

        const availability = eachDayArray.map(day => {
            const appointmentsInDay = appointments.filter(appointment => {
                return getDate(appointment.date) === day;
            });

            return {
                day,
                available: appointmentsInDay.length < 10,
            };
        });

        return availability;
    }
}

export default ListProviderAvailabilityByMonthService;
