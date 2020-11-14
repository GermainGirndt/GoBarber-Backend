import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import { getHours, isAfter } from 'date-fns';

interface IRequest {
    userId: string;
    day: number;
    month: number;
    year: number;
}

type IResponse = Array<{
    hour: number;
    available: boolean;
}>;

@injectable()
class ListProviderAvailabilityByDayService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        userId,
        day,
        month,
        year,
    }: IRequest): Promise<IResponse> {
        const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
            { provider_id: userId, day, month, year },
        );

        const hourStart = 8;
        const totalWorkingHours = 10;
        const eachHourArray = Array.from(
            { length: totalWorkingHours },
            (_, index) => index + hourStart,
        );

        const currentDate = new Date(Date.now());

        const availability = eachHourArray.map(hour => {
            const hasAppointmentInHour = appointments.find(
                appointment => getHours(appointment.date) === hour,
            );

            const intendedAppointmentDate = new Date(
                year,
                month - 1,
                day,
                hour,
            );

            return {
                hour,
                available:
                    !hasAppointmentInHour &&
                    isAfter(intendedAppointmentDate, currentDate),
            };
        });

        return availability;
    }
}

export default ListProviderAvailabilityByDayService;
