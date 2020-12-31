import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import { getDaysInMonth, getDate } from 'date-fns';

interface IRequest {
    providerId: string;
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
        providerId,
        month,
        year,
    }: IRequest): Promise<IResponse> {
        const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
            {
                provider_id: providerId,
                year,
                month,
            },
        );

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
