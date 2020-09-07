// import User from '@modules/users/infra/typeorm/entities/User';

// import IUsersRepository from '@modules/users/repositories/IUsersRepository';
// import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import { getHours } from 'date-fns';

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

        const availability = eachHourArray.map(hour => {
            const hasAppointmentInHour = appointments.find(
                appointment => getHours(appointment.date) === hour,
            );

            return {
                hour,
                available: !hasAppointmentInHour,
            };
        });

        return availability;
    }
}

export default ListProviderAvailabilityByDayService;
