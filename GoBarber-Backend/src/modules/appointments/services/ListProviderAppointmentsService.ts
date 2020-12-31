import { injectable, inject } from 'tsyringe';

import Appointments from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
    providerId: string;
    day: number;
    month: number;
    year: number;
}

@injectable()
class ListProviderAppointmentsService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        providerId,
        day,
        month,
        year,
    }: IRequest): Promise<Appointments[]> {
        const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
            {
                provider_id: providerId,
                day,
                month,
                year,
            },
        );

        return appointments;
    }
}

export default ListProviderAppointmentsService;
